import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { FiLogOut, FiSend } from "react-icons/fi";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createTheme } from "@/components/ui/theme";
import { useAuth } from "@/hooks/useAuth";
import { logoutUser } from "@/redux/authSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { db } from "@/firebase/firebase";
import {
  fetchMessages,
  addMessage,
  updateMessages,
  timestampToDate,
} from "@/redux/apiSlice";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";

const theme = createTheme({
  primary: {
    DEFAULT: "#FF004D",
    foreground: "#FFFFFF",
  },
});

export default function ChatApp() {
  const [newMessage, setNewMessage] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const { messages, status } = useSelector(
    (state: RootState) => state.messages
  );

  useEffect(() => {
    if (currentUser?.email) {
      setEmail(currentUser.email);
    }
  }, [currentUser]);

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("createdAt", "asc"),
      limit(100)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedMessages: any[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        fetchedMessages.push({
          id: doc.id,
          ...data,
        });
      });
      dispatch(updateMessages(fetchedMessages));
    });

    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    const messagesContainer = document.getElementById("messages-container");
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }, [messages]);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !email.trim()) {
      toast.error("Please enter both email and message");
      return;
    }

    try {
      await dispatch(addMessage({ email, text: newMessage }));
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message: ", error);
      toast.error("Failed to send message. Please try again.");
    }
  };

  const extractName = (email: string): string => {
    if (!email) return "Anonymous";
    const namePart = email.split("@")[0];
    return namePart.charAt(0).toUpperCase() + namePart.slice(1);
  };

  return (
    <div className={`flex flex-col min-h-screen bg-background ${theme}`}>
      {/* Header */}
      <header className="bg-background border-b sticky top-0 z-10">
        <div className="flex items-center justify-between p-2 sm:p-4 flex-wrap">
          <div className="flex items-center gap-2">
            <h1 className="text-lg sm:text-xl font-bold text-primary">Authy Chat App</h1>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="flex items-center gap-1 sm:gap-2">
              {currentUser && (
                <>
                  <Avatar className="h-7 w-7 sm:h-8 sm:w-8">
                    <AvatarImage
                      src={
                        currentUser?.photoURL ||
                        "/placeholder.svg?height=40&width=40"
                      }
                      alt={currentUser?.displayName || "User"}
                    />
                    <AvatarFallback>
                      {currentUser?.displayName?.charAt(0) ||
                        extractName(currentUser?.email || "")[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium">
                      {currentUser?.displayName ||
                        extractName(currentUser?.email || "")}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {currentUser?.email}
                    </p>
                  </div>
                  <div className="block sm:hidden">
                    <p className="text-xs font-medium">
                      {extractName(currentUser?.email || "")}
                    </p>
                  </div>
                </>
              )}
            </div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="text-red-500 hover:text-red-700 hover:bg-red-100 h-8 w-8 sm:h-9 sm:w-9"
              >
                <FiLogOut className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 flex flex-col">
        <Card className="flex-1 flex flex-col">
          <CardHeader>
            <CardTitle>Chat Messages</CardTitle>
            <CardDescription>
              Join the conversation by sending a message
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            {/* Messages Container */}
            <div
              id="messages-container"
              className="flex-1 border rounded-md p-4 mb-4 overflow-y-auto max-h-[calc(100vh-300px)]"
            >
              {status === "loading" && messages.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : messages.length === 0 ? (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  No messages yet. Be the first to send one!
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${
                        currentUser?.email === message.email
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`flex ${
                          currentUser?.email === message.email
                            ? "flex-row-reverse"
                            : "flex-row"
                        } items-start gap-2 max-w-[80%]`}
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarFallback
                            className={`${
                              currentUser?.email === message.email
                                ? "bg-primary"
                                : "bg-slate-500"
                            } text-white`}
                          >
                            {extractName(message.email)[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={`rounded-lg p-3 ${
                            currentUser?.email === message.email
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          <p className="text-xs font-semibold mb-1">
                            {extractName(message.email)}
                          </p>
                          <p className="text-sm whitespace-pre-wrap break-words">
                            {message.text}
                          </p>
                          <p className="text-xs opacity-70 mt-1 text-right">
                            {message.createdAt
                              ? timestampToDate(
                                  message.createdAt
                                )?.toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })
                              : "Just now"}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Message Input */}
            <div className="flex flex-col space-y-2">
              <div className="flex space-x-2">
                <Input
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!!currentUser}
                  className="flex-1"
                />
              </div>
              <div className="flex space-x-2">
                <Textarea
                  placeholder="Type your message here..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 resize-none"
                  rows={2}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button
                  onClick={handleSendMessage}
                  className="self-end"
                  disabled={
                    !newMessage.trim() || !email.trim() || status === "loading"
                  }
                >
                  <FiSend className="mr-2 h-4 w-4" />
                  Send
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
