import { Search, Leaf, ArrowLeft, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-sky-100 to-yellow-100 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl border border-white p-10 text-center">
        {/* Icon */}
        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-green-300 via-sky-300 to-yellow-300 flex items-center justify-center shadow-lg mb-6">
          <Search className="text-white" size={34} />
        </div>

        {/* Title */}
        <h1 className="text-6xl font-bold text-green-600 mb-2">404</h1>

        <h2 className="text-3xl font-bold text-gray-700 mb-3">
          Page Not Found ✿
        </h2>

        <p className="text-gray-500 text-sm leading-relaxed max-w-sm mx-auto">
          Oops! The page you're looking for seems to have wandered off into the
          garden.
        </p>

        {/* Decorations */}
        <div className="flex justify-center gap-3 mt-6 mb-8">
          <Sparkles className="text-sky-400" size={20} />
          <Leaf className="text-green-400" size={20} />
          <Sparkles className="text-yellow-400" size={20} />
        </div>

        {/* Button */}
        <button
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-green-400 via-sky-400 to-yellow-300 text-white font-semibold shadow-lg hover:scale-[1.03] active:scale-95 transition"
          onClick={() => {
            navigate("/");
          }}
        >
          <ArrowLeft size={18} />
          Back Home
        </button>
      </div>
    </div>
  );
}
