import { useSelector, useDispatch } from "react-redux";
import { setMessage } from "../redux/userSlice";
import { useEffect, useState } from "react";
import Chat from "./Chat";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Chatboard = () => {


    const [input, setInput] = useState("");
    const { toggleChat } = useSelector((store) => store?.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const selectedUser = useSelector((store) => store?.user?.selectedUser);
    const message = useSelector((store) => store?.user?.message);


    const handleSendMessage = () => {
        if (input.trim() === "") return;

        const sendMessage = async () => {
            try {

                const res = await axios.post(`http://localhost:4000/api/v1/message/send/${selectedUser?._id}`, {
                    message: input
                }, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                });

                console.log('sendmessage', res.data)
                dispatch(setMessage([...message, res.data.message]));

                setInput("")

                if (!res.data.success) {
                    throw new Error(res.data.message);
                }

                console.log("Message sent successfully");

            } catch (error) {
                console.log("Error sending message:", error);
            }
        }
        sendMessage()
        setInput("");

    };



    useEffect(() => {

        scroll.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);

    return (
        <>

            {toggleChat ? (<div className="bg-gray-800 rounded-lg shadow-lg text-white w-[400px] h-[100%] m-1 flex flex-col justify-center items-center text-4xl font-bold ">Lets Chat</div>)

                :
                (
                    <div className="bg-gray-800 rounded-lg shadow-lg text-white w-[400px] h-full m-1 flex flex-col" ref={scroll}>
                        {/* Chat Header */}
                        <div className="bg-gray-700 p-4 rounded-t-lg flex items-center">
                            <img src={selectedUser?.avatar || "https://images.unsplash.com/photo-1723179343134-634c9eadde39?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2lybCUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"}
                                className="w-10 h-10 rounded-full object-cover cursor-pointer" alt="Profile" />
                            <div className="ml-3">
                                <h3 className="font-semibold">{selectedUser?.fullName}</h3>
                            </div>
                        </div>
                        <div className="h-[500px] overflow-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800" >

                            {
                                message && message?.map((message) => {
                                    return (
                                        <Chat key={message._id} message={message} />
                                        // </div>
                                    )
                                })
                            }

                        </div>


                        {/* Chat Input */}
                        <div className="p-4 bg-gray-700 rounded-b-lg ">
                            <div className="flex items-center space-x-2">
                                <input
                                    type="text"
                                    placeholder="Type your message..."
                                    className="flex-1 bg-gray-600 text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                />
                                <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 transition duration-200"
                                    onClick={handleSendMessage}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div >
                )}

        </>
    )

}
export default Chatboard
