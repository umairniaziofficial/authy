import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast, Toaster } from "sonner";

function App() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Account created successfully!");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4"
    >
      <div className="flex w-full max-w-6xl bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Left side - Image */}
        <div className="hidden md:block w-1/2 relative bg-black">
          <img
            src="https://i.pinimg.com/736x/12/5a/34/125a341b7fc99f66bec0f48643c75088.jpg"
            alt="Auth Background"
            className="w-full h-full object-cover opacity-80 max-h-[90vh]"
          />
          <div className="absolute bottom-8 left-8 text-white z-10">
            <h1 className="text-4xl font-bold mb-4 drop-shadow-lg">
              Welcome Back
            </h1>
            <p className="text-lg drop-shadow-lg">
              Sign up to continue your journey
            </p>
          </div>
        </div>

        {/* Right side - Form */}
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
                Create Account
              </motion.h2>
              <p className="mt-2 text-gray-600">Please fill in your details</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="space-y-2"
              >
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full focus-visible:ring-black focus-visible:border-0 focus-visible:ring-2"
                />
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="space-y-2"
              >
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  className="w-full focus-visible:ring-black focus-visible:border-0 focus-visible:ring-2"
                />
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Button
                  type="submit"
                  className="w-full hover:cursor-pointer"
                  style={{ backgroundColor: "#FF004D" }}
                >
                  Sign Up
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
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() =>
                    toast.info("Google authentication coming soon!")
                  }
                >
                  <FaGoogle className="mr-2" />
                  Google
                </Button>
              </motion.div>
            </form>

            <p className="mt-4 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium hover:underline"
                style={{ color: "#FF004D" }}
              >
                Sign in
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
      <Toaster />
    </motion.div>
  );
}

export default App;
