import { useState } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_BACKEND_URL;

function Upload() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [video, setVideo] = useState(null);
  const [msg, setMsg] = useState('');

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', desc);
    formData.append('video', video);

    try {
      const res = await axios.post(`${API_BASE}/api/upload/video`, formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMsg('Upload Successful! Video ID: ' + res.data.videoId);
    } catch (err) {
      setMsg('Upload Failed: ' + err.response?.data?.message);
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload a Video to YouTube</h2>
      <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <textarea placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)} />
      <input type="file" accept="video/*" onChange={e => setVideo(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
      <p>{msg}</p>
    </div>
  );
}

export default Upload;
