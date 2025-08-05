import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Search, Settings, Menu, X, Home, MessageCircle, Compass, Wallet as WalletIcon, Folder, User, LogOut, Check, Camera, Image, Bell, Moon, Sun, Mail, Star, Clock, AlertCircle } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";






interface HeaderProps {
  onOpenSettings: () => void;
  onOpenNotifications: () => void;
  onOpenMessages: () => void;
  onOpenDiscover: () => void;
  onOpenWallet: () => void;
  onOpenProjects: () => void;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  onSearchTrigger: () => void;
  onOpenHome: () => void;
}

const sectionTitles = [
  "Income Tracker",
  "Your Recent Project",
  "Let's Connect",
  "Upgrade Premium",
  "Proposal Progress",
  "Earning Breakdown",
  "Client Feedback"
];

export default function Header({ onOpenSettings, onOpenNotifications, onOpenMessages, onOpenDiscover, onOpenWallet, onOpenProjects, searchValue, setSearchValue, onSearchTrigger, onOpenHome }: HeaderProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [hasUnreadNotifications, setHasUnreadNotifications] = React.useState(true);
  const [notificationsOpen, setNotificationsOpen] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [profileData, setProfileData] = React.useState({
    name: "User Name",
    email: "user@example.com",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  });
  const [tempData, setTempData] = React.useState({
    name: "User Name",
    email: "user@example.com",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  });
  const [showImageGallery, setShowImageGallery] = React.useState(false);
  const [showLogoutAlert, setShowLogoutAlert] = React.useState(false);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [showLoginPage, setShowLoginPage] = React.useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = React.useState(false);
  const [loginData, setLoginData] = React.useState({
    fullName: "",
    email: "",
    password: ""
  });
  const [dob, setDob] = useState<Date | undefined>();
  const [sidebarWidth, setSidebarWidth] = useState(260); // default width in px
  const [isResizing, setIsResizing] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [notFound, setNotFound] = useState(false);

  // Initialize dark mode state based on document class
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
  }, []);

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.notification-dropdown')) {
        setNotificationsOpen(false);
      }
    };

    if (notificationsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [notificationsOpen]);

  // Sample notifications data
  const [notifications, setNotifications] = React.useState([
    {
      id: 1,
      title: "New message from John Doe",
      message: "Hey! I have a new project for you...",
      time: "2 minutes ago",
      type: "message",
      unread: true
    },
    {
      id: 2,
      title: "Payment received",
      message: "You received $500 for Project Alpha",
      time: "1 hour ago",
      type: "payment",
      unread: true
    },
    {
      id: 3,
      title: "Project deadline reminder",
      message: "Project Beta is due in 2 days",
      time: "3 hours ago",
      type: "reminder",
      unread: false
    },
    {
      id: 4,
      title: "New client request",
      message: "Sarah Johnson wants to discuss a project",
      time: "5 hours ago",
      type: "request",
      unread: false
    }
  ]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Toggle dark mode on document
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  const markAllAsRead = () => {
    console.log('Mark all as read clicked');
    setHasUnreadNotifications(false);
    // Mark all notifications as read
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => ({
        ...notification,
        unread: false
      }))
    );
  };

  const handleNotificationClick = (notificationId: number) => {
    console.log('Notification clicked with ID:', notificationId);
    // Handle notification click - you can add navigation or other actions here
    const notification = notifications.find(n => n.id === notificationId);
    if (notification) {
      console.log('Notification found:', notification);
      
      // Mark notification as read
      setNotifications(prevNotifications => 
        prevNotifications.map(n => 
          n.id === notificationId 
            ? { ...n, unread: false }
            : n
        )
      );
      
      // Update unread count
      const updatedNotifications = notifications.map(n => 
        n.id === notificationId 
          ? { ...n, unread: false }
          : n
      );
      const hasUnread = updatedNotifications.some(n => n.unread);
      setHasUnreadNotifications(hasUnread);
      
      // Handle different notification types
      switch (notification.type) {
        case 'message':
          onOpenMessages();
          break;
        case 'payment':
          onOpenWallet();
          break;
        case 'reminder':
          onOpenProjects();
          break;
        case 'request':
          onOpenDiscover();
          break;
        default:
          console.log('Unknown notification type:', notification.type);
      }
      
      // Close notification popover
      setNotificationsOpen(false);
    }
  };

  // Function to add a test notification
  const addTestNotification = () => {
    console.log('Add test notification clicked');
    const newNotification = {
      id: Date.now(),
      title: "Test notification",
      message: "This is a test notification to verify functionality",
      time: "Just now",
      type: "message",
      unread: true
    };
    setNotifications(prev => [newNotification, ...prev]);
    setHasUnreadNotifications(true);
  };

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      if (isResizing) {
        setSidebarWidth(Math.min(Math.max(e.clientX, 180), 400)); // clamp between 180 and 400px
      }
    }
    function handleMouseUp() {
      setIsResizing(false);
    }
    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);

    if (
      value &&
      !sectionTitles.some((title) =>
        title.toLowerCase().includes(value.toLowerCase())
      )
    ) {
      setNotFound(true);
    } else {
      setNotFound(false);
    }
  };

  const clearSearch = () => {
    setSearchValue("");
    setNotFound(false);
  };

  const handleEditProfile = () => {
    setIsEditing(true);
    setTempData({ ...profileData });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setTempData({ ...profileData });
  };

  const handleConfirmEdit = () => {
    setProfileData({ ...tempData });
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setTempData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSignInOut = () => {
    if (isAuthenticated) {
      setShowLogoutAlert(true);
    } else {
      setShowLoginPage(true);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Update profile data with login information
    setProfileData({
      name: loginData.fullName,
      email: loginData.email,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    });
    setTempData({
      name: loginData.fullName,
      email: loginData.email,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    });
    setIsAuthenticated(true);
    setShowLoginPage(false);
    setShowSuccessAlert(true);
    
    // Hide success alert after 3 seconds
    setTimeout(() => {
      setShowSuccessAlert(false);
    }, 3000);
  };

  const handleLoginInputChange = (field: string, value: string) => {
    setLoginData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLogoutConfirm = () => {
    // Reset profile data to default user
    setProfileData({
      name: "User Name",
      email: "user@example.com",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    });
    setTempData({
      name: "User Name",
      email: "user@example.com",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    });
    setIsAuthenticated(false);
    setIsEditing(false);
    setShowLogoutAlert(false);
  };

  const handleImageSelect = (imageUrl: string) => {
    setTempData(prev => ({
      ...prev,
      image: imageUrl
    }));
    setShowImageGallery(false);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setTempData(prev => ({
        ...prev,
        image: imageUrl
      }));
    }
  };

  const sampleImages = [
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  ];

  return (
    <header className="w-full flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4 bg-gray-200 dark:bg-gray-800 border-b dark:border-gray-700 transition-colors duration-200">
      {/* Left: Hamburger (mobile/tablet) + Logo */}
      <div className="flex items-center gap-3">
        {/* Hamburger Icon (only on md and below, left side) */}
        <Button
          variant="ghost"
          size="sm"
          className="block lg:hidden mr-2 p-0"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="w-7 h-7" />
        </Button>
        {/* Logo */}
        <div className="font-bold text-xl text-orange-600 dark:text-orange-400 flex items-center">
          {/* Letter logo */}
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 36,
              height: 36,
              background: '#F44A1A', // or your brand color
              color: '#fff',
              borderRadius: '40% 60% 60% 40% / 60% 40% 60% 40%', // for an organic shape
              fontWeight: 'bold',
              fontSize: 24,
              marginRight: 8,
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
            }}
          >
            R
          </span>
          RAMZZ
        </div>
      </div>
      {/* Nav Items (hidden on md and below, visible on lg and up) */}
      <div className="hidden lg:flex gap-3">
        <Button 
          variant="ghost" 
          className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-110 hover:animate-pulse transition-all duration-200 ease-in-out transform hover:shadow-md hover:bg-gray-200/50 dark:hover:bg-gray-700/50" 
          onClick={onOpenHome}
        >
          Home
        </Button>
        <Button 
          variant="ghost" 
          className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-110 hover:animate-pulse transition-all duration-200 ease-in-out transform hover:shadow-md hover:bg-gray-200/50 dark:hover:bg-gray-700/50" 
          onClick={onOpenMessages}
        >
          Messages
        </Button>
        <Button 
          variant="ghost" 
          className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-110 hover:animate-pulse transition-all duration-200 ease-in-out transform hover:shadow-md hover:bg-gray-200/50 dark:hover:bg-gray-700/50" 
          onClick={onOpenDiscover}
        >
          Discover
        </Button>
        <Button
          variant="ghost"
          className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-110 hover:animate-pulse transition-all duration-200 ease-in-out transform hover:shadow-md hover:bg-gray-200/50 dark:hover:bg-gray-700/50"
          onClick={onOpenWallet}
        >
          Wallet
        </Button>
        <Button
          variant="ghost"
          className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-110 hover:animate-pulse transition-all duration-200 ease-in-out transform hover:shadow-md hover:bg-gray-200/50 dark:hover:bg-gray-700/50"
          onClick={onOpenProjects}
        >
          Projects
        </Button>
      </div>
      {/* Right side icons */}
      <div className="flex items-center gap-2 md:gap-3 lg:gap-4">
        
        {/* Search bar (only on small screens) */}
        <div className="relative block sm:hidden ml-2 md:ml-4 lg:ml-2">
          <Input
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={handleSearchChange}
            onKeyDown={e => {
              if (e.key === "Enter") {
                onSearchTrigger();
              }
            }}
            className="w-16 md:w-14 lg:w-16 pl-5 pr-5 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          />
          <Search className="absolute left-1 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-3 h-3" />
          {searchValue && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 p-0 h-auto"
              aria-label="Clear search"
            >
              <X className="w-3 h-3" />
            </Button>
          )}
          {notFound && (
            <Card className="absolute left-0 mt-2 w-full bg-white dark:bg-gray-700 border border-red-300 dark:border-red-600 text-red-500 dark:text-red-400 rounded p-2 text-center shadow">
              <CardContent className="p-2 text-center">
              Not Found
              </CardContent>
            </Card>
          )}
        </div>
        
        <div className="relative hidden sm:block">
          <Input
            type="text"
            placeholder="Enter your search request..."
            value={searchValue}
            onChange={handleSearchChange}
            onKeyDown={e => {
              if (e.key === "Enter") {
                onSearchTrigger();
              }
            }}
            className="w-64 pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
          {searchValue && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-0 h-auto"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
          {notFound && (
            <Card className="absolute left-0 mt-2 w-full bg-white dark:bg-gray-700 border border-red-300 dark:border-red-600 text-red-500 dark:text-red-400 rounded p-2 text-center shadow">
              <CardContent className="p-2 text-center">
              Not Found
              </CardContent>
            </Card>
          )}
        </div>
        
        {/* Dark Mode Toggle (hidden on small screens) */}
        <Button 
          variant="ghost"
          size="sm"
          onClick={toggleDarkMode}
          className="hidden sm:flex rounded-full bg-white dark:bg-gray-700 p-2.5 items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200 transform hover:scale-105"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? (
            <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
          ) : (
            <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-300" />
          )}
        </Button>
        
        {/* Settings and Bell icons (hidden on small screens) */}
        <div className="hidden sm:flex items-center gap-4">
          <Button 
            variant="ghost"
            size="sm"
            className="rounded-full bg-white dark:bg-gray-700 p-2.5 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition" 
            onClick={onOpenSettings}
          >
            <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-300" />
          </Button>
          <div className="relative notification-dropdown">
            <Button 
              variant="ghost"
              size="sm"
              className="rounded-full bg-white dark:bg-gray-700 p-2.5 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition relative"
              onClick={() => {
                console.log('Bell icon clicked');
                setNotificationsOpen(!notificationsOpen);
              }}
            >
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-300" />
              {hasUnreadNotifications && (
                <Badge className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full p-0 border-0" />
              )}
            </Button>
            
            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto scrollbar-hide">
                <div className="flex items-center justify-between mb-3">
                  <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">Notifications</CardTitle>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={addTestNotification}
                      className="text-xs text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
                    >
                      Add Test
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={markAllAsRead}
                      className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                    >
                      Mark all read
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  {notifications.map((notification) => (
                    <Card 
                      key={notification.id} 
                      className={`${notification.unread ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700' : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600'} hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer`}
                      onClick={() => handleNotificationClick(notification.id)}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-start gap-3">
                          <Badge className={`w-2 h-2 rounded-full mt-2 p-0 border-0 ${notification.unread ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-500'}`} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <CardTitle className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{notification.title}</CardTitle>
                              <Badge variant="secondary" className="text-xs text-gray-500 dark:text-gray-400 ml-2 bg-transparent border-0">
                                {notification.time}
                              </Badge>
                            </div>
                            <Badge variant="secondary" className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2 bg-transparent border-0 p-0">
                              {notification.message}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                {notifications.length === 0 && (
                  <Card className="text-center py-4 bg-transparent border-0 shadow-none">
                    <CardContent className="p-4">
                      <Bell className="w-8 h-8 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
                      <Badge variant="secondary" className="text-sm text-gray-500 dark:text-gray-400 bg-transparent border-0 p-0">
                        No notifications
                      </Badge>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
        </div>

        </div>

        {/* Notification button for small screens */}
        <div className="sm:hidden relative notification-dropdown">
          <Button 
            variant="ghost"
            size="sm"
            className="rounded-full bg-white dark:bg-gray-700 p-2.5 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition relative" 
            onClick={() => {
              console.log('Mobile bell icon clicked');
              setNotificationsOpen(!notificationsOpen);
            }}
          >
            <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-300" />
            {hasUnreadNotifications && (
              <Badge className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full p-0 border-0" />
            )}
          </Button>
          
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-72 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto scrollbar-hide">
              <div className="flex items-center justify-between mb-3">
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">Notifications</CardTitle>
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={addTestNotification}
                    className="text-xs text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
                  >
                    Add Test
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={markAllAsRead}
                    className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                  >
                    Mark all read
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                {notifications.map((notification) => (
                  <Card 
                    key={notification.id} 
                    className={`${notification.unread ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700' : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600'} hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer`}
                    onClick={() => handleNotificationClick(notification.id)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-start gap-3">
                        <Badge className={`w-2 h-2 rounded-full mt-2 p-0 border-0 ${notification.unread ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-500'}`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <CardTitle className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{notification.title}</CardTitle>
                            <Badge variant="secondary" className="text-xs text-gray-500 dark:text-gray-400 ml-2 bg-transparent border-0">
                              {notification.time}
                            </Badge>
                          </div>
                          <Badge variant="secondary" className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2 bg-transparent border-0 p-0">
                          {notification.message}
                        </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              {notifications.length === 0 && (
                <Card className="text-center py-4 bg-transparent border-0 shadow-none">
                  <CardContent className="p-4">
                    <Bell className="w-8 h-8 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
                    <Badge variant="secondary" className="text-sm text-gray-500 dark:text-gray-400 bg-transparent border-0 p-0">
                      No notifications
                    </Badge>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
        
        {/* Avatar with Popover Menu */}
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full p-0 h-auto">
              <Avatar className="w-8 h-8 sm:w-10 sm:h-10 cursor-pointer hover:opacity-80 transition-opacity">
                <AvatarImage 
                  src={profileData.image} 
                  alt="User Profile" 
                />
                <AvatarFallback className="bg-blue-600 text-white font-semibold text-sm">
                  U
                </AvatarFallback>
              </Avatar>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-3 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700" align="end">
            <div className="space-y-3">
              {!isAuthenticated ? (
                <>
                  <div className="px-2 py-2 border-b border-gray-100 dark:border-gray-700">
                    <Badge variant="secondary" className="text-sm font-medium text-gray-900 dark:text-gray-100 bg-transparent border-0 p-0">
                      Guest User
                    </Badge>
                    <Badge variant="secondary" className="text-xs text-gray-500 dark:text-gray-400 bg-transparent border-0 p-0">
                      Please sign in to continue
                    </Badge>
                  </div>
                  <Button 
                    variant="ghost"
                    onClick={handleSignInOut}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors justify-start"
                  >
                    <User className="w-4 h-4" />
                    Sign In
                  </Button>
                </>
              ) : !isEditing ? (
                <>
                  <div className="px-2 py-2 border-b border-gray-100 dark:border-gray-700">
                    <Badge variant="secondary" className="text-sm font-medium text-gray-900 dark:text-gray-100 bg-transparent border-0 p-0">
                      {profileData.name}
                    </Badge>
                    <Badge variant="secondary" className="text-xs text-gray-500 dark:text-gray-400 bg-transparent border-0 p-0">
                      {profileData.email}
                    </Badge>
                  </div>
                  <Button 
                    variant="ghost"
                    onClick={handleEditProfile}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors justify-start"
                  >
                    <User className="w-4 h-4" />
                    Edit Profile
                  </Button>
                  
                  <div className="border-t border-gray-100 dark:border-gray-700 pt-2">
                    <Button 
                      variant="ghost"
                      onClick={handleSignInOut}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors justify-start"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-semibold text-gray-900 dark:text-gray-100">Edit Profile</CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleCancelEdit}
                        className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-0 h-auto"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="space-y-3">
                      {/* Profile Image Section */}
                      <div className="space-y-2">
                        <Label className="text-xs font-medium text-gray-700 dark:text-gray-300">
                          Profile Image
                        </Label>
                        <div className="space-y-3">
                          <div className="flex justify-center">
                            <Avatar className="w-16 h-16">
                              <AvatarImage src={tempData.image} alt="Profile" />
                              <AvatarFallback className="bg-blue-600 text-white text-sm">
                                {tempData.name.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center justify-center gap-2 px-3 py-2 text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-md transition-colors cursor-pointer"
                              onClick={() => {
                                const input = document.createElement('input');
                                input.type = 'file';
                                input.accept = 'image/*';
                                input.onchange = (e) => {
                                  const target = e.target as HTMLInputElement;
                                  handleFileSelect({ target } as React.ChangeEvent<HTMLInputElement>);
                                };
                                input.click();
                              }}
                            >
                              <Image className="w-3 h-3" />
                              Gallery
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              type="button"
                              onClick={() => setShowImageGallery(true)}
                              className="flex items-center justify-center gap-2 px-3 py-2 text-xs bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md transition-colors"
                            >
                              <Image className="w-3 h-3" />
                              Sample
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              type="button"
                              className="flex items-center justify-center gap-2 px-3 py-2 text-xs bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md transition-colors"
                            >
                              <Camera className="w-3 h-3" />
                              Camera
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <Label htmlFor="edit-name" className="text-xs font-medium text-gray-700 dark:text-gray-300">
                          Name
                        </Label>
                        <Input
                          id="edit-name"
                          type="text"
                          value={tempData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="w-full h-8 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                          placeholder="Enter your name"
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <Label htmlFor="edit-email" className="text-xs font-medium text-gray-700 dark:text-gray-300">
                          Email
                        </Label>
                        <Input
                          id="edit-email"
                          type="email"
                          value={tempData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full h-8 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>
                    
                    <div className="flex gap-2 pt-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleCancelEdit}
                        className="flex-1 h-8 text-xs border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                        size="sm"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="button"
                        onClick={handleConfirmEdit}
                        className="flex-1 h-8 text-xs bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                        size="sm"
                      >
                        <Check className="w-3 h-3 mr-1" />
                        Confirm
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
            {/* Cancel/Close button for small screens */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 sm:hidden text-gray-400 hover:text-gray-600 p-0 h-auto"
              onClick={() => setPopoverOpen(false)}
              aria-label="Close"
            >
              ×
            </Button>
          </PopoverContent>
        </Popover>

        {/* Image Gallery Dialog */}
        <Dialog open={showImageGallery} onOpenChange={setShowImageGallery}>
          <DialogContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 w-full max-w-md">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">Choose Profile Image</DialogTitle>
            </DialogHeader>
              
                <div className="grid grid-cols-3 gap-3">
                  {sampleImages.map((image, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      onClick={() => handleImageSelect(image)}
                      className={`relative group rounded-lg overflow-hidden border-2 transition-all p-0 h-auto ${
                        tempData.image === image 
                          ? 'border-blue-500 ring-2 ring-blue-200' 
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="w-full h-20 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} />
                      {tempData.image === image && (
                        <div className="absolute inset-0 bg-blue-500 bg-opacity-20 flex items-center justify-center">
                          <Check className="w-5 h-5 text-white bg-blue-500 rounded-full p-1" />
                        </div>
                      )}
                    </Button>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowImageGallery(false)}
                      className="flex-1 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                      size="sm"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setShowImageGallery(false)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                      size="sm"
                    >
                      Done
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

        {/* Logout Confirmation Alert */}
        <AlertDialog open={showLogoutAlert} onOpenChange={setShowLogoutAlert}>
          <AlertDialogContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <AlertDialogHeader>
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                    <LogOut className="w-6 h-6 text-red-600 dark:text-red-400" />
                  </div>
                </div>
              <AlertDialogTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100 text-center">
                  Are you sure logout?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  You will be logged out and your profile will be reset to default.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="flex-1 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                No
              </AlertDialogCancel>
              <AlertDialogAction 
                    onClick={handleLogoutConfirm}
                    className="flex-1 bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white"
                  >
                    Yes
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Login Page Modal */}
        <Dialog open={showLoginPage} onOpenChange={setShowLoginPage}>
          <DialogContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 w-full max-w-md">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">RAMZZ</DialogTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowLoginPage(false)}
                  className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-0 h-auto"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>
            </DialogHeader>
              
              <div className="p-6">
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100 text-center mb-6">
                  Create an Account
                </CardTitle>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-sm font-medium text-gray-700 dark:text-gray-300 text-left">
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                      type="text"
                      value={loginData.fullName}
                      onChange={(e) => handleLoginInputChange('fullName', e.target.value)}
                      className="w-full text-left bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="loginEmail" className="text-sm font-medium text-gray-700 dark:text-gray-300 text-left">
                      Email
                    </Label>
                    <Input
                      id="loginEmail"
                      type="email"
                      value={loginData.email}
                      onChange={(e) => handleLoginInputChange('email', e.target.value)}
                      className="w-full text-left bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300 text-left">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      value={loginData.password}
                      onChange={(e) => handleLoginInputChange('password', e.target.value)}
                      className="w-full text-left bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                      placeholder="Enter your password"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dob" className="text-sm font-medium text-gray-700 dark:text-gray-300 text-left">
                      Date of Birth
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={"w-full justify-start text-left font-normal border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700" + (!dob ? " text-muted-foreground" : "")}
                        >
                          {dob ? dob.toLocaleDateString() : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                        <Calendar
                          mode="single"
                          selected={dob}
                          onSelect={setDob}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 mt-6"
                    onClick={handleLoginSubmit}
                  >
                    Submit
                  </Button>
              </div>
            </div>
            </DialogContent>
          </Dialog>

        {/* Success Alert */}
        {showSuccessAlert && (
          <Card className="fixed top-4 right-4 z-50 bg-green-500 dark:bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 border-0">
            <CardContent className="p-0 flex items-center gap-2">
            <Check className="w-5 h-5" />
              <Badge variant="secondary" className="font-medium bg-transparent border-0 text-white">
              Login successfully
            </Badge>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Sidebar Drawer (only on small screens) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-50 flex"
          style={{ touchAction: "none" }}
        >
          <div
            className="bg-gray-100 dark:bg-gray-800 h-full shadow-lg p-6 flex flex-col items-start relative transition-colors duration-200"
            style={{ width: sidebarWidth, minWidth: 180, maxWidth: 400 }}
          >
            {/* Sidebar content here */}
            <Button
              variant="ghost"
              size="sm"
              className="mb-6 ml-auto p-0"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </Button>
            <Button 
              variant="ghost"
              className="mb-4 font-medium text-lg text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 text-left w-full flex items-center gap-3 hover:scale-110 hover:animate-pulse transition-all duration-200 ease-in-out transform hover:shadow-md hover:bg-gray-200/50 dark:hover:bg-gray-700/50 justify-start" 
              onClick={() => { onOpenHome(); setSidebarOpen(false); }}
            >
              <Home className="w-4 h-4 sm:w-5 sm:h-5" /> Home
            </Button>
            <Button 
              variant="ghost"
              className="mb-4 font-medium text-lg text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 text-left w-full flex items-center gap-3 hover:scale-110 hover:animate-pulse transition-all duration-200 ease-in-out transform hover:shadow-md hover:bg-gray-200/50 dark:hover:bg-gray-700/50 justify-start" 
              onClick={onOpenMessages}
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" /> Messages
            </Button>
            <Button 
              variant="ghost"
              className="mb-4 font-medium text-lg text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 text-left w-full flex items-center gap-3 hover:scale-110 hover:animate-pulse transition-all duration-200 ease-in-out transform hover:shadow-md hover:bg-gray-200/50 dark:hover:bg-gray-700/50 justify-start" 
              onClick={() => { onOpenDiscover?.(); setSidebarOpen(false); }}
            >
              <Compass className="w-4 h-4 sm:w-5 sm:h-5" /> Discover
            </Button>
            <Button
              variant="ghost"
              className="mb-4 font-medium text-lg text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 text-left w-full flex items-center gap-3 hover:scale-110 hover:animate-pulse transition-all duration-200 ease-in-out transform hover:shadow-md hover:bg-gray-200/50 dark:hover:bg-gray-700/50 justify-start"
              onClick={() => { onOpenWallet?.(); setSidebarOpen(false); }}
            >
              <WalletIcon className="w-4 h-4 sm:w-5 sm:h-5" /> Wallet
            </Button>
            <Button
              variant="ghost"
              className="mb-4 font-medium text-lg text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 text-left w-full flex items-center gap-3 hover:scale-110 hover:animate-pulse transition-all duration-200 ease-in-out transform hover:shadow-md hover:bg-gray-200/50 dark:hover:bg-gray-700/50 justify-start"
              onClick={() => { onOpenProjects?.(); setSidebarOpen(false); }}
            >
              <Folder className="w-4 h-4 sm:w-5 sm:h-5" /> Projects
            </Button>
            {/* Settings and Bell icons (only on small screens) */}
            <div className="sm:hidden mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
              <Button
                variant="ghost"
                className="flex items-center gap-3 px-4 py-2 w-full justify-start text-left text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-semibold text-lg hover:animate-pulse transition-all duration-200"
                onClick={() => {
                  onOpenSettings?.();
                  setSidebarOpen(false);
                }}
              >
                <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
                Settings
              </Button>

              <Button
                variant="ghost"
                className="flex items-center gap-3 px-4 py-2 w-full justify-start text-left text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-semibold text-lg hover:animate-pulse transition-all duration-200"
                onClick={() => {
                  toggleDarkMode();
                  setSidebarOpen(false);
                }}
              >
                {isDarkMode ? (
                  <Sun className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <Moon className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
                Dark Mode
              </Button>
            </div>
            {/* Drag handle */}
            <div
              className="absolute top-0 right-0 h-full w-3 cursor-ew-resize bg-gray-200 dark:bg-gray-600 opacity-50 hover:opacity-100"
              onMouseDown={() => setIsResizing(true)}
              style={{ zIndex: 10 }}
            />
          </div>
          {/* Click outside to close */}
          <div className="flex-1" onClick={() => setSidebarOpen(false)} />
        </div>
      )}
    </header>
  );
}
