import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Header from './components/ui/components/Header';
import Home from './components/ui/components/Home';
import Messages from './components/ui/components/Messages';
import Discover from './components/ui/components/Discover';
import WalletPage from './components/ui/components/WalletPage';
import ProjectsPage from './components/ui/components/ProjectsPage';
import Settings from './components/ui/components/Settings';
import { NotificationsDropdown } from './components/ui/components/Notification';
import NotificationPage from './components/ui/components/NotificationPage';
import { Toaster } from "sonner";
import './App.css';

// Wrapper component to handle navigation
function AppContent() {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleOpenSettings = () => navigate("/settings");
  const handleOpenNotifications = () => navigate("/notifications");
  const handleOpenMessages = () => navigate("/messages");
  const handleOpenDiscover = () => navigate("/discover");
  const handleOpenWallet = () => navigate("/wallet");
  const handleOpenProjects = () => navigate("/projects");
  const handleOpenHome = () => navigate("/Home");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Header
        onOpenSettings={handleOpenSettings}
        onOpenNotifications={handleOpenNotifications}
        onOpenMessages={handleOpenMessages}
        onOpenDiscover={handleOpenDiscover}
        onOpenWallet={handleOpenWallet}
        onOpenProjects={handleOpenProjects}
        onOpenHome={handleOpenHome}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onSearchTrigger={() => {}}
      />
      {/* Modals */}
      {showNotifications && <NotificationsDropdown />}
      {/* Main Routes */}
      <Routes>
        <Route path="/" element={<Navigate to="/Home" replace />} />
        <Route path="/Home" element={<Home searchValue={searchValue} />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/discover" element={<Discover onBack={() => navigate("/Home")} />} />
        <Route path="/wallet" element={<WalletPage />} />
        <Route path="/projects" element={<ProjectsPage onBack={() => navigate("/Home")} />} />
        <Route path="/notifications" element={<NotificationPage />} />
        {/* Add more routes as needed */}
      </Routes>
      <Toaster />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

