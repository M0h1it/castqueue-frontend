// pages/Login.jsx
const Login = () => {
  const handleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <button
        onClick={handleLogin}
        className="bg-red-600 text-white px-6 py-3 rounded-xl cursor-pointer"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
