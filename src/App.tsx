import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import Verficiation from "./pages/auth/Verficiation";
import ResetPassword from "./pages/auth/ResetPassword";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verficiation" element={<Verficiation />} />
      <Route path="/forgot-password" element={<ResetPassword />} />
    </Routes>
  );
};
export default App;
