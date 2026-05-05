import { RouterProvider } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import appRouter from "./routes/AppRouter";
function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
      <ToastContainer />
    </>
  );
}
export default App;
