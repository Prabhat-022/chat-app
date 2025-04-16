// import { useSelector } from 'react-redux';
// import useGetAllTheMessage from '../hooks/useGetAllTheMessage';

// const Chat = ({ message }) => {
//     useGetAllTheMessage()

//     const message = useSelector((state) => state?.user?.message);
//     const loginUser = useSelector((state) => state?.user?.loginUser?._id)


//     const senderMessage = message?.filter((msg) => msg?.sender === loginUser)
//     const receiverMessage = message?.filter((msg) => msg?.sender !== loginUser)

//     return (
//         <>
//             <div className=" flex-col space-y-4 flex-1 p-4 overflow-y-auto h-[calc(80vh-200px)] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 ">
//                 {/* <!-- Chat bubble (Start) --> */}
//                 {

//                     receiverMessage && (receiverMessage.map((msg) => (
//                         <>
//                             <div className="flex items-start space-x-3">
//                                 <div className="w-10 h-10 rounded-full overflow-hidden">
//                                     <img
//                                         alt="Chat Avatar"
//                                         src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
//                                     />
//                                 </div>
//                                 <div>

//                                     <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg max-w-xs shadow">
//                                         {msg?.message}
//                                     </div>
//                                     <div className="text-xs text-gray-500 mt-1 text-right">
//                                         Seen at {msg?.updatedAt ? new Date(msg.updatedAt).toLocaleTimeString() : 'N/A'}
//                                     </div>

//                                 </div>
//                             </div>
//                         </>
//                     )))
//                 }

//                 {

//                     senderMessage && (senderMessage.map((msg) => (
//                         <>
//                             < div className="flex items justify-end space-x-3">
//                                 <div>
//                                     < div className="bg-blue-500 text-white px-4 py-2 rounded-lg max-w-xs shadow">
//                                         {msg?.message}
//                                     </div>
//                                     <div className="text-xs text-gray-500 mt-1 text-right">
//                                         Seen at {msg?.updatedAt ? new Date(msg.updatedAt).toLocaleTimeString() : 'N/A'}
//                                     </div>
//                                 </div>
//                                 <div className="w-10 h-10 rounded-full overflow-hidden">
//                                     <img
//                                         alt="Chat Avatar"
//                                         src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
//                                     />
//                                 </div>

//                             </div>
//                         </>
//                     )))
//                 }
//             </div >
//         </>
//     )


// }

// export default Chat;

import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

// window.scroll(0, document.documentElement.scrollHeight)


const Chat = ({ message }) => {
    console.log('messagess', message)

    const loginUser = useSelector((store) => store?.user?.loginUser?._id)
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [message]);

    return (
        <>
            <div ref={messagesEndRef}
                className=" flex-col space-y-4 flex-1 p-4 overflow-y-auto  scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 ">
                {/* <!-- Chat bubble (Start) --> */}
                {

                    message.sender !== loginUser ? (
                        <>
                            <div className="flex items-start space-x-3">
                                <div className="w-10 h-10 rounded-full overflow-hidden">
                                    <img
                                        alt="Chat Avatar"
                                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                    />
                                </div>
                                <div>

                                    <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg max-w-xs shadow">
                                        {message?.message}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1 text-right">
                                        Seen at {message?.updatedAt ? new Date(message.updatedAt).toLocaleTimeString() : 'N/A'}
                                    </div>

                                </div>
                            </div>
                        </>
                    ) :

                        // message reciver
                        (
                            < div className="flex items justify-end space-x-3">
                                <div>
                                    < div className="bg-blue-500 text-white px-4 py-2 rounded-lg max-w-xs shadow">
                                        {message?.message}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1 text-right">
                                        Seen at {message?.updatedAt ? new Date(message.updatedAt).toLocaleTimeString() : 'N/A'}
                                    </div>
                                </div>
                                <div className="w-10 h-10 rounded-full overflow-hidden">
                                    <img
                                        alt="Chat Avatar"
                                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                    />
                                </div>

                            </div>
                        )
                }
                <div ></div>

            </div >
        </>
    )


}

export default Chat;

