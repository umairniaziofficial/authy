import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { HiMail } from "react-icons/hi";
import { Link } from "react-router-dom";
import { toast, Toaster } from "sonner";

const Verification = () => {
  const userEmail = "user@example.com"; // This would come from your auth state

  const handleResendEmail = () => {
    toast.success("Verification email resent successfully!");
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
              <HiMail className="w-10 h-10 text-[#FF004D]" />
            </motion.div>

            <div className="space-y-2">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-3xl font-bold"
                style={{ color: "#FF004D" }}
              >
                Check your email
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-gray-600"
              >
                We've sent a verification link to
                <br />
                <span className="font-semibold">{userEmail}</span>
              </motion.p>
            </div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <Button
                onClick={handleResendEmail}
                variant="outline"
                className="w-full border-[#FF004D] text-[#FF004D] hover:bg-pink-50"
              >
                Resend Email
              </Button>

              <Link to="/login">
                <Button
                  className="w-full"
                  style={{ backgroundColor: "#FF004D" }}
                >
                  Back to Login
                </Button>
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-sm text-gray-500"
            >
              Didn't receive the email? Check your spam folder or try resending.
            </motion.p>
          </motion.div>
        </div>
      </div>
      <Toaster />
    </motion.div>
  );
};

export default Verification;
