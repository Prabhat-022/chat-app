import { Link, useNavigate } from "react-router-dom"
import axios from 'axios';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAlltheUsers, setLoginUser } from "../redux/userSlice";
import {toast}  from 'react-hot-toast';

const Login = () => {

    const [logindata, setlogindata] = useState({
        identifier: "",
        password: ""
    });

    const [otp, setOtp] = useState("");
    const [inputOtp, setInputOtp] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loginUser = useSelector((store) => store?.user?.loginUser);

    const handleLogin = async (e) => {
        e.preventDefault();

        // Validate inputs
        if (!logindata.identifier || !logindata.password) {
            alert("Please fill in all fields");
            return;
        }
        if (inputOtp !== otp) {
            alert("Invalid OTP");
            return;
        }
        else {

            try {
                // Determine if the identifier is an email or username
                const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(logindata.identifier);
                const dataToSend = isEmail ? { email: logindata.identifier } : { userName: logindata.identifier };
                console.log('datatosend',dataToSend);

                const response = await axios.post("http://localhost:4000/api/v1/user/login", { ...dataToSend, password: logindata.password }, {
                    withCredentials: true
                });
                //set token in Browser
                console.log(response.data)

                // Show success message to user
                if (response.data.success) {

                    // Navigate to home page on successful login
                    dispatch(setLoginUser(response.data.user));
                    dispatch(getAlltheUsers());
                    navigate("/home");
                    
                    toast.success(response.data.message);

                }

            } catch (error) {
                // Show error message to user
                if (error.response && error.response.status === 401) {
                    alert("Unauthorized");
                } else {
                    alert("Something went wrong. Please try again.");
                }
                toast.error(error.message);
                console.error('Login error:', error);
            }
        }

        if (loginUser) {
            localStorage.setItem("loginUser",
                JSON.stringify(loginUser))

        }
    }
   

    // Function to generate OTP
    const str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const lenth = 5;
    const otpGenerator = () => {
        let otp = "";
        for (let i = 0; i < lenth; i++) {
            otp = otp + str.charAt(Math.floor(Math.random() * 10))
        }
        setOtp(otp);

    }

    const handleRefreshotp = () => {
        otpGenerator();
    }
    useEffect(() => {
        otpGenerator();
    }, []);



    return (
        <>
            <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-4  lg:px-8">
                <div className="max-w-md w-full space-y-8 bg-gray-700 p-4 rounded-xl shadow-2xl sm:p-6 lg:p-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                            Welcome Back!
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-300">
                            Sign in to your account
                        </p>

                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                        <div className="rounded-md shadow-sm space-y-4">
                            <div>
                                <label htmlFor="identifier" className="sr-only">Email or Username </label>
                                <input
                                    id="identifier"
                                    name="identifier"
                                    type="text"
                                    required
                                    className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-500 placeholder-gray-400 text-white bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Email or Username"
                                    value={logindata.identifier}
                                    onChange={(e) => setlogindata({ ...logindata, identifier: e.target.value })}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">Password</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-500 placeholder-gray-400 text-white bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Password"
                                    value={logindata.password}
                                    onChange={(e) => setlogindata({ ...logindata, password: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <input type="text" name="remember" id="remember"
                            placeholder="Enter OTP" className="mr-2 leading-tight text-white font-bold outline-none bg-transparent border p-2" value={inputOtp} onChange={(e) => setInputOtp(e.target.value)} />
                            <h1 className="font-bold text-white border text-t p-1 px-2 tracking-wider">{otp}</h1>
                            <button onClick={handleRefreshotp} className="bg-white hover:bg-slate-50 p-1 text-black">Refresh</button>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                            >
                                Sign in
                            </button>
                        </div>

                        <div className="text-center">
                            <p className="text-sm text-gray-300">
                                Don&apos;t have an account?{' '}
                                <Link to="/" className="font-medium text-blue-400 hover:text-blue-300 transition duration-150 ease-in-out">
                                    Register here
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
