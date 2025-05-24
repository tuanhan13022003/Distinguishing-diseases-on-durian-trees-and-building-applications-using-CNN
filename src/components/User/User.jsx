// UserMenu.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, LogOut, KeyRound } from "lucide-react";
import AvatarUser from "./AvatarUser";
import { useUser } from "../User/UserContex";

const UserMenu = () => {
  const { user, logout } = useUser();
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  // Xử lý đăng xuất
  const handleLogout = () => {
    console.log("Log Out button clicked");
    logout();
    navigate("/login"); // Điều hướng trước khi đóng menu
    setShowMenu(false);
    console.log("User logged out, navigating to /login");
  };

  // Toggle menu khi nhấn vào icon
  const toggleMenu = () => {
    console.log("Toggle menu clicked");
    setShowMenu((prev) => !prev);
  };

  return (
    <div className="relative">
      {/* Avatar icon để mở menu */}
      <button
        onClick={toggleMenu}
        className="p-2 rounded-full hover:bg-gray-200 border"
      >
        {user ? (
          <AvatarUser name={user.username} id={user.user_id} size={32} />
        ) : (
          <User size={32} />
        )}
      </button>

      {/* Dropdown menu */}
      {showMenu && (
        <div
          className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-50"
          onClick={(e) => e.stopPropagation()} // Ngăn chặn sự kiện click bên ngoài
        >
          {user ? (
            <button
              onMouseDown={handleLogout} // onMouseDown thay vì onClick
              className="flex items-center justify-between w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
            >
              Log Out <LogOut size={20} />
            </button>
          ) : (
            <div>
              <button
                onMouseDown={() => {
                  console.log("Navigating to /login");
                  navigate("/login"); // Điều hướng trước khi đóng menu
                  setShowMenu(false);
                }}
                className="flex items-center justify-between w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Log In <User size={20} />
              </button>
              <button
                onMouseDown={() => {
                  console.log("Navigating to /register");
                  navigate("/register"); // Điều hướng trước khi đóng menu
                  setShowMenu(false);
                }}
                className="flex items-center justify-between w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Sign Up <KeyRound size={20} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserMenu;
