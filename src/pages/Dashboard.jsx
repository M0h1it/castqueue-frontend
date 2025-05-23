import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaTh,
  FaUserEdit,
  FaUpload,
  FaSignOutAlt,
} from "react-icons/fa";
import { MdDashboardCustomize } from "react-icons/md";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("isAuthenticated")) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("isAuthenticated");
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col justify-between">
        <div className="p-6 space-y-6">
          <h1 className="text-2xl font-bold text-indigo-600 mb-8">CastQueue</h1>
          
          <button
            onClick={() => navigate("/creator-dashboard")}
            className="flex items-center gap-3 text-gray-700 hover:text-indigo-600"
          >
            <FaTh />
            
            Creator Dashboard
          </button>
          <button
            onClick={() => navigate("/editor-dashboard")}
            className="flex items-center gap-3 text-gray-700 hover:text-indigo-600"
          >
            <MdDashboardCustomize />
            Editor Dashboard
          </button>
          <button
            onClick={() => navigate("/approval")}
            className="flex items-center gap-3 text-gray-700 hover:text-indigo-600"
          >
            <FaUserEdit />
            Manage videos
          </button>
          <button
            onClick={() => navigate("/upload-form")}
            className="flex items-center gap-3 text-gray-700 hover:text-indigo-600"
          >
            <FaUpload />
            Upload to youtube 
          </button>
        </div>

        {/* + Add Editors */}
        <div className="p-6 border-t">
          <button
            onClick={() => navigate("/manage-editors")}
            className="flex items-center gap-2 text-purple-600 hover:text-purple-800"
        >
        <span className="text-2xl">+</span>
        Manage Editors
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <div className="flex items-center justify-between px-6 py-4 shadow bg-white">
          <h2 className="text-lg font-semibold text-gray-700">Dashboard</h2>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Hi, Mohit</span>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg"
              alt="YouTube Channel"
              className="w-10 h-10 rounded-full"
            />
            <button onClick={handleLogout} title="Logout">
              <FaSignOutAlt className="text-red-500 hover:text-red-700" />
            </button>
          </div>
        </div>

        {/* Main area (empty for now) */}
        <div className="flex-1 flex items-center justify-center text-gray-400 text-xl">
          Welcome to CastQueue Dashboard!
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
