import { useState, useMemo } from "react";
import LoginUser from "./LoginUser"
import User from "./User"
<<<<<<< HEAD
import { useSelector, } from "react-redux"
=======
import { useDispatch, useSelector } from "react-redux"
>>>>>>> ea8f39e (fixed some bugs)

const Leftlayout = () => {
    const [search, setSearch] = useState("");
    const {userData, toggleChat, loginUser} = useSelector((store) => store.user);

    const filteredUsers = useMemo(() => (
        search.trim() ? userData.filter((item) => item.email !== loginUser.email && item.fullName.toLowerCase().includes(search.toLowerCase())) : []
    ), [search, userData, loginUser]);

    const handleSearch = () => {
        setSearch("");
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
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map((item) => (
                            <User key={item._id} item={item}/>
                        ))
                    ) : (
                        !toggleChat && userData?.map((item) => (
                            <User key={item._id} item={item}/>
                        ))
                    )}

                    {
                        userData.map((item) => (
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
