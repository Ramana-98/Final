import React, { forwardRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, ArrowRight, CheckIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";

interface User {
  name: string;
  role: string;
  level: "Senior" | "Middle";
  avatar: string;
  avatarUrl: string;
}

const users: User[] = [
  { 
    name: "Randy Gouse", 
    role: "Cybersecurity specialist", 
    level: "Senior", 
    avatar: "RG",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  { 
    name: "Giana Schleifer", 
    role: "UX/UI Designer", 
    level: "Middle", 
    avatar: "GS",
    avatarUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  },
  { 
    name: "Alex Kim", 
    role: "Frontend Developer", 
    level: "Middle", 
    avatar: "AK",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
  },
  { 
    name: "Priya Patel", 
    role: "Project Manager", 
    level: "Senior", 
    avatar: "PP",
    avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  },
  { 
    name: "Liam Smith", 
    role: "Backend Developer", 
    level: "Middle", 
    avatar: "LS",
    avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face"
  },
  { 
    name: "Maria Garcia", 
    role: "QA Engineer", 
    level: "Senior", 
    avatar: "MG",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
  },
  { 
    name: "Chen Wei", 
    role: "DevOps Engineer", 
    level: "Middle", 
    avatar: "CW",
    avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face"
  },
];

interface LetsConnectProps {
  highlight?: boolean;
}

const LetsConnect = forwardRef<HTMLDivElement, LetsConnectProps>(({ highlight }, ref) => {
  const [connected, setConnected] = useState<boolean[]>(users.map(() => false));
  const [popoverOpen, setPopoverOpen] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const handleConnect = (idx: number) => {
    setConnected((prev) => prev.map((val, i) => (i === idx ? true : val)));
    setPopoverOpen(idx);
    setTimeout(() => setPopoverOpen(null), 1500); // Auto-close after 1.5s
  };

  return (
    <Card
      ref={ref}
      className={`p-2 bg-gray-200 dark:bg-gray-800 shadow-xs flex flex-col h-55 w-full max-w-4xl mx-auto hover:shadow-lg hover:-translate-y-1 transition-all duration-200  ${highlight ? "ring-2 ring-blue-500 bg-yellow-50 dark:bg-yellow-900/20" : ""}`}
    >
      <CardHeader className="-mt-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base sm:text-xl font-bold text-gray-800 dark:text-gray-100">
            Let's Connect
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-xs sm:text-sm"
            onClick={() => setShowAll((prev) => !prev)}
          >
            <span className="hidden sm:inline">{showAll ? 'Show less' : 'See all'}</span>
            <span className="sm:hidden">{showAll ? 'Less' : 'All'}</span>
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 min-h-0 px-4 sm:px-6 pb-4 sm:pb-3 flex flex-col">
        <div className={
          showAll
            ? "flex-1 min-h-0 overflow-y-auto pr-1 space-y-3 sm:space-y-4 hide-scrollbar"
            : "space-y-3 sm:space-y-4"
        }>
          {(showAll ? users : users.slice(0, 2)).map((user, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2 sm:p-3 rounded-full hover:shadow-lg hover:-translate-y-1 transition-all duration-200 bg-gray-100/50 dark:bg-gray-700/50"
            >
              <div className="flex items-left text-left gap-2 sm:gap-3 min-w-0 flex-1">
                <Avatar className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0">
                  <AvatarImage 
                    src={user.avatarUrl} 
                    alt={`${user.name} avatar`}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium text-xs sm:text-sm">
                    {user.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-xs sm:text-sm text-gray-800 dark:text-gray-100 truncate">{user.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                <Badge 
                  variant="outline" 
                  className={`text-xs ${
                    user.level === "Senior" 
                      ? "border-orange-200 dark:border-orange-700 text-orange-700 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20" 
                      : "border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                  }`}
                >
                  {user.level}
                </Badge>
                <Popover open={popoverOpen === idx}>
                  <PopoverTrigger asChild>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="w-6 h-6 sm:w-8 sm:h-8 p-0"
                      onClick={() => !connected[idx] && handleConnect(idx)}
                      disabled={connected[idx]}
                    >
                      {connected[idx] ? (
                        <CheckIcon className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 dark:text-green-400" />
                      ) : (
                        <Plus className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 dark:text-gray-400" />
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent side="top" align="center" className="text-green-700 dark:text-green-400 text-xs font-medium bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    Connect successfully
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
});

export default LetsConnect;
