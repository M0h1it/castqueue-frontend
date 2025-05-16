// frontend/src/components/UploadForm.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  FaTh,
  FaUserEdit,
  FaUpload,
  FaSignOutAlt,
} from 'react-icons/fa';
import { MdDashboardCustomize } from 'react-icons/md';

const UploadForm = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem('isAuthenticated')) {
      navigate('/');
    }
  }, [navigate]);

  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [title, setTitle] = useState('LIVE | study with me 📚🌧️ rain sound and pomodoro timer 50 &10');
  const [description, setDescription] = useState(`hey👋, get the info about me down here:

📌My gear:
phone:  https://amzn.to/46QBg2I
laptop: https://amzn.to/3GCwXNQ
earphones:  https://amzn.to/470si2O
lamp : https://amzn.to/3NsTqAz

All the links up there are the affiliate links : i get a small commission without you having to pay more.:)

📌my socials:
Instagram : https://www.instagram.com/m0h1it/
discord : https://discord.gg/CDRVUJMm

📌channel concept:
Everyday there will be a live stream or videos of me studying.
Try to keep your pace up if you want to study even more than me,but make sure you find your rhythm.
study is important but the track of health is evenly important.`);

  const handleLogout = () => {
    sessionStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  const handleUpload = async () => {
    if (!video) {
      alert('Please select a video file.');
      return;
    }

    const formData = new FormData();
    formData.append('video', video);
    if (thumbnail) formData.append('thumbnail', thumbnail);
    formData.append('title', title);
    formData.append('description', description);

    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.post('http://localhost:5000/api/upload/video', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Video uploaded successfully!');
      console.log(response.data);
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert('Video upload failed');
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col justify-between">
        <div className="p-6 space-y-6">
          <h1 className="text-2xl font-bold text-indigo-600 mb-8">CastQueue</h1>
          <button onClick={() => navigate('/creator-dashboard')} className="flex items-center gap-3 text-gray-700 hover:text-indigo-600">
            <FaTh /> Creator Dashboard
          </button>
          <button onClick={() => navigate('/editor-dashboard')} className="flex items-center gap-3 text-gray-700 hover:text-indigo-600">
            <MdDashboardCustomize /> Editor Dashboard
          </button>
          <button onClick={() => navigate('/approval')} className="flex items-center gap-3 text-gray-700 hover:text-indigo-600">
            <FaUserEdit /> Manage videos
          </button>
          <button onClick={() => navigate('/upload-form')} className="flex items-center gap-3 text-gray-700 hover:text-indigo-600">
            <FaUpload /> Upload to YouTube
          </button>
        </div>
        <div className="p-6 border-t">
          <button onClick={() => navigate('/manage-editors')} className="flex items-center gap-2 text-purple-600 hover:text-purple-800">
            <span className="text-2xl">+</span> Manage Editors
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <div className="flex items-center justify-between px-6 py-4 shadow bg-white">
          <h2 className="text-lg font-semibold text-gray-700">Upload Video</h2>
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

        {/* Upload Form */}
        <div className="flex-1 overflow-y-auto p-8 bg-gray-50">
          <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-bold mb-4">Upload Your Video</h2>

            <label className="block mb-2 text-gray-700 font-medium">Thumbnail</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setThumbnail(e.target.files[0])}
              className="mb-4 block w-full border border-gray-300 rounded p-2"
            />

            <label className="block mb-2 text-gray-700 font-medium">Video File</label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setVideo(e.target.files[0])}
              className="mb-4 block w-full border border-gray-300 rounded p-2"
            />

            <label className="block mb-2 text-gray-700 font-medium">Title <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mb-4 block w-full border border-gray-300 rounded p-2"
              required
            />

            <label className="block mb-2 text-gray-700 font-medium">Description</label>
            <textarea
              rows="8"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mb-4 block w-full border border-gray-300 rounded p-2"
            />

            <button
              onClick={handleUpload}
              className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
            >
              Upload Video
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadForm;
