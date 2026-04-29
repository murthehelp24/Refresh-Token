import { Link, useNavigate } from "react-router-dom";
import { Leaf, Lock, Mail, Sparkles } from "lucide-react";
import { useForm } from "react-hook-form";
import useUserStore from "../stores/userStore";

function Login() {
  const hdlLogin = useUserStore((state) => state.hdlLogin);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const hbdSubmit = async ({ email, password }) => {
    try {
      await hdlLogin(email, password);
      navigate("/todo");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-sky-100 to-yellow-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl border border-white p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-green-300 to-sky-300 flex items-center justify-center shadow-lg mb-4">
            <Sparkles className="text-white" size={28} />
          </div>

          <h1 className="text-4xl font-bold text-green-600">Hello Again ✿</h1>

          <p className="text-gray-500 mt-2 text-sm">
            Login to your happy place
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit(hbdSubmit)}>
          {/* Email */}
          <div>
            <label className="text-sm text-gray-600 mb-2 flex items-center gap-2">
              <Mail size={16} className="text-sky-500" />
              Email
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-2xl bg-sky-50 border border-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-300"
              {...register("email", {
                required: "Please enter email",
              })}
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-600 mb-2 flex items-center gap-2">
              <Lock size={16} className="text-yellow-500" />
              Password
            </label>

            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-2xl bg-yellow-50 border border-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              {...register("password", {
                required: "Please enter password",
              })}
            />

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Options */}
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2 text-gray-500">
              <input type="checkbox" />
              Remember me
            </label>

            <a href="#" className="text-sky-500 hover:underline">
              Forgot?
            </a>
          </div>

          {/* Button */}
          <div className="flex gap-3">
            <Link
              to={"/"}
              className="w-full py-3 rounded-2xl bg-white border border-sky-200 text-sky-600 font-semibold shadow-md hover:scale-[1.02] active:scale-95 transition text-center"
            >
              cancel
            </Link>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-green-400 via-sky-400 to-yellow-300 text-white font-semibold shadow-lg hover:scale-[1.02] active:scale-95 transition"
            >
              Login
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-500">
          New here?{" "}
          <Link
            to={"/register"}
            className="text-green-600 font-semibold cursor-pointer hover:underline"
          >
            Create account
          </Link>
        </div>

        {/* Bottom Decoration */}
        <div className="flex justify-center mt-6">
          <Leaf className="text-green-400" size={22} />
        </div>
      </div>
    </div>
  );
}

export default Login;
