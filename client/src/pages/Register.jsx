import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { User, Mail, Lock, Sparkles, Leaf } from "lucide-react";
import useUserStore from "../stores/userStore";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const hdlRegister = useUserStore((state) => state.hdlRegister);

  const onSubmit = ({ name, email, password }) => {
    hdlRegister(name, email, password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-sky-100 to-yellow-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl border border-white p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-green-300 to-sky-300 flex items-center justify-center shadow-lg mb-4">
            <Sparkles className="text-white" size={28} />
          </div>

          <h1 className="text-4xl font-bold text-green-600">
            Create Account ✿
          </h1>

          <p className="text-gray-500 mt-2 text-sm">
            Join your happy little space
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label className="text-sm text-gray-600 mb-2 flex items-center gap-2">
              <User size={16} className="text-green-500" />
              Full Name
            </label>

            <input
              type="text"
              placeholder="Your name"
              {...register("name", { required: "Name is required" })}
              className="w-full px-4 py-3 rounded-2xl bg-green-50 border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-300"
            />

            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-600 mb-2 flex items-center gap-2">
              <Mail size={16} className="text-sky-500" />
              Email
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-3 rounded-2xl bg-sky-50 border border-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-300"
            />

            {errors.email && (
              <p className="text-red-400 text-sm mt-1">
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
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters",
                },
              })}
              className="w-full px-4 py-3 rounded-2xl bg-yellow-50 border border-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />

            {errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
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
              Register
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="text-green-600 font-semibold cursor-pointer hover:underline"
          >
            Login
          </Link>
        </div>

        {/* Decoration */}
        <div className="flex justify-center mt-6">
          <Leaf className="text-green-400" size={22} />
        </div>
      </div>
    </div>
  );
}

export default Register;
