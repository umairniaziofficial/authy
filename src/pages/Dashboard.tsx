"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiHome,
  FiPieChart,
  FiUsers,
  FiSettings,
  FiCalendar,
  FiBell,
  FiMail,
  FiSearch,
  FiMenu,
  FiX,
  FiLogOut,
} from "react-icons/fi";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { createTheme } from "@/components/ui/theme";

const theme = createTheme({
  primary: {
    DEFAULT: "#FF004D",
    foreground: "#FFFFFF",
  },
});

const analyticsData = [
  {
    id: 1,
    name: "Total Users",
    value: "12,345",
    increase: "+12%",
    icon: FiUsers,
  },
  {
    id: 2,
    name: "Revenue",
    value: "$34,567",
    increase: "+8%",
    icon: FiPieChart,
  },
  {
    id: 3,
    name: "Active Sessions",
    value: "1,234",
    increase: "+15%",
    icon: FiCalendar,
  },
  {
    id: 4,
    name: "Conversion Rate",
    value: "3.2%",
    increase: "+2%",
    icon: FiPieChart,
  },
];

const recentActivities = [
  {
    id: 1,
    user: "John Doe",
    action: "Created a new project",
    time: "2 hours ago",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    user: "Jane Smith",
    action: "Updated dashboard settings",
    time: "4 hours ago",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    user: "Mike Johnson",
    action: "Completed task #1234",
    time: "Yesterday",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    user: "Sarah Williams",
    action: "Added new team member",
    time: "2 days ago",
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

const projects = [
  { id: 1, name: "Website Redesign", progress: 75, status: "In Progress" },
  {
    id: 2,
    name: "Mobile App Development",
    progress: 45,
    status: "In Progress",
  },
  { id: 3, name: "Marketing Campaign", progress: 90, status: "Almost Done" },
  { id: 4, name: "Database Migration", progress: 30, status: "Just Started" },
];

const sidebarVariants = {
  open: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
  closed: {
    x: "-100%",
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logging out...");
  };

  return (
    <div className={`flex min-h-screen bg-background ${theme}`}>
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-20 md:hidden"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className="md:block fixed md:relative w-64 h-screen bg-background border-r z-30 md:z-auto"
        variants={sidebarVariants}
        initial="closed"
        animate={isSidebarOpen ? "open" : "closed"}
        style={{ display: isSidebarOpen ? "block" : "none" }}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="text-xl font-bold text-primary">Dashboard</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="md:hidden"
          >
            <FiX className="h-5 w-5" />
          </Button>
        </div>
        <nav className="p-4 space-y-2">
          <motion.div whileHover={{ x: 5 }} className="w-full">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => setActiveTab("overview")}
            >
              <FiHome className="mr-2 h-5 w-5" />
              Overview
            </Button>
          </motion.div>
          <motion.div whileHover={{ x: 5 }} className="w-full">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => setActiveTab("analytics")}
            >
              <FiPieChart className="mr-2 h-5 w-5" />
              Analytics
            </Button>
          </motion.div>
          <motion.div whileHover={{ x: 5 }} className="w-full">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => setActiveTab("users")}
            >
              <FiUsers className="mr-2 h-5 w-5" />
              Users
            </Button>
          </motion.div>
          <motion.div whileHover={{ x: 5 }} className="w-full">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => setActiveTab("settings")}
            >
              <FiSettings className="mr-2 h-5 w-5" />
              Settings
            </Button>
          </motion.div>
        </nav>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-background border-b fixed w-full">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="md:hidden mr-2"
              >
                <FiMenu className="h-5 w-5" />
              </Button>
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  className="pl-10 w-[200px] md:w-[300px]"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="ghost" size="icon" className="relative">
                  <FiBell className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary">
                    3
                  </Badge>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="ghost" size="icon" className="relative">
                  <FiMail className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary">
                    5
                  </Badge>
                </Button>
              </motion.div>
              <Avatar>
                <AvatarImage
                  src="/placeholder.svg?height=40&width=40"
                  alt="User"
                />
                <AvatarFallback>👤</AvatarFallback>
              </Avatar>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={handleLogout}
                  className="text-red-500 hover:text-red-700 hover:bg-red-100"
                >
                  <FiLogOut className="h-5 w-5" />
                </Button>
              </motion.div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <motion.div
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
              >
                {analyticsData.map((item) => (
                  <motion.div key={item.id} variants={fadeInUp}>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                          {item.name}
                        </CardTitle>
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-primary/10 p-2 rounded-full"
                        >
                          <item.icon className="h-5 w-5 text-primary" />
                        </motion.div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{item.value}</div>
                        <p className="text-xs text-muted-foreground">
                          <span className="text-green-500">
                            {item.increase}
                          </span>{" "}
                          from last month
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                  variants={fadeInUp}
                  initial="initial"
                  animate="animate"
                  className="md:col-span-2"
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Project Progress</CardTitle>
                      <CardDescription>
                        Current status of your ongoing projects
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {projects.map((project) => (
                        <div key={project.id} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="font-medium">{project.name}</div>
                            <Badge
                              className={
                                project.progress > 70
                                  ? "bg-green-500"
                                  : project.progress > 40
                                  ? "bg-amber-500"
                                  : "bg-primary"
                              }
                            >
                              {project.status}
                            </Badge>
                          </div>
                          <Progress value={project.progress} className="h-2" />
                          <div className="text-xs text-muted-foreground text-right">
                            {project.progress}% complete
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  variants={fadeInUp}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: 0.2 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                      <CardDescription>
                        Latest actions from your team
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentActivities.map((activity) => (
                          <motion.div
                            key={activity.id}
                            className="flex items-start gap-4"
                            whileHover={{ x: 5 }}
                          >
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={activity.avatar}
                                alt={activity.user}
                              />
                              <AvatarFallback>
                                {activity.user.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                              <p className="text-sm font-medium">
                                {activity.user}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {activity.action}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {activity.time}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        View All Activities
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              </div>
            </TabsContent>

            <TabsContent value="analytics">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Analytics Dashboard</CardTitle>
                    <CardDescription>
                      Detailed metrics and performance data
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px] flex items-center justify-center border rounded-md">
                      <p className="text-muted-foreground">
                        Analytics charts would go here
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="users">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>
                      Manage your team and user permissions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px] flex items-center justify-center border rounded-md">
                      <p className="text-muted-foreground">
                        User management interface would go here
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="settings">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Settings</CardTitle>
                    <CardDescription>
                      Manage your account and application preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px] flex items-center justify-center border rounded-md">
                      <p className="text-muted-foreground">
                        Settings interface would go here
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
