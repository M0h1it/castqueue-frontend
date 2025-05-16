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

const EditorDashboard = () => {
  const [myVideos, setMyVideos] = useState([]);
  const [title, setTitle] = useState("");
  const [creatorId, setCreatorId] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("isAuthenticated")) {
      navigate("/");
    }
    fetchUploads();
  }, [navigate]);

  const fetchUploads = () => {
    axios
      .get("http://localhost:5000/api/editor/myuploads", {
        withCredentials: true,
      })
      .then((res) => setMyVideos(res.data))
      .catch((err) => console.error("Failed to fetch uploads", err));
  };

  const handleLogout = () => {
    sessionStorage.removeItem("isAuthenticated");
    navigate("/");
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileRemove = () => {
    setFile(null);
  };

  const handleUpload = async () => {
    if (!title || !creatorId || !description || !file) {
      alert("All fields and file upload are required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("creatorId", creatorId);
    formData.append("description", description);
    formData.append("video", file);

    try {
      await axios.post("http://localhost:5000/api/editor/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      alert("Video uploaded successfully!");
      setTitle("");
      setCreatorId("");
      setDescription("");
      setFile(null);
      fetchUploads(); // Refresh list
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
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

        {/* Add Editors */}
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
          <h2 className="text-lg font-semibold text-gray-700">Editor Dashboard</h2>
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

        {/* Upload Section */}
        <div className="p-6 space-y-6 overflow-y-auto">
          <div className="bg-white p-6 rounded shadow max-w-xl">
            <h2 className="text-xl font-semibold mb-4 text-indigo-700">Upload a New Video</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border rounded"
              />
              <input
                type="text"
                placeholder="Creator ID"
                value={creatorId}
                onChange={(e) => setCreatorId(e.target.value)}
                className="w-full px-4 py-2 border rounded"
              />
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border rounded resize-none"
                rows={3}
              ></textarea>

              <div className="flex items-center gap-6">
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="flex-1 border rounded px-4 py-2"
                />
                {file && (
                  <button
                    onClick={handleFileRemove}
                    className="text-red-600 font-semibold under pb-1"
                  >
                    ❌
                  </button>
                )}
              </div>

              <button
                onClick={handleUpload}
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                Upload
              </button>
            </div>
          </div>

          {/* Uploaded Videos Section */}
          <div className="mt-10">
            <h2 className="text-xl font-bold mb-4 text-indigo-700">My Uploaded Videos</h2>
            {myVideos.length === 0 ? (
              <p className="text-gray-600">No videos uploaded yet.</p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {myVideos.map((video) => (
                  <div key={video._id} className="border p-4 rounded shadow bg-white">
                    <h3 className="text-lg font-semibold">{video.title}</h3>
                    <p className="text-sm">{video.description}</p>
                    <p className="text-sm mt-1">
                      <strong>Status:</strong>{" "}
                      <span
                        className={
                          video.status === "approved"
                            ? "text-green-600"
                            : video.status === "rejected"
                            ? "text-red-600"
                            : "text-yellow-600"
                        }
                      >
                        {video.status}
                      </span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Uploaded: {new Date(video.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorDashboard;
