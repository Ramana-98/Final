import React, { useRef, useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CalendarIcon, ChevronDown, TrendingUp, Users, DollarSign, MessageSquare, Star, ArrowRight, Plus, CheckIcon, Settings, FileText, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
 

const normalize = (str: string) => str.replace(/['']/g, "").toLowerCase();

interface HomeProps {
  searchValue: string;
}

export default function Home({ searchValue }: HomeProps) {
  const letsConnectRef = useRef<HTMLDivElement>(null);
  const upgradePremiumRef = useRef<HTMLDivElement>(null);
  const incomeTrackerRef = useRef<HTMLDivElement>(null);
  const yourRecentProjectsRef = useRef<HTMLDivElement>(null);
  const proposalProgressRef = useRef<HTMLDivElement>(null);
  const earningBreakdownRef = useRef<HTMLDivElement>(null);
  const clientFeedbackRef = useRef<HTMLDivElement>(null);

  // Function to scroll to highlighted card
  const scrollToCard = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
      // Add a temporary highlight effect
      ref.current.style.transition = 'all 0.3s ease';
      ref.current.style.transform = 'scale(1.02)';
      ref.current.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
      
      setTimeout(() => {
        if (ref.current) {
          ref.current.style.transform = 'scale(1)';
          ref.current.style.boxShadow = '';
        }
      }, 2000);
    }
  };

  // Check if search matches any card and scroll to it
  useEffect(() => {
    const normalizedSearch = normalize(searchValue);
    
    if (normalizedSearch.includes(normalize("income tracker"))) {
      scrollToCard(incomeTrackerRef);
    } else if (normalizedSearch.includes(normalize("your recent project"))) {
      scrollToCard(yourRecentProjectsRef);
    } else if (normalizedSearch.includes(normalize("let's connect"))) {
      scrollToCard(letsConnectRef);
    } else if (normalizedSearch.includes(normalize("upgrade premium"))) {
      scrollToCard(upgradePremiumRef);
    } else if (normalizedSearch.includes(normalize("proposal progress"))) {
      scrollToCard(proposalProgressRef);
    } else if (normalizedSearch.includes(normalize("earning breakdown"))) {
      scrollToCard(earningBreakdownRef);
    } else if (normalizedSearch.includes(normalize("client feedback"))) {
      scrollToCard(clientFeedbackRef);
    } 
  }, [searchValue]);

  // Income Tracker Component
  const IncomeTracker = () => {
    const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('week');
    const [selectedDay, setSelectedDay] = useState<number | null>(5);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const weekData = [
      { day: "S", amount: 1200 },
      { day: "M", amount: 1800 },
      { day: "T", amount: 2567 },
      { day: "W", amount: 2100 },
      { day: "T", amount: 2300 },
      { day: "F", amount: 1900 },
      { day: "S", amount: 1500 },
    ];

    const currentData = weekData;
    const getSummaryPercentage = () => "+20%";
    const getSummaryText = () => "This week's income is higher than last week's";

    return (
      <Card
        ref={incomeTrackerRef}
        className={cn(
          "rounded-2xl bg-white dark:bg-gray-800 p-3 sm:p-4 max-w-4xl h-[440px] hover:shadow-lg hover:-translate-y-1 transition-all duration-200",
          normalize(searchValue).includes(normalize("Income Tracker")) && "ring-2 ring-blue-500 bg-yellow-50 dark:bg-yellow-900/20"
        )}
      >
        <CardHeader className="pb-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
            <CardTitle className="text-lg sm:text-3xl font-bold flex items-center gap-2 text-gray-900 dark:text-gray-100">
              <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 dark:text-gray-400" />
              Income Tracker
            </CardTitle>
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm w-full sm:w-auto mt-2 sm:mt-0">
                  Week
                  <ChevronDown className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-32 sm:w-40 p-2">
                <div className="space-y-1">
                  <Button variant="ghost" size="sm" className="w-full justify-start">Week</Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start">Month</Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start">Year</Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground dark:text-gray-400 mt-1 text-left">
            Track changes in income over time and access detailed data on each project and payments received.
          </p>
        </CardHeader>

        <CardContent className="mt-0 sm:mt-0 pb-2 sm:pb-4">
          <div className="block sm:hidden mb-4 text-center">
            <p className="text-base font-semibold text-gray-900 dark:text-gray-100">{getSummaryPercentage()}</p>
            <p className="text-xs text-muted-foreground dark:text-gray-400">{getSummaryText()}</p>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-1 sm:gap-4 min-h-48 sm:h-62 w-full">
            <div className="hidden sm:block text-center md:text-left mb-10 sm:mb-0">
              <p className="text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-gray-100">{getSummaryPercentage()}</p>
              <p className="text-sm text-muted-foreground dark:text-gray-400">{getSummaryText()}</p>
            </div>

            <TooltipProvider>
              <div className="flex justify-between items-end w-full max-w-xl mx-auto gap-1 sm:gap-2 lg:gap-3 overflow-hidden px-1 sm:px-0 min-h-0">
                {currentData.map((d, i) => {
                  const normalizedValue = (d.amount - Math.min(...currentData.map(item => item.amount))) / (Math.max(...currentData.map(item => item.amount)) - Math.min(...currentData.map(item => item.amount)));
                  const height = 20 + (normalizedValue * 120);
                  const isSelected = selectedDay === i;

                  return (
                    <Tooltip key={i}>
                      <TooltipTrigger asChild>
                        <div className="flex flex-col items-center gap-1 cursor-pointer">
                          {isSelected && (
                            <div className="text-xs font-medium bg-black dark:bg-white text-white dark:text-black rounded-full px-2 py-0.5 mb-1">
                              ${d.amount.toLocaleString()}
                            </div>
                          )}
                          <div
                            className={cn(
                              "w-1.5 sm:w-2 rounded-full bg-gradient-to-b from-[#d4d8db] to-[#f0f1f2] dark:from-gray-600 dark:to-gray-500 hover:opacity-80 transition-opacity",
                              isSelected && "bg-blue-500 dark:bg-blue-400 ring-2 ring-blue-500 dark:ring-blue-400"
                            )}
                            style={{ height: `${height}px`, minHeight: "20px", maxHeight: "140px" }}
                          />
                          <div
                            className={cn(
                              "text-xs sm:text-sm text-muted-foreground dark:text-gray-400 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#d7d8da] dark:bg-gray-600 flex items-center justify-center mt-1",
                              isSelected && "bg-blue-500 dark:bg-blue-400 text-white"
                            )}
                          >
                            {d.day}
                          </div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="font-medium">${d.amount.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Click to select {d.day}day's data</p>
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </div>
            </TooltipProvider>
          </div>
        </CardContent>
      </Card>
    );
  };

  // Let's Connect Component
  const LetsConnect = () => {
    const [connected, setConnected] = useState<boolean[]>([false, false, false, false, false, false, false]);
    const [showAll, setShowAll] = useState(false);

    const users = [
      { name: "Randy Gouse", role: "Cybersecurity specialist", level: "Senior", avatar: "RG", avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
      { name: "Giana Schleifer", role: "UX/UI Designer", level: "Middle", avatar: "GS", avatarUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face" },
      { name: "Alex Kim", role: "Frontend Developer", level: "Middle", avatar: "AK", avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face" },
      { name: "Priya Patel", role: "Project Manager", level: "Senior", avatar: "PP", avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" },
      { name: "Liam Smith", role: "Backend Developer", level: "Middle", avatar: "LS", avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face" },
      { name: "Maria Garcia", role: "QA Engineer", level: "Senior", avatar: "MG", avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face" },
      { name: "Chen Wei", role: "DevOps Engineer", level: "Middle", avatar: "CW", avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face" },
    ];

    const displayedUsers = showAll ? users : users.slice(0, 4);

    return (
      <Card
        ref={letsConnectRef}
        className={cn(
          "p-2 bg-gray-200 dark:bg-gray-800 shadow-xs flex flex-col h-55 w-full max-w-4xl mx-auto hover:shadow-lg hover:-translate-y-1 transition-all duration-200",
          normalize(searchValue).includes(normalize("Let's Connect")) && "ring-2 ring-blue-500 bg-yellow-50 dark:bg-yellow-900/20"
        )}
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
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {displayedUsers.map((user, idx) => (
              <div key={idx} className="flex items-center gap-3 p-2 rounded-lg bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user.avatarUrl} alt={user.name} />
                  <AvatarFallback className="text-xs">{user.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground dark:text-gray-400 truncate">{user.role}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Badge variant={user.level === "Senior" ? "default" : "secondary"} className="text-xs">
                    {user.level}
                  </Badge>
                  <Button
                    size="sm"
                    variant={connected[idx] ? "outline" : "default"}
                    className="w-6 h-6 p-0 rounded-full"
                    onClick={() => setConnected(prev => prev.map((val, i) => i === idx ? !val : val))}
                  >
                    {connected[idx] ? <CheckIcon className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  // Upgrade Premium Component
  const UpgradePremium = () => {
    return (
      <Card
        ref={upgradePremiumRef}
        className={cn(
          "p-2 bg-gradient-to-br from-purple-500 to-blue-600 text-white shadow-xs flex flex-col h-55 w-full max-w-4xl mx-auto hover:shadow-lg hover:-translate-y-1 transition-all duration-200",
          normalize(searchValue).includes(normalize("Upgrade Premium")) && "ring-2 ring-blue-500 bg-yellow-50 dark:bg-yellow-900/20"
        )}
      >
        <CardHeader className="-mt-4">
          <CardTitle className="text-base sm:text-xl font-bold text-white">
            Upgrade to Premium
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-300" />
              <span className="text-sm">Unlimited projects</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-300" />
              <span className="text-sm">Advanced analytics</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-300" />
              <span className="text-sm">Priority support</span>
            </div>
          </div>
          
          <Button className="w-full bg-white text-purple-600 hover:bg-gray-100 mt-4">
            Upgrade Now
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </CardContent>
      </Card>
    );
  };

  // Your Recent Projects Component
  const YourRecentProjects = () => {
    const [showAll, setShowAll] = useState(false);

    const allProjects = [
      { 
        name: "Web Development Project", 
        rate: "$10/hour", 
        status: "Paid", 
        icon: Settings,
        description: "This project involves implementing both frontend and backend functionalities, as well as integrating with third-party APIs.",
        tags: ["Remote", "Part-time"],
        location: "Germany",
        timeAgo: "2h ago"
      },
      { 
        name: "Copyright Project", 
        rate: "$10/hour", 
        status: "Not Paid", 
        icon: FileText,
        description: "Creating comprehensive copyright documentation and legal framework for digital assets.",
        tags: ["On-site", "Full-time"],
        location: "USA",
        timeAgo: "1d ago"
      },
      { 
        name: "Web Design Project", 
        rate: "$10/hour", 
        status: "Paid", 
        icon: Moon,
        description: "Designing modern and responsive web interfaces with focus on user experience and accessibility.",
        tags: ["Remote", "Contract"],
        location: "Canada",
        timeAgo: "3h ago"
      },
      { 
        name: "UI/UX Design Project", 
        rate: "$12/hour", 
        status: "Not Paid", 
        icon: Settings,
        description: "Creating intuitive and modern user interfaces with focus on user experience and accessibility.",
        tags: ["Remote", "Part-time"],
        location: "UK",
        timeAgo: "5h ago"
      },
      { 
        name: "Database Optimization", 
        rate: "$18/hour", 
        status: "Paid", 
        icon: FileText,
        description: "Optimizing database performance and implementing efficient query structures.",
        tags: ["On-site", "Full-time"],
        location: "Australia",
        timeAgo: "1d ago"
      },
      { 
        name: "API Integration Project", 
        rate: "$14/hour", 
        status: "Not Paid", 
        icon: Settings,
        description: "Integrating third-party APIs and building robust backend services.",
        tags: ["Remote", "Contract"],
        location: "Netherlands",
        timeAgo: "4h ago"
      },
      { 
        name: "E-commerce Platform", 
        rate: "$16/hour", 
        status: "Paid", 
        icon: Moon,
        description: "Building a comprehensive e-commerce platform with payment processing and inventory management.",
        tags: ["Remote", "Full-time"],
        location: "Singapore",
        timeAgo: "6h ago"
      },
    ];

    const displayedProjects = showAll ? allProjects : allProjects.slice(0, 5);

    return (
      <Card
        ref={yourRecentProjectsRef}
        className={cn(
          "p-3 bg-gray-200 dark:bg-gray-800 shadow-xs flex flex-col h-[442px] w-full max-w-4xl mx-auto hover:shadow-sm hover:-translate-y-1 transition-all duration-200",
          normalize(searchValue).includes(normalize("Your Recent Project")) && "ring-2 ring-blue-500 bg-yellow-50 dark:bg-yellow-900/20"
        )}
      >
        <CardHeader className="-mt-4 pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base sm:text-xl font-bold text-gray-800 dark:text-gray-100">
              Your Recent Projects
            </CardTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-xs sm:text-sm"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? 'Show Less' : 'See all Project'}
              {showAll ? <ChevronDown className="w-3 h-3 ml-1" /> : <ArrowRight className="w-3 h-3 ml-1" />}
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto scrollbar-hide">
          <Accordion type="single" collapsible className="w-full">
            {displayedProjects.map((project, idx) => {
              const IconComponent = project.icon;
              return (
                <AccordionItem key={idx} value={`project-${idx}`} className="border-none">
                  <AccordionTrigger className="hover:no-underline py-2">
                    <div className="flex items-center justify-between w-full pr-4">
                      <div className="flex items-center gap-3 flex-1">
                        <IconComponent className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        <div className="flex-1 text-left">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{project.name}</span>
                            <span className="text-xs text-muted-foreground dark:text-gray-400">{project.rate}</span>
                          </div>
                          <Badge 
                            variant={project.status === "Paid" ? "default" : "secondary"} 
                            className="text-xs mt-1"
                          >
                            {project.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-0">
                    <div className="space-y-3 pl-0">
                      <p className="text-xs text-muted-foreground dark:text-gray-400 leading-relaxed text-left">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {project.tags.map((tag, tagIdx) => (
                          <Badge 
                            key={tagIdx} 
                            variant={tag === "Remote" ? "destructive" : "default"}
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground dark:text-gray-400 text-left">
                        {project.location} • {project.timeAgo}
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </CardContent>
      </Card>
    );
  };

  // Proposal Progress Component
  const ProposalProgress = () => {
    const [date, setDate] = useState<Date>();
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    const proposalData = [
      { 
        label: "Proposals sent", 
        count: 87, 
        bars: 9,
        lineColor: "bg-blue-400",
        barColor: "bg-blue-500",
        inactiveBarColor: "bg-blue-200"
      },
      { 
        label: "Interviews", 
        count: 15, 
        bars: 4,
        lineColor: "bg-gray-400",
        barColor: "bg-gray-600",
        inactiveBarColor: "bg-gray-200"
      },
      { 
        label: "Hires", 
        count: 8, 
        bars: 3,
        lineColor: "bg-red-400",
        barColor: "bg-red-500",
        inactiveBarColor: "bg-red-200"
      },
    ];

    return (
      <Card
        ref={proposalProgressRef}
        className={cn(
          "p-4 bg-gray-200 dark:bg-gray-800 shadow-xs flex flex-col h-55 w-full max-w-4xl mx-auto hover:shadow-sm hover:-translate-y-1 transition-all duration-200",
          normalize(searchValue).includes(normalize("Proposal Progress")) && "ring-2 ring-blue-500 bg-yellow-50 dark:bg-yellow-900/20"
        )}
      >
        <CardHeader className="-mt-4 pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base sm:text-xl font-bold text-gray-800 dark:text-gray-100">
              Proposal Progress
            </CardTitle>
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-8 h-8 p-0 rounded-full"
                >
                  <CalendarIcon className="w-4 h-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardHeader>

        <CardContent className="flex-1 px-2">
          <div className="grid grid-cols-3 gap-2 h-full">
            {proposalData.map((item, index) => (
              <div key={index} className="relative flex flex-col items-center justify-center text-center space-y-2">
                {/* Vertical Line */}
                <div className={cn(
                  "absolute left-0 top-0 bottom-0 w-1 rounded-full",
                  item.lineColor
                )} />
                
                <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {item.count}
                </div>
                <div className="text-xs text-muted-foreground dark:text-gray-400 font-medium">
                  {item.label}
                </div>
                <div className="flex items-end justify-center gap-0.5 h-8">
                  {Array.from({ length: 12 }, (_, i) => (
                    <div
                      key={i}
                      className={cn(
                        "w-1 rounded-full transition-all duration-200",
                        i < item.bars
                          ? item.barColor
                          : item.inactiveBarColor
                      )}
                      style={{
                        height: `${Math.max(4, Math.random() * 24 + 4)}px`,
                        minHeight: "4px",
                        maxHeight: "28px"
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  // Earning Breakdown Component
  const EarningBreakdown = () => {
    return (
      <Card
        ref={earningBreakdownRef}
        className={cn(
          "p-2 bg-gray-200 dark:bg-gray-800 shadow-xs flex flex-col h-full w-full max-w-4xl mx-auto hover:shadow-lg hover:-translate-y-1 transition-all duration-200",
          normalize(searchValue).includes(normalize("Earning Breakdown")) && "ring-2 ring-blue-500 bg-yellow-50 dark:bg-yellow-900/20"
        )}
      >
        <CardHeader className="-mt-4">
          <CardTitle className="text-base sm:text-xl font-bold text-gray-800 dark:text-gray-100">
            Earning Breakdown
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1">
          <Tabs defaultValue="weekly" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="yearly">Yearly</TabsTrigger>
            </TabsList>
            <TabsContent value="weekly" className="mt-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Freelance Projects</span>
                  <span className="font-medium">$2,450</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Consulting</span>
                  <span className="font-medium">$1,200</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Training</span>
                  <span className="font-medium">$800</span>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="monthly" className="mt-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Freelance Projects</span>
                  <span className="font-medium">$8,450</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Consulting</span>
                  <span className="font-medium">$4,200</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Training</span>
                  <span className="font-medium">$2,800</span>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="yearly" className="mt-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Freelance Projects</span>
                  <span className="font-medium">$98,450</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Consulting</span>
                  <span className="font-medium">$52,200</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Training</span>
                  <span className="font-medium">$28,800</span>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    );
  };

  // Client Feedback Component
  const ClientFeedback = () => {
    const feedbacks = [
      { name: "Sarah Johnson", rating: 5, comment: "Excellent work and communication!", avatar: "SJ" },
      { name: "Mike Chen", rating: 4, comment: "Great quality, delivered on time.", avatar: "MC" },
      { name: "Emma Davis", rating: 5, comment: "Highly recommend this professional.", avatar: "ED" },
    ];

    return (
      <Card
        ref={clientFeedbackRef}
        className={cn(
          "p-2 bg-gray-200 dark:bg-gray-800 shadow-xs flex flex-col h-full w-full max-w-4xl mx-auto hover:shadow-lg hover:-translate-y-1 transition-all duration-200",
          normalize(searchValue).includes(normalize("Client Feedback")) && "ring-2 ring-blue-500 bg-yellow-50 dark:bg-yellow-900/20"
        )}
      >
        <CardHeader className="-mt-4">
          <CardTitle className="text-base sm:text-xl font-bold text-gray-800 dark:text-gray-100">
            Client Feedback
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto">
          <div className="space-y-3">
            {feedbacks.map((feedback, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                <div className="flex items-start gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="text-xs">{feedback.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{feedback.name}</span>
                      <div className="flex items-center gap-1">
                        {[...Array(feedback.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground dark:text-gray-400">{feedback.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <>
    <main className="w-full bg-gray-200 dark:bg-gray-800 px-4 sm:px-6 py-6 lg:py-8 max-w-[1400px] mx-auto transition-colors duration-200">
      {/* Main Grid Layout: Left (2/3) + Right (1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Left Section - 2/3 width */}
        <div className="lg:col-span-2 space-y-6 lg:space-y-8">
          {/* Income Tracker - Top full width */}
          <IncomeTracker />
          {/* Bottom row: Let's Connect + Upgrade Premium */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <LetsConnect />
            <UpgradePremium />
          </div>
        </div>
        {/* Right Section - 1/3 width */}
        <div className="flex flex-col h-full ">
          {/* Your Recent Projects - Scrollable container */}
          <div className="flex-1 overflow-y-auto h-full w-full scrollbar-hide">
            <YourRecentProjects />
          </div>
          {/* Proposal Progress - Fixed at bottom */}
          <div className="flex-shrink-0 mt-6 lg:mt-8">
            <ProposalProgress />
          </div>
        </div>
        {/* Earnings Breakdown - Row 3, below Let's Connect */}
        <EarningBreakdown />
        {/* Client Feedback - Row 3, below Proposal Progress */}
        <ClientFeedback />
      </div>
    </main>
    </>
  );
}
