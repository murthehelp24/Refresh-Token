import { useEffect, useState } from "react";
import { Plus, CheckCircle2, Trash2, Leaf, Sparkles, Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import useTodoStore from "../stores/todoStore";
import LogoutButton from "../components/LogOut";
import { toast } from "react-toastify";
import DeleteTodo from "../components/DeleteTodo";

export default function TodoPage() {
  const [editId, setEditId] = useState(null);

  const todos = useTodoStore((state) => state.todos);
  const hdlGetTodo = useTodoStore((state) => state.hdlGetTodo);
  const hdlAddTodo = useTodoStore((state) => state.hdlAddTodo);
  const hdlUpdateTodo = useTodoStore((state) => state.hdlUpdateTodo);

  const { register, handleSubmit, reset } = useForm();
  const { register: registerEdit, handleSubmit: handleSubmitEdit, reset: resetEdit, } = useForm();

  useEffect(() => {
    hdlGetTodo();
  }, []);

  const onSubmit = async (data) => {
    if (!data.task.trim()) return;

    await hdlAddTodo(data.task);
    reset();
  };

  const onSubmitEdit = async (data) => {
    const oldTodo = todos.find((item) => item.id === editId);
    console.log(oldTodo.isDone);
    await hdlUpdateTodo({
      id: editId,
      description: data.editTask,
      isDone: oldTodo.isDone,
    });

    setEditId(null);
    resetEdit();
  };



  return (
    <div className="min-h-screen bg-linear-to-br from-green-100 via-sky-100 to-yellow-100 px-4 py-10">
      <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl border border-white p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-full bg-linear-to-br from-green-300 via-sky-300 to-yellow-300 flex items-center justify-center shadow-lg mb-4">
            <Sparkles className="text-white" size={28} />
          </div>

          <h1 className="text-4xl font-bold text-green-600">My Todo List ✿</h1>

          <p className="text-gray-500 text-sm mt-2">
            Keep your day soft, calm, and productive
          </p>
        </div>

        {/* Add Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-3 mb-8">
          <input
            type="text"
            placeholder="Add a lovely task..."
            {...register("task")}
            className="flex-1 px-4 py-3 rounded-2xl border border-sky-200 bg-sky-50 focus:outline-none focus:ring-2 focus:ring-sky-300"
          />

          <button
            type="submit"
            className="px-5 py-3 rounded-2xl bg-linear-to-r from-green-400 via-sky-400 to-yellow-300 text-white shadow-lg"
          >
            <Plus size={20} />
          </button>
        </form>

        {/* List */}
        <div className="space-y-4">
          {todos.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white rounded-2xl px-4 py-4 shadow-md border border-gray-100"
            >
              <div className="flex items-center gap-3 flex-1">
                <CheckCircle2
                  size={22}
                  onClick={() =>
                    hdlUpdateTodo({
                      ...item,
                      isDone: !item.isDone,
                    })
                  }
                  className={`cursor-pointer ${item.isDone ? "text-green-500" : "text-gray-300"
                    }`}
                />

                {editId === item.id ? (
                  <form
                    onSubmit={handleSubmitEdit(onSubmitEdit)}
                    className="flex gap-2 flex-1"
                  >
                    <input
                      defaultValue={item.description}
                      {...registerEdit("editTask")}
                      className="flex-1 px-3 py-2 rounded-xl border border-sky-200 bg-sky-50 outline-none"
                    />

                    <button type="submit" className="text-sky-500 text-sm">
                      Save
                    </button>
                  </form>
                ) : (
                  <p
                    className={`flex-1 ${item.isDone
                      ? "line-through text-gray-400"
                      : "text-gray-700"
                      }`}
                  >
                    {item.description}
                  </p>
                )}
              </div>

              {editId !== item.id && (
                <div className="flex gap-3 ml-3">
                  <button
                    onClick={() => {
                      setEditId(item.id);
                    }}
                    className="text-yellow-500"
                  >
                    <Pencil size={18} />
                  </button>

                  <DeleteTodo id={item.id} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          {todos.filter((item) => !item.isDone).length} tasks left today
        </div>

        <div className="flex justify-center mt-4">
          <Leaf className="text-green-400" size={22} />
        </div>
        <div className="flex justify-center mt-8">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
