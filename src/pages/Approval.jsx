import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaTh,
  FaUserEdit,
  FaUpload,
  FaSignOutAlt,
} from "react-icons/fa";
import { MdDashboardCustomize } from "react-icons/md";

export default function Approval() {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("isAuthenticated")) {
      navigate("/");
    }
    fetchPendingVideos();
  }, [navigate]);

  const fetchPendingVideos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/videos/pending", {
        withCredentials: true,
      });
      setVideos(res.data);
    } catch (err) {
      console.error("Error fetching videos:", err);
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.post(`http://localhost:5000/api/videos/approve/${id}`, {}, {
        withCredentials: true,
      });
      fetchPendingVideos();
    } catch (err) {
      console.error("Approval error:", err);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.post(`http://localhost:5000/api/videos/reject/${id}`, {}, {
        withCredentials: true,
      });
      fetchPendingVideos();
    } catch (err) {
      console.error("Rejection error:", err);
    }
  };

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
            className="flex items-center gap-3 text-indigo-600 font-semibold"
          >
            <FaUserEdit />
            Manage Videos
          </button>
          <button
            onClick={() => navigate("/upload-form")}
            className="flex items-center gap-3 text-gray-700 hover:text-indigo-600"
          >
            <FaUpload />
            Upload to YouTube
          </button>
        </div>
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
        {/* Navbar */}
        <div className="flex items-center justify-between px-6 py-4 shadow bg-white">
          <h2 className="text-lg font-semibold text-gray-700">Approval Panel</h2>
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

        {/* Approval Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          <h1 className="text-2xl font-bold mb-4">Pending Videos</h1>
          {videos.length === 0 ? (
            <p className="text-gray-500">No videos awaiting approval.</p>
          ) : (
            <div className="grid gap-6">
              {videos.map((video) => (
                <div key={video._id} className="border rounded-lg shadow p-4 bg-white">
                  <h2 className="text-lg font-semibold text-indigo-600 mb-2">{video.title}</h2>
                  <p className="text-sm text-gray-700 mb-2"><strong>Creator ID:</strong> {video.creator}</p>
                  <p className="text-sm text-gray-600 mb-4">{video.description}</p>
                  <video
                    controls
                    width="100%"
                    className="rounded mb-4 border"
                  >
                    <source
                      src={`http://localhost:5000/uploads/${video.filename}`}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleApprove(video._id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(video._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
