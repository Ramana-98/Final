import React, { createContext, useContext, useState, useEffect } from "react";

type Notification = {
  id: number;
  type: "message" | "job" | "proposal" | "connection" | "payment" | "upgrade";
  text: string;
  meta?: string;
  time: string;
  unread: boolean;
};

type NotificationContextType = {
  notifications: Notification[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
  hasUnreadNotifications: boolean;
  markAllAsRead: () => void;
  markAsRead: (id: number) => void;
  clearAll: () => void;
  loading: boolean;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  // Calculate if there are unread notifications
  const hasUnreadNotifications = notifications.some((n) => n.unread);

  // Fetch notifications (mocked for demo)
  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setNotifications([
        { id: 1, type: "message", text: "You have a new message from John", meta: "UI Design", time: "2 mins ago", unread: true },
        { id: 2, type: "job" as const, text: "New job posted: Web Dashboard", time: "1 hour ago", unread: true },
        { id: 3, type: "proposal" as const, text: "Your proposal was viewed by the client", time: "3 hours ago", unread: false },
        { id: 4, type: "payment" as const, text: "₹1,200 INR received for 'SaaS App Project'", time: "1 day ago", unread: false },
        { id: 5, type: "upgrade" as const, text: "Upgrade to premium for unlimited proposals", time: "2 days ago", unread: false },
        { id: 6, type: "connection" as const, text: "New connection request from Sarah", time: "3 days ago", unread: false },
        { id: 7, type: "message", text: "Project update from Team Alpha", meta: "SaaS App", time: "4 days ago", unread: false },
        { id: 8, type: "payment" as const, text: "₹800 INR received for 'Mobile App'", time: "5 days ago", unread: false },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const markAsRead = (id: number) => {
    setNotifications((prev) => 
      prev.map((n) => n.id === id ? { ...n, unread: false } : n)
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider value={{
      notifications,
      setNotifications,
      hasUnreadNotifications,
      markAllAsRead,
      markAsRead,
      clearAll,
      loading
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}; 