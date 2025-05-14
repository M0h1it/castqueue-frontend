// frontend/src/components/UploadForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const UploadForm = () => {
  const [video, setVideo] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleUpload = async () => {
    if (!video) {
      alert('Please select a video file.');
      return;
    }

    const formData = new FormData();
    formData.append('video', video);
    formData.append('title', title);
    formData.append('description', description);

    try {
      const token = localStorage.getItem('accessToken'); // Token from Google OAuth
      const response = await axios.post('http://localhost:5000/api/upload/video', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Video uploaded successfully!');
      console.log(response.data);
      // Optional: Redirect to dashboard or reload videos
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert('Video upload failed');
    }
  };

  return (
    <div>
      <h2>Upload New Video</h2>
      <input type="file" accept="video/*" onChange={(e) => setVideo(e.target.files[0])} /><br />
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} /><br />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} /><br />
      <button onClick={handleUpload}>Upload Video</button>
    </div>
  );
};

export default UploadForm;
