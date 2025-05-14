import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("isAuthenticated")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-white space-y-4">
      <h1 className="text-4xl font-semibold">Dashboard</h1>
      <button onClick={() => navigate("/editor-upload")} className="bg-blue-500 px-4 py-2 text-white rounded">
        Go to Editor Upload
      </button>
      <button onClick={() => navigate("/creator-dashboard")} className="bg-green-500 px-4 py-2 text-white rounded">
        Go to Creator Dashboard
      </button>
      <button onClick={() => navigate("/upload-page")} className="bg-purple-500 px-4 py-2 text-white rounded">
        Upload to YouTube (Token)
      </button>
      <button onClick={() => navigate("/upload-form")} className="bg-indigo-500 px-4 py-2 text-white rounded">
        Upload Form (Token)
      </button>
    </div>
  );
};

export default Dashboard;
