import React from "react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { Bell, MessageCircle, Briefcase, Eye, UserPlus, CreditCard, Rocket, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNotifications } from "@/context/NotificationContext";
import { useNavigate, Link } from "react-router-dom";

const notificationIcons = {
  message: <MessageCircle className="w-5 h-5 text-blue-500" />,
  job: <Briefcase className="w-5 h-5 text-gray-500" />,
  proposal: <Eye className="w-5 h-5 text-purple-500" />,
  connection: <UserPlus className="w-5 h-5 text-green-500" />,
  payment: <CreditCard className="w-5 h-5 text-emerald-500" />,
  upgrade: <Rocket className="w-5 h-5 text-orange-500" />,
};

export function NotificationsDropdown() {
  const { notifications, loading, markAllAsRead, hasUnreadNotifications } = useNotifications();
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative px-3 py-5 rounded-full bg-white hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:text-gray-100 transition">
          <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          {hasUnreadNotifications && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-96 p-0 rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
        {/* Only notification content below, no bell icon */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <span className="font-semibold text-lg text-gray-900 dark:text-gray-100">Notifications</span>
          <button
            className="text-xs text-blue-600 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
            onClick={markAllAsRead}
          >
            Mark all as read
          </button>
        </div>
        <div className="max-h-80 overflow-y-auto hide-scrollbar-mobile">
          {loading ? (
            <div className="p-4 text-center text-gray-400 dark:text-gray-500">Loading...</div>
          ) : notifications.length === 0 ? (
            <div className="p-4 text-center text-gray-400 dark:text-gray-500">No notifications</div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                className={`flex items-start gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0 ${
                  n.unread ? "bg-blue-50 dark:bg-blue-900/20 font-semibold" : "bg-white dark:bg-gray-800"
                }`}
              >
                <div className="mt-1">{notificationIcons[n.type]}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm truncate text-gray-900 dark:text-gray-100">{n.text}</div>
                  {n.meta && (
                    <span className="inline-block bg-gray-100 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-300 rounded px-2 py-0.5 mt-1 mr-2">
                      {n.meta}
                    </span>
                  )}
                  <div className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{n.time}</div>
                </div>
                {n.unread && <span className="w-2 h-2 bg-blue-500 rounded-full mt-2" />}
              </div>
            ))
          )}
        </div>
        <div className="p-3 border-t border-gray-200 dark:border-gray-700 text-center">
          <Link to="/notifications" className="block">
            <Button 
              variant="ghost" 
              className="w-full text-blue-600 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
            >
              View all notifications
            </Button>
          </Link>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Dedicated Notification Page for small screens
export function NotificationPage() {
  const { notifications, loading, markAllAsRead, markAsRead } = useNotifications();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => window.location.href = "/"}
          className="hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-100"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-bold flex-1 text-gray-900 dark:text-gray-100">Notifications</h1>
        <Button
          variant="ghost"
          size="sm"
          onClick={markAllAsRead}
          className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          Mark all read
        </Button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Loading notifications...</p>
          </div>
        ) : notifications.length === 0 ? (
          <Card className="text-center py-8 dark:bg-gray-800 dark:border-gray-700">
            <CardContent>
              <Bell className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">No notifications</h3>
              <p className="text-gray-500 dark:text-gray-400">You're all caught up!</p>
            </CardContent>
          </Card>
        ) : (
          notifications.map((notification) => (
            <Card 
              key={notification.id} 
              className={`cursor-pointer transition-all duration-200 hover:shadow-md dark:bg-gray-800 dark:border-gray-700 ${
                notification.unread ? "ring-2 ring-blue-200 dark:ring-blue-800 bg-blue-50 dark:bg-blue-900/20" : ""
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0">
                    {notificationIcons[notification.type]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm ${notification.unread ? "font-semibold" : ""} text-gray-900 dark:text-gray-100`}>
                      {notification.text}
                    </div>
                    {notification.meta && (
                      <span className="inline-block bg-gray-100 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-300 rounded px-2 py-0.5 mt-2 mr-2">
                        {notification.meta}
                      </span>
                    )}
                    <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">{notification.time}</div>
                  </div>
                  {notification.unread && (
                    <span className="w-3 h-3 bg-blue-500 rounded-full mt-1 flex-shrink-0" />
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
