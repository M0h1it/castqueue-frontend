import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaTh,
  FaUserEdit,
  FaUpload,
  FaSignOutAlt,
} from "react-icons/fa";
import { MdDashboardCustomize } from "react-icons/md";

const CreatorDashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 5;

  useEffect(() => {
    if (!sessionStorage.getItem("isAuthenticated")) {
      navigate("/");
    } else {
      // Fetch videos here and setVideos([...])
    }
  }, [navigate]);

  useEffect(() => {
    let filtered = videos;

    if (searchTerm) {
      filtered = filtered.filter(video =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "All") {
      filtered = filtered.filter(video => video.status === statusFilter);
    }

    setFilteredVideos(filtered);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, videos]);

  const handleLogout = () => {
    sessionStorage.removeItem("isAuthenticated");
    navigate("/");
  };

  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = filteredVideos.slice(indexOfFirstVideo, indexOfLastVideo);

  const paginate = pageNumber => setCurrentPage(pageNumber);

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
            Upload to YouTube
          </button>
        </div>

        <div className="p-6 border-b-blue-800 border-t">
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
          <h2 className="text-lg font-semibold text-gray-700">Creator Dashboard</h2>
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

        {/* Filters */}
        <div className="px-5 py-4 flex justify-between items-center ">
          <input
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className=" items-center px-4 py-3 rounded hover:shadow-md text-gray-700 font-medium "
          />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className=" px-0 rounded border-gray-300 text-gray-700 font-medium focus:outline-none  focus:border-transparent"
          >
            <option>All</option>
            <option>Approved</option>
            <option>Pending</option>
            <option>Rejected</option>
          </select>
        </div>

        {/* Video List */}
        <div className="p-6 space-y-4 overflow-y-auto">
          {currentVideos.length === 0 ? (
            <p className="text-center text-gray-500">No videos found.</p>
          ) : (
            currentVideos.map((video, index) => (
              <div
                key={index}
                className="border p-4 rounded shadow-sm bg-white flex justify-between"
              >
                <div>
                  <h3 className="text-lg font-semibold">{video.title}</h3>
                  <p className="text-sm text-gray-600">Status: {video.status}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center p-4">
          {Array.from({ length: Math.ceil(filteredVideos.length / videosPerPage) }).map(
            (_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`mx-1 px-3 py-1 border rounded ${
                  currentPage === index + 1
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-600"
                }`}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatorDashboard;
