import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser, setToggleChat } from '../redux/userSlice';
import { getAllTheMessage } from '../redux/messageSlice';

const User = ({ item }) => {
  const dispatch = useDispatch();
  const onlineUser = useSelector((store) => store?.socket?.onlineUsers)

  const isOnline = onlineUser?.includes(item?._id);


  const handleSelectedUser = (item) => {
    dispatch(getAllTheMessage(item._id));
    dispatch(setSelectedUser(item));
    dispatch(setToggleChat(false));
  }


  return (
    <>
      <div className="bg-gray-800 rounded-lg shadow-lg p-4 m-2" onClick={() => handleSelectedUser(item)}>
        <div className="flex items-center justify-between hover:bg-gray-700 rounded-lg p-3 transition duration-200 cursor-pointer">
          <div className="flex items-center space-x-3">
            {/* <img
              src="https://images.unsplash.com/photo-1723179343134-634c9eadde39?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2lybCUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
              className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
              alt="Profile"
            /> */}
            <img
              src={item.avatar || "https://images.unsplash.com/photo-1723179343134-634c9eadde39?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2lybCUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"}
              className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
              alt="Profile"
            />

            {/* <div>
              {images.map((image) => (
                <img key={image._id} src={image.imageUrl} alt="Uploaded" />
              ))}
            </div> */}
            {/* <div>
              <h3 className="font-semibold text-white text-lg">helo</h3>
              <p className="text-sm text-gray-400">@hwllo</p>
            </div> */}
            <div>
              <h3 className="font-semibold text-white text-lg">{item?.fullName}</h3>
              <p className="text-sm text-gray-400">@{item?.fullName?.toLowerCase().replace(/\s+/g, '')}</p>
            </div>
          </div>


          {
            isOnline ? (

              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-400">Online</span>
              </div>
            ) :
              " "
          }
        </div>
      </div>
    </>
  )
}

User.propTypes = {
  item: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    avatar: PropTypes.string,

  }).isRequired
};

export default User
