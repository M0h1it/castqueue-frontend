import { useEffect, useState } from "react";
import axios from "axios";

export default function Approval() {
  const [videos, setVideos] = useState([]);

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

  useEffect(() => {
    fetchPendingVideos();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pending Videos</h1>
      {videos.length === 0 ? (
        <p>No videos awaiting approval.</p>
      ) : (
        videos.map(video => (
          <div key={video._id} className="border p-4 rounded mb-4">
            <h2 className="font-semibold">{video.title}</h2>
            <p>{video.description}</p>
            <video controls width="320" className="my-2">
              <source src={`http://localhost:5000/uploads/${video.filename}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="flex gap-2 mt-2">
              <button onClick={() => handleApprove(video._id)} className="bg-green-600 text-white px-3 py-1 rounded">
                Approve
              </button>
              <button onClick={() => handleReject(video._id)} className="bg-red-600 text-white px-3 py-1 rounded">
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
