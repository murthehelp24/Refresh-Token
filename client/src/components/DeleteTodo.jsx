import { toast, ToastContainer } from "react-toastify";
import { Plus, CheckCircle2, Trash2, Leaf, Sparkles, Pencil } from "lucide-react";
import useTodoStore from "../stores/todoStore";

function DeleteTodo({ id }) {
    const hdlDeleteTodo = useTodoStore((state) => state.hdlDeleteTodo);
    const hdlDelete = () => {
        toast(({ closeToast }) => (
            <div>
                <p>Delete item?</p>
                <div className="flex gap-2 mt-2">
                    <button
                        onClick={async () => {
                            closeToast();
                            await hdlDeleteTodo(id);
                            toast.success("Delete Success")
                        }}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                        yes
                    </button>
                    <button
                        onClick={closeToast}
                        className="bg-gray-300 px-2 py-1 rounded"
                    >
                        cancel
                    </button>
                </div>
            </div>
        ), { autoClose: false, closeOnClick: false })
    }

    return (
        <div>
            <button className="text-rose-400" onClick={hdlDelete} >
                <Trash2 size={18} />
            </button>
        </div>
    );
}

export default DeleteTodo;