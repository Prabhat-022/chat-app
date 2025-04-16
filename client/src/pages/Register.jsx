import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom"
<<<<<<< HEAD
import { getAlltheUsers } from "../redux/userSlice";
import { useDispatch } from "react-redux";
=======
import { useDispatch } from "react-redux";
import { register } from "../redux/userSlice";
>>>>>>> ea8f39e (fixed some bugs)

const Register = () => {
    const dispatch = useDispatch();

    const [registerdata, setregisterdata] = useState(
        {
            fullName: "",
            email: "",
            userName: "",
            password: "",
            avatar: null
        }
    );

    const navigate = useNavigate();
    const dispatch = useDispatch();

    console.log('avtar', registerdata.avatar)
    //handle the register router

    const handleregister = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("fullName", registerdata.fullName);
        formData.append("email", registerdata.email);
        formData.append("userName", registerdata.userName);
        formData.append("password", registerdata.password);
        formData.append("avatar", registerdata.avatar); // Append the file


        // try {
        //     const res = await axios.post("http://localhost:4000/api/v1/user/register", formData, {
        //         headers: {
        //             "Content-Type": "multipart/form-data",
        //         },
        //     })
        //     if (res.data.success) {
        //         toast.success(res.data.message);
        //         console.log('res', res)
        //         navigate("/login");
        //     }
        // } catch (error) {
        //     console.log('Register', error)
        // }
        
        try {
<<<<<<< HEAD
            const res = await axios.post("http://localhost:4000/api/v1/user/register", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            if (res.data.success) {
                toast.success(res.data.message);
                dispatch(getAlltheUsers());
=======
            const res = await dispatch(register(formData));
            console.log('register res', res)
            if (res.payload.success) {
                toast.success(res.payload.message);
>>>>>>> ea8f39e (fixed some bugs)
                console.log('res', res)
                navigate("/login");
            }
        } catch (error) {
<<<<<<< HEAD
            console.log('register', error)
=======
            console.log('Register', error)
>>>>>>> ea8f39e (fixed some bugs)
        }
    }
       
    const handleFileChange = (e) => {
        setregisterdata({ ...registerdata, avatar: e.target.files[0] }); // Update avatar with the selected file
    };

    return (
        <>
            <div className="flex items-center justify-center h-screen">
                <div className="max-w-md w-full mx-auto space-y-8 bg-gray-700 p-8 rounded-xl shadow-2xl md:p-12 md:space-y-12">
                    <div className="text-center">
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-white md:text-4xl">
                            Create Account
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-300 md:text-base">
                            Join our community today
                        </p>
                    </div>


                    <form className="mt-8 space-y-6" onSubmit={handleregister}>
                        <div className="rounded-md shadow-sm space-y-4">

                            <div>
                                <label htmlFor="fullName" className="sr-only">Full Name</label>
                                <input
                                    type="text"
                                    className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-500 placeholder-gray-400 text-white bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Full Name"
                                    value={registerdata.fullName}
                                    onChange={(e) => setregisterdata({ ...registerdata, fullName: e.target.value })}
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="sr-only">Email address</label>
                                <input
                                    type="email"
                                    className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-500 placeholder-gray-400 text-white bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Email address"
                                    value={registerdata.email}
                                    onChange={(e) => setregisterdata({ ...registerdata, email: e.target.value })}
                                />
                            </div>

                            <div>
                                <label htmlFor="username" className="sr-only">Username</label>
                                <input
                                    type="text"
                                    className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-500 placeholder-gray-400 text-white bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Username"
                                    value={registerdata.userName}
                                    onChange={(e) => setregisterdata({ ...registerdata, userName: e.target.value })}
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="sr-only">Password</label>
                                <input
                                    type="password"
                                    className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-500 placeholder-gray-400 text-white bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Password"
                                    value={registerdata.password}
                                    onChange={(e) => setregisterdata({ ...registerdata, password: e.target.value })}
                                />
                            </div>

                            <div>
                                <input
                                    type="file"
                                    className="appearance-none rounded-lg relative block w-full px-4 py-3 text-white bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    onChange={handleFileChange}
                                    accept="image/*"
                                />
                            </div>



                        </div>


                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                            >
                                Create Account
                            </button>
                        </div>

                        <div className="text-center">
                            <p className="text-sm text-gray-300">
                                Already have an account?{' '}
                                <Link to="/login" className="font-medium text-blue-400 hover:text-blue-300 transition duration-150 ease-in-out">
                                    Sign in here
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register
