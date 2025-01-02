import {  useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";

const useGetAllusers = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const getAllUser = async () => {
            try {
                axios.defaults.withCredentials = true;

                const res = await axios.get("http://localhost:4000/api/v1/user",{
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                dispatch(setUser(res?.data));


            } catch (error) {
                console.error('Error fetching users:', error.response?.data?.message || error.message);
            }
        }

        getAllUser();

        
    }, [])
}

export default useGetAllusers;

