import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const handleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-rose-50 via-orange-50 to-amber-100 px-4">
      <div className="bg-white rounded-3xl shadow-xl flex w-full max-w-5xl overflow-hidden border border-gray-200">
        {/* Left side */}
        <div className="w-1/2 bg-gradient-to-br from-rose-100 via-amber-100 to-rose-200 text-gray-800 flex flex-col justify-center items-center p-10">
          <h2 className="text-4xl font-bold mb-4 text-center">Welcome Back!</h2>
          <p className="text-lg text-center">
            CastQueue helps you manage and upload YouTube content securely.
          </p>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3039/3039389.png"
            alt="Login illustration"
            className="w-60 h-60 mt-6 opacity-90"
          />
        </div>

        {/* Right side */}
        <div className="w-1/2 flex flex-col justify-center items-center p-10">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Login to your account</h3>
          <button
            onClick={handleLogin}
            className="flex items-center gap-3 px-6 py-3 bg-white border border-gray-300 rounded-full shadow-sm hover:shadow-md transition text-gray-700 font-medium cursor-pointer"
          >
            <FcGoogle size={24} />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}
