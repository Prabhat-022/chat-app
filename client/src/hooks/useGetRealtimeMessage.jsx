import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMessage } from "../redux/userSlice";

const useGetRealtimeMessage = () => {
    
    const { socket } = useSelector(store => store?.socket);

    console.log("Socket:", socket);

    const dispatch = useDispatch();

    useEffect(() => {
 

        socket.on("response", (newMessage) => {
            dispatch(setMessage([...(messages || []), newMessage]));
        });

        return () => socket.off("response");

    }, [socket, messages, dispatch]);

};
export default useGetRealtimeMessage;

