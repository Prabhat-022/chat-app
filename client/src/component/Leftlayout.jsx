import { useState } from "react";
import LoginUser from "./LoginUser"
import User from "./User"
import { useSelector, } from "react-redux"
import useGetAllusers from "../hooks/useGetAllusers";

const Leftlayout = () => {
    useGetAllusers()
    const [search, setSearch] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [showAllUsers, setShowAllUsers] = useState(false);

    const toggleChat = useSelector((store) => store?.user?.toggleChat);

    const userData = useSelector((store) => store?.user.userData);

    const loginUser = useSelector((store) => store?.user?.loginUser)
    const user = userData?.filter((item) => item?.email !== loginUser?.email);

    const handleSearch = () => {
        const filtered = user.filter((item) => item?.fullName.toLowerCase().includes(search.toLowerCase()));
        setFilteredUsers(filtered);
        setSearch(""); // Clear the search input after filtering
        setShowAllUsers(false); // Ensure all users are not shown after filtering
    }



    return (
        <>
            <div className="h-[80vh]">
                <div className="border m-2 p-3 rounded-lg bg-gray-700 flex items-center gap-2">
                    <input
                        type="text"
                        value={search}
                        className="px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500 bg-gray-800 text-white w-full"
                        placeholder="Search users..."
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200 font-medium" onClick={handleSearch}>Search</button>
                </div>
                <div className="overflow-y-auto h-[calc(80vh-180px)] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                    {
                        filteredUsers.length > 0 ? (
                            filteredUsers.map((item) => (
                                <User key={item._id} item={item} />
                            ))
                        ) : (
                            !user?.map((item) => (
                                <User key={item._id} item={item} />
                            ))
                        )

                    }
                    {
                       !toggleChat && user?.map((item) => (
                            <User key={item._id} item={item} />
                        ))
                    }
                </div>

                <LoginUser />
            </div>
        </>
    )
}

export default Leftlayout
