import { Link } from "react-router-dom";
import { Sparkles, Leaf, ArrowRight, LogIn, UserPlus } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-sky-100 to-yellow-100 flex items-center justify-center px-4 overflow-hidden">
      <div className="w-full max-w-3xl bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl border border-white p-10 text-center relative">
        {/* Floating Decorations */}
        <Sparkles
          className="absolute top-6 left-8 text-yellow-400 animate-bounce"
          size={22}
        />
        <Leaf
          className="absolute bottom-8 left-10 text-green-400 animate-pulse"
          size={24}
        />
        <Sparkles
          className="absolute top-10 right-10 text-sky-400 animate-ping"
          size={18}
        />
        <Leaf
          className="absolute bottom-10 right-8 text-green-300 animate-bounce"
          size={20}
        />

        {/* Logo Circle */}
        <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-green-300 via-sky-300 to-yellow-300 flex items-center justify-center shadow-xl mb-6 animate-pulse">
          <Sparkles className="text-white" size={38} />
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-bold text-green-600 mb-4">
          Welcome ✿
        </h1>

        <p className="text-gray-600 text-lg max-w-xl mx-auto leading-relaxed mb-10">
          A calm little space to organize your day, track your goals, and enjoy
          productivity with soft pastel vibes.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/register"
            className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-gradient-to-r from-green-400 via-sky-400 to-yellow-300 text-white font-semibold shadow-lg hover:scale-105 active:scale-95 transition"
          >
            <UserPlus size={20} />
            Register
          </Link>

          <Link
            to="/login"
            className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-white border border-sky-200 text-sky-600 font-semibold shadow-md hover:scale-105 active:scale-95 transition"
          >
            <LogIn size={20} />
            Login
          </Link>
        </div>

        {/* Bottom Text */}
        <div className="mt-10 text-sm text-gray-500 flex items-center justify-center gap-2">
          Start your happy journey
          <ArrowRight size={16} className="animate-pulse" />
        </div>
      </div>
    </div>
  );
}
