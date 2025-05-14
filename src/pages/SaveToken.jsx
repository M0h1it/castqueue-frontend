import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const SaveToken = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("accessToken", token);
      sessionStorage.setItem("isAuthenticated", "true");
      navigate("/dashboard");
    } else {
      alert("Login failed: token not found.");
      navigate("/");
    }
  }, [location, navigate]);

  return <p>Logging in...</p>;
};

export default SaveToken;
