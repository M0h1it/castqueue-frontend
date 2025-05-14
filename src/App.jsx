import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SaveToken from "./pages/SaveToken";
import EditorUpload from "./pages/EditorUpload";
import CreatorDashboard from "./pages/CreatorDashboard";
import UploadPage from "./pages/UploadPage"; // Optional if different from Editor
import UploadForm from "./pages/UploadForm";  // Optional if used

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsAuthenticated(!!token);
    if (token) {
      sessionStorage.setItem("isAuthenticated", "true");
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/save-token" element={<SaveToken />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/editor-upload" element={isAuthenticated ? <EditorUpload /> : <Navigate to="/" />} />
        <Route path="/creator-dashboard" element={isAuthenticated ? <CreatorDashboard /> : <Navigate to="/" />} />
        <Route path="/upload-page" element={isAuthenticated ? <UploadPage /> : <Navigate to="/" />} />
        <Route path="/upload-form" element={isAuthenticated ? <UploadForm /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
