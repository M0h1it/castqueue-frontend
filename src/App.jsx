import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import Login from "./pages/Login";
import SaveToken from "./pages/SaveToken";
import Dashboard from "./pages/Dashboard";
import EditorUpload from "./pages/EditorUpload";
import CreatorDashboard from "./pages/CreatorDashboard";
import UploadForm from "./pages/UploadForm";
import PrivateRoute from "./pages/PrivateRoute"; // ✅
import Approval from "./pages/Approval";
import EditorDashboard from "./pages/EditorDashboard";
import ManageEditor from './pages/ManageEditor';

function App() {
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      sessionStorage.setItem("isAuthenticated", "true");
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/save-token" element={<SaveToken />} />

        {/* Protected Routes (use PrivateRoute) */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/editor-upload"
          element={
            <PrivateRoute>
              <EditorUpload />
            </PrivateRoute>
          }
        />
        <Route
          path="/creator-dashboard"
          element={
            <PrivateRoute>
              <CreatorDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/upload-form"
          element={
            <PrivateRoute>
              <UploadForm />
            </PrivateRoute>
          }
        />
        <Route 
        path="/approval" 
        element={
          <PrivateRoute>
            <Approval />
          </PrivateRoute>
        } 
        />
        <Route 
        path="/editor-dashboard" 
        element={
        <PrivateRoute>
          <EditorDashboard />
        </PrivateRoute>
      }
      />
      <Route 
      path="/manage-editors" 
      element={
        <PrivateRoute>
          <ManageEditor />
        </PrivateRoute>
        } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
