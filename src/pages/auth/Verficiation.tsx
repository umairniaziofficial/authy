import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { HiMail, HiRefresh } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { sendVerificationEmail, logoutUser, setUser } from "@/redux/authSlice";
import { useAuth } from "@/hooks/useAuth";
import { AppDispatch } from "@/redux/store";
import { reload, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebase";

const Verification = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { currentUser, isAuthenticated, isLoading } = useAuth();
  const [checking, setChecking] = useState(false);
  const [verificationAttempted, setVerificationAttempted] = useState(false);
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);
  useEffect(() => {
    if (verificationAttempted) {
      const checkVerificationAfterRedirect = async () => {
        if (!auth.currentUser) return;
        try {
          await reload(auth.currentUser);
          dispatch(setUser(auth.currentUser));
          if (auth.currentUser.emailVerified) {
            toast.success("Email verified successfully!");
            setTimeout(() => navigate("/"), 1000);
          }
        } catch (error) {
          toast.error("Failed to check verification status.");
        }
      };
      checkVerificationAfterRedirect();
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user?.emailVerified) {
          dispatch(setUser(user));
          toast.success("Email verified successfully!");
          setTimeout(() => navigate("/"), 1000);
        }
      });
      return () => unsubscribe();
    }
  }, [verificationAttempted, dispatch, navigate]);
  const checkVerificationStatus = async () => {
    if (!auth.currentUser) return;
    setChecking(true);
    setVerificationAttempted(true);
    try {
      await reload(auth.currentUser);
      dispatch(setUser(auth.currentUser));
      if (auth.currentUser.emailVerified) {
        toast.success("Email verified successfully!");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        toast.error("Email not verified yet. Please check your inbox.");
      }
    } catch (error) {
      toast.error("Failed to check verification status.");
    } finally {
      setChecking(false);
    }
  };
  const handleResendEmail = async () => {
    try {
      const resultAction = await dispatch(sendVerificationEmail());
      if (sendVerificationEmail.fulfilled.match(resultAction)) {
        toast.success("Verification email resent successfully!");
      } else {
        toast.error("Failed to send verification email. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to send verification email. Please try again.");
    }
  };
  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4"
    >
      {" "}
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
        {" "}
        <div className="p-8 md:p-12">
          {" "}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full space-y-8 text-center"
          >
            {" "}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-20 h-20 mx-auto bg-pink-50 rounded-full flex items-center justify-center"
            >
              {" "}
              <HiMail className="w-10 h-10 text-[#FF004D]" />{" "}
            </motion.div>{" "}
            <div className="space-y-2">
              {" "}
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-3xl font-bold"
                style={{ color: "#FF004D" }}
              >
                {" "}
                Verify Your Email{" "}
              </motion.h2>{" "}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-gray-600"
              >
                {" "}
                We've sent a verification link to <br />{" "}
                <span className="font-semibold">{currentUser?.email}</span>{" "}
              </motion.p>{" "}
            </div>{" "}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              {" "}
              <Button
                onClick={checkVerificationStatus}
                className="w-full"
                style={{ backgroundColor: "#FF004D" }}
                disabled={checking || isLoading}
              >
                {" "}
                <HiRefresh
                  className={`mr-2 ${checking ? "animate-spin" : ""}`}
                />{" "}
                {checking ? "Checking..." : "I've Verified My Email"}{" "}
              </Button>{" "}
              <Button
                onClick={handleResendEmail}
                variant="outline"
                className="w-full border-[#FF004D] text-[#FF004D] hover:bg-pink-50"
                disabled={isLoading}
              >
                {" "}
                {isLoading ? "Sending..." : "Resend Email"}{" "}
              </Button>{" "}
              <Button
                onClick={handleLogout}
                variant="ghost"
                className="w-full hover:bg-red-50"
              >
                {" "}
                Sign Out{" "}
              </Button>{" "}
            </motion.div>{" "}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-sm text-gray-500"
            >
              {" "}
              Didn't receive the email? Check your spam folder or try resending.{" "}
            </motion.p>{" "}
          </motion.div>{" "}
        </div>{" "}
      </div>{" "}
    </motion.div>
  );
};
export default Verification;
