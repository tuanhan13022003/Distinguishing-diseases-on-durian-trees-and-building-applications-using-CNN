import { useUser } from "../User/UserContex";
import { Link, useNavigate } from "react-router-dom";
import AvatarUser from "./AvatarUser";

const UserInfo = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="flex space-x-4">
        <Link to="/login" className="text-blue-600 hover:underline">
          Log in
        </Link>
        <Link to="/register" className="text-blue-600 hover:underline">
          Sign up
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <AvatarUser name={user.username} id={user.id} size={32} />
      <span className="text-sm text-gray-700">{user.username}</span>
      <button
        onClick={handleLogout}
        className="text-red-600 hover:underline text-sm"
      >
        Log Out
      </button>
    </div>
  );
};

export default UserInfo;
