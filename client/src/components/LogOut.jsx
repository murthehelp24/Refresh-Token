import { LogOut } from "lucide-react";
import useUserStore from "../stores/userStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function LogoutButton() {
  const navigate = useNavigate();

  const hdlLogout = useUserStore((state) => state.hdlLogout);

  const handleLogout = async () => {
    console.log("logout")
    await hdlLogout();
    navigate("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-linear-to-br from-green-300 via-sky-300 to-yellow-300  text-white shadow-md hover:scale-105 active:scale-95 transition"
    >
      <LogOut size={18} />
      Logout
    </button>
  );
}

export default LogoutButton;
