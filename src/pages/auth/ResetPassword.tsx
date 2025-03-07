import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { HiLockClosed } from "react-icons/hi";
import { Link } from "react-router-dom";
import { toast, Toaster } from "sonner";

const ResetPassword = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Password reset successfully!");
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
                Reset Password
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-gray-600"
              >
                Enter your new password below
              </motion.p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="space-y-2"
              >
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter new password"
                  className="w-full focus-visible:ring-[#FF004D] focus-visible:border-0 focus-visible:ring-2"
                />
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="space-y-2"
              >
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm new password"
                  className="w-full focus-visible:ring-[#FF004D] focus-visible:border-0 focus-visible:ring-2"
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
                >
                  Reset Password
                </Button>

                <Link to="/login">
                  <Button
                    variant="ghost"
                    className="w-full text-[#FF004D] hover:bg-pink-50"
                  >
                    Back to Login
                  </Button>
                </Link>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
      <Toaster />
    </motion.div>
  );
};

export default ResetPassword;
