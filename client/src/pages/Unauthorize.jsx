import { Lock, Leaf, ArrowLeft, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function UnauthorizedPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-br from-green-100 via-sky-100 to-yellow-100 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl border border-white p-10 text-center">
        {/* Icon */}
        <div className="w-20 h-20 mx-auto rounded-full bg-linear-to-br from-green-300 via-sky-300 to-yellow-300 flex items-center justify-center shadow-lg mb-6">
          <Lock className="text-white" size={34} />
        </div>

        {/* Title */}
        <h1 className="text-6xl font-bold text-green-600 mb-2">401</h1>

        <h2 className="text-3xl font-bold text-gray-700 mb-3">
          Unauthorized ✿
        </h2>

        <p className="text-gray-500 text-sm leading-relaxed max-w-sm mx-auto">
          Sorry, you need permission to enter this cozy space. Please login
          first.
        </p>

        {/* Decorations */}
        <div className="flex justify-center gap-3 mt-6 mb-8">
          <Sparkles className="text-sky-400" size={20} />
          <Leaf className="text-green-400" size={20} />
          <Sparkles className="text-yellow-400" size={20} />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-sky-200 text-sky-600 font-semibold shadow-md hover:scale-[1.03] active:scale-95 transition"
          >
            <ArrowLeft size={18} />
            Home
          </button>

          <button
            onClick={() => navigate("/login")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-linear-to-r from-green-400 via-sky-400 to-yellow-300 text-white font-semibold shadow-lg hover:scale-[1.03] active:scale-95 transition"
          >
            <Lock size={18} />
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
