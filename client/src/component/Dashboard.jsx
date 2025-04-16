import { Toaster } from "react-hot-toast"
import Leftlayout from "./Leftlayout"
import Rightlayout from "./Rightlayout"
import { useDispatch } from "react-redux"
import { getAllUsers } from "../redux/userSlice"
import { useEffect } from "react"

const Dashboard = () => {
    const dispatch = useDispatch();
    

    useEffect(() => {
        dispatch(getAllUsers());
    }, []);
    return (
        <>
            <Toaster />
            <div className="bg-gray-600  h-[100vh] flex items-center justify-center">
                <div className="border flex">
                    <Leftlayout />
                    <Rightlayout />
                </div>
            </div>
        </>
    )
}

export default Dashboard
