import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { setOnlineUsers } from "../redux/socketSlice";
import { setMessage } from "../redux/userSlice";

const useGetSocket = () => {
  const dispatch = useDispatch()
  const messages = useSelector(store => store?.user?.message);
  const loginUser = useSelector((store) => store?.user?.loginUser);

  // Create new socket connection

  const newSocket = useMemo(() => {
    if (loginUser) {
     return  io('http://localhost:4000', {
        query: {
          userId: loginUser._id
        }
      })
    }
  }, [loginUser])

  useEffect(() => {
    // if (!messages) return;

    // Listen for online users
    newSocket.on('getOnlineUsers', (onlineUsers) => {
      dispatch(setOnlineUsers(onlineUsers));
    });

    // Listening for a response from the server
    newSocket?.on('newMessage', (newMessage) => {
      console.log('Server says:', newMessage);
      dispatch(setMessage([...messages, newMessage]));

    });


    // //! Cleanup function
    // return () => {
    //   newSocket.disconnect();
    //   dispatch(setSocket(null));
    // };

  }, [messages]);
}

export default useGetSocket;