import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import Wrapper from "./layout/Wrapper";
import { useSelector } from "react-redux";
import Export from "./pages/Export";
import Income from "./pages/Income";
import { ToastContainer } from "react-toastify";

function App() {
  // const { isAuthenticated, user } = useSelector((state) => state.auth);
  // console.log(isAuthenticated, user);
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
      <Routes>
        {/* <Route
        path="/"
        index
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
        }
      /> */}
        <Route path="/" index element={<Login />} />
        <Route path="/" element={<Wrapper />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/export" element={<Export />} />
          <Route path="/income" element={<Income />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
