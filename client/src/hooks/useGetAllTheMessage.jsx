// import axios from "axios";
// import { useSelector, useDispatch } from "react-redux";
// import { setMessage } from "../redux/userSlice";
// import { useEffect } from "react";

// const useGetAllTheMessage = () => {
//     const dispatch = useDispatch();

//     const selectedUser = useSelector((store) => store?.user?.selectedUser?._id);

//     useEffect(() => {
//         if (selectedUser === null || selectedUser === undefined) return;

//         const getAllTheMessage = async () => {
//             try {

//                 axios.defaults.withCredentials = true;
//                 const res = await axios.get(`http://localhost:4000/api/v1/message/${selectedUser}`);

//                 // console.log("res.data", res.data);

//                 if (res.data) {
//                     dispatch(setMessage(res.data));
//                 }
//             } catch (error) {
//                 console.log("Error fetching messages:", error);
//             }
//         };
//         getAllTheMessage()

//     }, [selectedUser, setMessage])

//     // useEffect(() => {
//     //     getAllTheMessage();
//     // }, [selectedUser, setMessage]);
// };

// export default useGetAllTheMessage;
