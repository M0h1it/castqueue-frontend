import { useEffect, useState } from "react";
import axios from "axios";
import EditorUpload from "./EditorUpload";

const EditorDashboard = () => {
  const [myVideos, setMyVideos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/editor/myuploads", { withCredentials: true })
      .then(res => setMyVideos(res.data))
      .catch(err => console.error("Failed to fetch uploads", err));
  }, []);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">Editor Dashboard</h1>

      {/* Upload Section */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Upload a New Video</h2>
        <EditorUpload />
      </div>

      {/* Uploaded Videos Section */}
      <div>
        <h2 className="text-xl font-semibold mb-2">My Uploaded Videos</h2>
        {myVideos.length === 0 ? (
          <p>No videos uploaded yet.</p>
        ) : (
          <div className="space-y-4">
            {myVideos.map(video => (
              <div key={video._id} className="border p-4 rounded shadow">
                <h3 className="text-lg font-semibold">{video.title}</h3>
                <p>{video.description}</p>
                <p><strong>Status:</strong> <span className={video.status === 'approved' ? 'text-green-600' : 'text-yellow-600'}>{video.status}</span></p>
                <p><strong>Uploaded:</strong> {new Date(video.createdAt).toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EditorDashboard;
