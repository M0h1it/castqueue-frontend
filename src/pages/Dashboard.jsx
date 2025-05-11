import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated (using sessionStorage or other method)
    if (!sessionStorage.getItem("isAuthenticated")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="h-screen flex items-center justify-center bg-white">
      <h1 className="text-4xl font-semibold">Dashboard (Coming Soon)</h1>
    </div>
  );
};

export default Dashboard;
