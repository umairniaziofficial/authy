import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Chat from "./pages/Chat";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import Verification from "./pages/auth/Verficiation";
import ResetPassword from "./pages/auth/ResetPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "./components/ui/sonner";

const App = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/verification"
          element={
            <ProtectedRoute requiresVerification={false}>
              <Verification />
            </ProtectedRoute>
          }
        />
        <Route path="/forgot-password" element={<ResetPassword />} />
      </Routes>
      <Toaster />
    </Provider>
  );
};
export default App;
