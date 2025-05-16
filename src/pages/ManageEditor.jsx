import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTh, FaUserEdit, FaUpload, FaSignOutAlt } from 'react-icons/fa';
import { MdDashboardCustomize } from 'react-icons/md';

const ManageEditor = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col justify-between">
        <div className="p-6 space-y-6">
          <h1 className="text-2xl font-bold text-indigo-600 mb-8">CastQueue</h1>

          <button
            onClick={() => navigate('/creator-dashboard')}
            className="flex items-center gap-3 text-gray-700 hover:text-indigo-600"
          >
            <FaTh />
            Creator Dashboard
          </button>
          <button
            onClick={() => navigate('/editor-dashboard')}
            className="flex items-center gap-3 text-gray-700 hover:text-indigo-600"
          >
            <MdDashboardCustomize />
            Editor Dashboard
          </button>
          <button
            onClick={() => navigate('/approval')}
            className="flex items-center gap-3 text-gray-700 hover:text-indigo-600"
          >
            <FaUserEdit />
            Manage Videos
          </button>
          <button
            onClick={() => navigate('/upload-form')}
            className="flex items-center gap-3 text-gray-700 hover:text-indigo-600"
          >
            <FaUpload />
            Upload to YouTube
          </button>
        </div>

        {/* Manage Editors */}
        <div className="p-6 border-t">
          <button
            onClick={() => navigate('/manage-editors')}
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
          <h2 className="text-lg font-semibold text-gray-700">Manage Editors</h2>
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

        {/* Page Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-5xl mx-auto bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Editor Management</h2>
            <p className="text-gray-600 mb-6">
              This section will allow you to view, add, or remove editors from the platform.
            </p>

            {/* Placeholder */}
            <div className="text-center text-gray-400 py-10 border border-dashed border-gray-300 rounded-lg">
              Editor list and management actions coming soon...
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ManageEditor;
