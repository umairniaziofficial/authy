import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { HiLockClosed } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { resetPassword } from "@/redux/authSlice";
import { AppDispatch } from "@/redux/store";
import { useAuth } from "@/hooks/useAuth";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useAuth();

  if (isAuthenticated) {
    navigate("/");
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    try {
      const resultAction = await dispatch(resetPassword(email));
      
      if (resetPassword.fulfilled.match(resultAction)) {
        toast.success("Password reset email sent successfully!");
        setEmailSent(true);
      } else {
        toast.error("Failed to send reset email. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to send reset email. Please try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4"
    >
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="p-8 md:p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full space-y-8 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-20 h-20 mx-auto bg-pink-50 rounded-full flex items-center justify-center"
            >
              <HiLockClosed className="w-10 h-10 text-[#FF004D]" />
            </motion.div>

            <div className="space-y-2">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-3xl font-bold"
                style={{ color: "#FF004D" }}
              >
                {emailSent ? "Check Your Email" : "Reset Password"}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-gray-600"
              >
                {emailSent 
                  ? `We've sent a password reset link to ${email}`
                  : "Enter your email to receive a password reset link"}
              </motion.p>
            </div>

            {!emailSent ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-2"
                >
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter your email"
                    className="w-full focus-visible:ring-[#FF004D] focus-visible:border-0 focus-visible:ring-2"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-4"
                >
                  <Button
                    type="submit"
                    className="w-full"
                    style={{ backgroundColor: "#FF004D" }}
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending..." : "Reset Password"}
                  </Button>
                </motion.div>
              </form>
            ) : (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="space-y-4 mt-6"
              >
                <p className="text-sm text-gray-600">
                  Follow the instructions in the email to reset your password.
                </p>
                <Button
                  onClick={() => setEmailSent(false)}
                  variant="outline"
                  className="w-full border-[#FF004D] text-[#FF004D] hover:bg-pink-50"
                >
                  Use a different email
                </Button>
              </motion.div>
            )}

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Link to="/login">
                <Button
                  variant="ghost"
                  className="w-full text-[#FF004D] hover:bg-pink-50 mt-2"
                >
                  Back to Login
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ResetPassword;
