import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Search, Settings, Menu, X, Home, MessageCircle, Compass, Wallet as WalletIcon, Folder, User, LogOut, Check, Camera, Image, Bell, Moon, Sun } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { NotificationsDropdown } from "./Notification";
import { useNotifications } from "@/context/NotificationContext";
import { useDarkMode } from "@/context/DarkModeContext";






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
  const { hasUnreadNotifications } = useNotifications();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
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
        <button
          className="block lg:hidden mr-2"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="w-7 h-7" />
        </button>
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
        <button className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-110 hover:animate-pulse transition-all duration-200 ease-in-out transform hover:shadow-md px-3 py-2 rounded-lg hover:bg-gray-200/50 dark:hover:bg-gray-700/50" onClick={onOpenHome} >Home</button>
        <button className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-110 hover:animate-pulse transition-all duration-200 ease-in-out transform hover:shadow-md px-3 py-2 rounded-lg hover:bg-gray-200/50 dark:hover:bg-gray-700/50" onClick={onOpenMessages}>Messages</button>
        <button className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-110 hover:animate-pulse transition-all duration-200 ease-in-out transform hover:shadow-md px-3 py-2 rounded-lg hover:bg-gray-200/50 dark:hover:bg-gray-700/50" onClick={onOpenDiscover}>Discover</button>
        <button
          className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-110 hover:animate-pulse transition-all duration-200 ease-in-out transform hover:shadow-md px-3 py-2 rounded-lg hover:bg-gray-200/50 dark:hover:bg-gray-700/50"
          onClick={onOpenWallet}
        >
          Wallet
        </button>
        <button
          className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-110 hover:animate-pulse transition-all duration-200 ease-in-out transform hover:shadow-md px-3 py-2 rounded-lg hover:bg-gray-200/50 dark:hover:bg-gray-700/50"
          onClick={onOpenProjects}
        >
          Projects
        </button>
      </div>
      {/* Right side icons */}
      <div className="flex items-center gap-4">
        
        {/* Search bar (only on small screens) */}
        <div className="relative block  sm:hidden">
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
            className="w-24 pl-7 pr-7 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          />
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
          {searchValue && (
            <button
              onClick={clearSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          {notFound && (
            <div className="absolute left-0 mt-2 w-full bg-white dark:bg-gray-700 border border-red-300 dark:border-red-600 text-red-500 dark:text-red-400 rounded p-2 text-center shadow">
              Not Found
            </div>
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
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          {notFound && (
            <div className="absolute left-0 mt-2 w-full bg-white dark:bg-gray-700 border border-red-300 dark:border-red-600 text-red-500 dark:text-red-400 rounded p-2 text-center shadow">
              Not Found
            </div>
          )}
        </div>
        
        {/* Dark Mode Toggle */}
        <button 
          onClick={toggleDarkMode}
          className="rounded-full bg-white dark:bg-gray-700 p-2.5 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200 transform hover:scale-105"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? (
            <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
          ) : (
            <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-300" />
          )}
        </button>
        
        {/* Settings and Bell icons (hidden on small screens) */}
        <div className="hidden sm:flex items-center gap-4 overflow-y-auto">
          <button className="rounded-full bg-white dark:bg-gray-700 p-2.5 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition" onClick={onOpenSettings}>
            <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-300" />
          </button>
          <NotificationsDropdown />
          
        </div>

        {/* Notification button for small screens - HIDDEN */}
        {/* <div className="sm:hidden">
          <button 
            className="rounded-full bg-white dark:bg-gray-700 p-2.5 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition relative" 
            onClick={onOpenNotifications}
          >
            <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-300" />
            {hasUnreadNotifications && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
            )}
          </button>
        </div> */}
        
        {/* Avatar with Popover Menu */}
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
          <PopoverTrigger asChild>
            <button className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full">
              <Avatar className="w-8 h-8 sm:w-10 sm:h-10 cursor-pointer hover:opacity-80 transition-opacity">
                <AvatarImage 
                  src={profileData.image} 
                  alt="User Profile" 
                />
                <AvatarFallback className="bg-blue-600 text-white font-semibold text-sm">
                  U
                </AvatarFallback>
              </Avatar>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-3 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700" align="end">
            <div className="space-y-3">
              {!isAuthenticated ? (
                <>
                  <div className="px-2 py-2 border-b border-gray-100 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Guest User</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Please sign in to continue</p>
                  </div>
                  <button 
                    onClick={handleSignInOut}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors"
                  >
                    <User className="w-4 h-4" />
                    Sign In
                  </button>
                </>
              ) : !isEditing ? (
                <>
                  <div className="px-2 py-2 border-b border-gray-100 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{profileData.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{profileData.email}</p>
                  </div>
                  <button 
                    onClick={handleEditProfile}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                  >
                    <User className="w-4 h-4" />
                    Edit Profile
                  </button>
                  
                  <div className="border-t border-gray-100 dark:border-gray-700 pt-2">
                    <button 
                      onClick={handleSignInOut}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Edit Profile</h3>
                      <button
                        onClick={handleCancelEdit}
                        className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
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
                            <label className="flex items-center justify-center gap-2 px-3 py-2 text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-md transition-colors cursor-pointer">
                              <Image className="w-3 h-3" />
                              Gallery
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileSelect}
                                className="hidden"
                              />
                            </label>
                            <button
                              type="button"
                              onClick={() => setShowImageGallery(true)}
                              className="flex items-center justify-center gap-2 px-3 py-2 text-xs bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md transition-colors"
                            >
                              <Image className="w-3 h-3" />
                              Sample
                            </button>
                            <button
                              type="button"
                              className="flex items-center justify-center gap-2 px-3 py-2 text-xs bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md transition-colors"
                            >
                              <Camera className="w-3 h-3" />
                              Camera
                            </button>
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
            <button
              className="absolute top-2 right-2 sm:hidden text-gray-400 hover:text-gray-600"
              onClick={() => setPopoverOpen(false)}
              aria-label="Close"
            >
              ×
            </button>
          </PopoverContent>
        </Popover>

        {/* Image Gallery Popover */}
        {showImageGallery && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Choose Profile Image</h3>
                <button
                  onClick={() => setShowImageGallery(false)}
                  className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-4">
                <div className="grid grid-cols-3 gap-3">
                  {sampleImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => handleImageSelect(image)}
                      className={`relative group rounded-lg overflow-hidden border-2 transition-all ${
                        tempData.image === image 
                          ? 'border-blue-500 ring-2 ring-blue-200' 
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Profile option ${index + 1}`}
                        className="w-full h-20 object-cover"
                      />
                      {tempData.image === image && (
                        <div className="absolute inset-0 bg-blue-500 bg-opacity-20 flex items-center justify-center">
                          <Check className="w-5 h-5 text-white bg-blue-500 rounded-full p-1" />
                        </div>
                      )}
                    </button>
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
              </div>
            </div>
          </div>
        )}

        {/* Logout Confirmation Alert */}
        {showLogoutAlert && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-sm">
              <div className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                    <LogOut className="w-6 h-6 text-red-600 dark:text-red-400" />
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 text-center mb-2">
                  Are you sure logout?
                </h3>
                
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">
                  You will be logged out and your profile will be reset to default.
                </p>
                
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowLogoutAlert(false)}
                    className="flex-1 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    No
                  </Button>
                  <Button
                    type="button"
                    onClick={handleLogoutConfirm}
                    className="flex-1 bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white"
                  >
                    Yes
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Login Page Modal */}
        {showLoginPage && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">RAMZZ</h2>
                <button
                  onClick={() => setShowLoginPage(false)}
                  className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 text-center mb-6">
                  Create an Account
                </h3>
                
                <form onSubmit={handleLoginSubmit} className="space-y-4">
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
                  >
                    Submit
                  </Button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Success Alert */}
        {showSuccessAlert && (
          <div className="fixed top-4 right-4 z-50 bg-green-500 dark:bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
            <Check className="w-5 h-5" />
            <span className="font-medium">Login successfully</span>
          </div>
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
            <button
              className="mb-6 ml-auto"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
            <button className="mb-4 font-medium text-lg text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 text-left w-full flex items-center gap-3 hover:scale-110 hover:animate-pulse transition-all duration-200 ease-in-out transform hover:shadow-md px-3 py-2 rounded-lg hover:bg-gray-200/50 dark:hover:bg-gray-700/50" onClick={() => { onOpenHome(); setSidebarOpen(false); }}><Home className="w-4 h-4 sm:w-5 sm:h-5" /> Home</button>
            <button className="mb-4 font-medium text-lg text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 text-left w-full flex items-center gap-3 hover:scale-110 hover:animate-pulse transition-all duration-200 ease-in-out transform hover:shadow-md px-3 py-2 rounded-lg hover:bg-gray-200/50 dark:hover:bg-gray-700/50" onClick={onOpenMessages}><MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" /> Messages</button>
            <button className="mb-4 font-medium text-lg text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 text-left w-full flex items-center gap-3 hover:scale-110 hover:animate-pulse transition-all duration-200 ease-in-out transform hover:shadow-md px-3 py-2 rounded-lg hover:bg-gray-200/50 dark:hover:bg-gray-700/50" onClick={() => { onOpenDiscover?.(); setSidebarOpen(false); }}><Compass className="w-4 h-4 sm:w-5 sm:h-5" /> Discover</button>
            <button
              className="mb-4 font-medium text-lg text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 text-left w-full flex items-center gap-3 hover:scale-110 hover:animate-pulse transition-all duration-200 ease-in-out transform hover:shadow-md px-3 py-2 rounded-lg hover:bg-gray-200/50 dark:hover:bg-gray-700/50"
              onClick={() => { onOpenWallet?.(); setSidebarOpen(false); }}
            >
              <WalletIcon className="w-4 h-4 sm:w-5 sm:h-5" /> Wallet
            </button>
            <a href="#" className="mb-4 font-medium text-lg text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 text-left w-full flex items-center gap-3 hover:scale-110 hover:animate-pulse transition-all duration-200 ease-in-out transform hover:shadow-md px-3 py-2 rounded-lg hover:bg-gray-200/50 dark:hover:bg-gray-700/50" onClick={() => { onOpenProjects?.(); setSidebarOpen(false); }}><Folder className="w-4 h-4 sm:w-5 sm:h-5" /> Projects</a>
            {/* Settings and Bell icons (only on small screens) */}
            <div className="sm:hidden mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
              <button
                className="flex items-center gap-3 px-4 py-2 w-full justify-start text-left text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-semibold text-lg hover:animate-pulse transition-all duration-200"
                onClick={() => {
                  onOpenSettings?.();
                  setSidebarOpen(false);
                }}
              >
                <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
                Settings
              </button>
              <button
                className="flex items-center gap-3 px-4 py-2 w-full justify-start text-left text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-semibold text-lg hover:animate-pulse transition-all duration-200"
                onClick={() => {
                  onOpenNotifications?.();
                  setSidebarOpen(false);
                }}
              >
                <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                Notifications
              </button>
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
