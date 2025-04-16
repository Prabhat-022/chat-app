import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {  getlogout, setMessage, setSelectedUser, setToggleChat, setUser } from '../redux/userSlice';
import { setOnlineUsers } from '../redux/socketSlice';
import toast from 'react-hot-toast';

const LoginUser = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const {loginUser} = useSelector((store) => store.user);

    const { socket } = useSelector(store => store.socket);

    const logout = async () => {
        try {
            // const response = await axios.get("http://localhost:4000/api/v1/user/logout");
            dispatch(getlogout());
             
            // if (response.status === 200) {
            //     toast.success("Logout successful");
            //     console.log("Logout successful");
            // } else {
            //     console.error("Logout failed");
            // }
            // console.log("clicked logout", response)

            navigate("/login");
            dispatch(setUser(null))
            dispatch(setSelectedUser(null))
            dispatch(setToggleChat(null))
            dispatch(setMessage(null))
            dispatch(setOnlineUsers(null));
            localStorage.removeItem("loginUser");
            if (socket) {

                socket.disconnect();
            }
        } catch (error) {
            console.error("Logout error:", error);
            // Still clear localStorage and redirect even if API call fails
            navigate("/login");
        }
    }

    return (
        <>
            <div className="bg-gray-700 rounded-lg shadow-lg p-4 m-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <img
                            src={loginUser?.avatar || "https://images.unsplash.com/photo-1723179343134-634c9eadde39?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2lybCUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"}
                            className="w-12 h-12 rounded-full object-cover border-2 border-blue-500 cursor-pointer"
                            alt="Profile"
                            onClick={() => navigate("/profile")}
                        />
                        {/* <div>
                            <h3 className="font-semibold text-white">your name</h3>
                            <p className="text-sm text-gray-400">@</p>
                        </div> */}
                        <div>
                            <h3 className="font-semibold text-white">{loginUser?.fullName }</h3>
                            <p className="text-sm text-gray-400">@{loginUser?.userName }</p>
                        </div>
                    </div>
                    <button onClick={logout}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200 text-sm font-medium"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </>
    )
}

LoginUser.propTypes = {
    loginUsers: PropTypes.shape({
        fullName: PropTypes.string,
        userName: PropTypes.string
    })
};

export default LoginUser
