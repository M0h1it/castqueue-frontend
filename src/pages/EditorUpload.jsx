import React, { useState } from "react";
import axios from "axios";

const EditorUpload = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [creatorId, setCreatorId] = useState(""); // Creator dropdown later

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("video", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("creatorId", creatorId);

    try {
      const res = await axios.post("http://localhost:5000/api/editor/upload", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Uploaded successfully and sent for approval!");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-semibold">Editor Upload Panel</h2>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
      <input type="text" placeholder="Creator ID" value={creatorId} onChange={e => setCreatorId(e.target.value)} />
      <button onClick={handleUpload} className="bg-blue-600 text-white px-4 py-2 rounded">Upload</button>
    </div>
  );
};

export default EditorUpload;
