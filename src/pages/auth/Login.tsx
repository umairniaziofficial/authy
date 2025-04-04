/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { signInUser, signInWithGoogle } from "@/redux/authSlice";
import { useAuth } from "@/hooks/useAuth";
import { AppDispatch } from "@/redux/store";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isAuthenticated, error, isLoading } = useAuth();

  if (isAuthenticated) {
    navigate("/");
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const resultAction = await dispatch(signInUser({ email, password }));
      
      if (signInUser.fulfilled.match(resultAction)) {
        const user = resultAction.payload;
        
        if (user.emailVerified) {
          toast.success("Logged in successfully!");
          navigate("/");
        } else {
          toast.info("Please verify your email before continuing");
          navigate("/verification");
        }
      } else {
        toast.error(error || "Login failed. Please try again.");
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const resultAction = await dispatch(signInWithGoogle());
      
      if (signInWithGoogle.fulfilled.match(resultAction)) {
        toast.success("Logged in with Google successfully!");
        navigate("/");
      }
    } catch (error) {
      toast.error("Google sign in failed. Please try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4"
    >
      <div className="flex w-full max-w-6xl bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Left side - Form */}
        <div className="flex-1 flex items-center justify-center p-8 md:p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md space-y-6"
          >
            <div className="text-center">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-3xl font-bold"
                style={{ color: "#FF004D" }}
              >
                Welcome Back
              </motion.h2>
              <p className="mt-2 text-gray-600">Sign in to your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="space-y-2"
              >
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter your email"
                  className="w-full focus-visible:ring-[#FF004D] focus-visible:border-0 focus-visible:ring-2"
                />
              </motion.div>

              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="space-y-2"
              >
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-[#FF004D] hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Enter your password"
                    className="w-full focus-visible:ring-[#FF004D] focus-visible:border-0 focus-visible:ring-2 pr-10"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <FaEyeSlash size={16} />
                    ) : (
                      <FaEye size={16} />
                    )}
                  </button>
                </div>
              </motion.div>

              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Button
                  type="submit"
                  className="w-full"
                  style={{ backgroundColor: "#FF004D" }}
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </motion.div>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                >
                  <FaGoogle className="mr-2" />
                  Google
                </Button>
              </motion.div>
            </form>

            <p className="mt-4 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium hover:underline"
                style={{ color: "#FF004D" }}
              >
                Sign up
              </Link>
            </p>
          </motion.div>
        </div>

        {/* Right side - Image */}
        <div className="hidden md:block w-1/2 relative bg-black">
          <img
            src="https://i.pinimg.com/736x/40/88/e6/4088e64a9beced5e1a425862b5671dfb.jpg"
            alt="Auth Background"
            className="w-full h-full max-h-[90vh] object-cover opacity-80"
          />
          <div className="absolute bottom-8 left-8 text-white z-10">
            <h1 className="text-4xl font-bold mb-4 drop-shadow-lg">
              Hello Again!
            </h1>
            <p className="text-lg drop-shadow-lg">
              Sign in to access your account
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
