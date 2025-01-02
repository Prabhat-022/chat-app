import { useNavigate } from "react-router-dom"
import PropTypes from 'prop-types'; // ES6

const Profile = ({ darkMode, user  }) => {
console.log(user)
//   const [user] = useState({
//     name: "John Doe",
//     email: "john.doe@example.com",
//     image: "https://via.placeholder.com/150",
//     address: "123 Main St, City, Country",
//     phone: "+1 234 567 8900",
//     memberSince: "January 2023"
//   })
  const navigate = useNavigate();

  const handleLogout = () => {
    // Handle logout logic here
    navigate("/login")
  }

  return (
    <div className="h-[100vh] w-[100vw] my-4">
      <div className={` max-w-4xl mx-auto p-6 ${darkMode ? 'bg-gray-900 h-[100vh] w-[100vw] flex items-center justify-center ' : 'bg-white h-[100vh] w-[100vw] s flex items-center justify-center'}`}>
        <div className={`rounded-lg shadow-lg p-8 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Profile Image */}
            <div className="w-48 h-48 relative">
              <img
                src={user?.image}
                alt={user?.name}
                className={`w-full h-full rounded-full object-cover border-4 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
              />
              <button className={`absolute bottom-2 right-2 p-2 rounded-full shadow-md ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-100'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
            </div>

            {/* User Details */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{user.fullName}</h1>
              <div className="space-y-4">
                <div>
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
                <div>
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Username</p>
                  <p className="font-medium">{user?.userName}</p>
                </div>
                <div>
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>UserId</p>
                  <p className="font-medium">{user?._id}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Edit Profile
            </button>
            <button className={`px-6 py-2 rounded-lg ${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
              Change Password
            </button>
            <button className={`px-6 py-2 rounded-lg ${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
              Order History
            </button>
            <button onClick={handleLogout} className={`px-6 py-2 rounded-lg ${darkMode ? 'bg-red-900 text-red-300 hover:bg-red-800' : 'bg-red-100 text-red-600 hover:bg-red-200'}`}>
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile

Profile.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  user: PropTypes
}
