import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

const CreatorDashboard = () => {
  const [pendingVideos, setPendingVideos] = useState([]);
  const [approvedVideos, setApprovedVideos] = useState([]);

  useEffect(() => {
    // Fetch pending videos
    axios.get("http://localhost:5000/api/videos/pending", {
      withCredentials: true
    })
    .then(res => setPendingVideos(res.data))
    .catch(err => console.error("Failed to fetch pending videos", err));

    // Fetch approved videos
    axios.get("http://localhost:5000/api/videos/approved", {
      withCredentials: true
    })
    .then(res => setApprovedVideos(res.data))
    .catch(err => console.error("Failed to fetch approved videos", err));
  }, []);

  const approveVideo = async (id) => {
    try {
      await axios.post(`http://localhost:5000/api/videos/approve/${id}`, {}, { withCredentials: true });
      alert("Video approved and uploaded!");
      setPendingVideos(pendingVideos.filter(video => video._id !== id));

      // Refresh approved videos list
      const updatedApproved = await axios.get("http://localhost:5000/api/videos/approved", { withCredentials: true });
      setApprovedVideos(updatedApproved.data);
    } catch (err) {
      console.error(err);
      alert("Approval failed");
    }
  };

  const rejectVideo = async (id) => {
    try {
      await axios.post(`http://localhost:5000/api/videos/reject/${id}`, {}, { withCredentials: true });
      alert("Video rejected");
      setPendingVideos(pendingVideos.filter(video => video._id !== id));
    } catch (err) {
      console.error(err);
      alert("Rejection failed");
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Pending Section */}
      <div>
        <h2 className="text-2xl font-bold">Pending Videos for Approval</h2>
        {pendingVideos.length === 0 && <p>No videos awaiting approval.</p>}
        {pendingVideos.map(video => (
          <div key={video._id} className="border p-4 rounded shadow my-2">
            <h3 className="text-xl font-semibold">{video.title}</h3>
            <p>{video.description}</p>
            <p><strong>Uploaded by:</strong> {video.uploader?.name || "Unknown"}</p>
            <div className="space-x-2 mt-2">
              <button onClick={() => approveVideo(video._id)} className="bg-green-600 text-white px-4 py-1 rounded">Approve</button>
              <button onClick={() => rejectVideo(video._id)} className="bg-red-600 text-white px-4 py-1 rounded">Reject</button>
            </div>
          </div>
        ))}
      </div>

      {/* Approved Section */}
      <div>
        <h2 className="text-2xl font-bold mt-10">Approved & Uploaded Videos</h2>
        {approvedVideos.length === 0 && <p>No approved videos yet.</p>}
        {approvedVideos.map(video => (
          <div key={video._id} className="border p-4 rounded shadow my-2">
            <h3 className="text-xl font-semibold">{video.title}</h3>
            <p>{video.description}</p>
            <p><strong>Uploaded by:</strong> {video.uploader?.name || "Unknown"}</p>
            <p><strong>YouTube Link:</strong>{' '}
              <a
                href={`https://youtube.com/watch?v=${video.youtubeVideoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Watch on YouTube
              </a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreatorDashboard;
