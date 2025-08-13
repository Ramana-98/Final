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
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { ToastProvider, ToastViewport } from "@/components/ui/toast";
import { Label } from "@/components/ui/label";
import { CalendarIcon, ChevronDown, TrendingUp, Users, DollarSign, MessageSquare, Star, ArrowRight, Plus, CheckIcon, Settings, FileText, Moon, CreditCard, Building2, CheckCircle, AlertCircle, Crown, Zap, Shield, Globe } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from "recharts";
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

    const monthData = [
      { day: "W1", amount: 8500 },
      { day: "W2", amount: 9200 },
      { day: "W3", amount: 8800 },
      { day: "W4", amount: 9500 },
    ];

    const yearData = [
      { day: "Jan", amount: 45000 },
      { day: "Feb", amount: 52000 },
      { day: "Mar", amount: 48000 },
      { day: "Apr", amount: 55000 },
      { day: "May", amount: 51000 },
      { day: "Jun", amount: 58000 },
      { day: "Jul", amount: 54000 },
      { day: "Aug", amount: 61000 },
      { day: "Sep", amount: 57000 },
      { day: "Oct", amount: 64000 },
      { day: "Nov", amount: 60000 },
      { day: "Dec", amount: 67000 },
    ];

    const getCurrentData = () => {
      switch (selectedPeriod) {
        case 'week':
          return weekData;
        case 'month':
          return monthData;
        case 'year':
          return yearData;
        default:
          return weekData;
      }
    };

    const getSummaryPercentage = () => {
      switch (selectedPeriod) {
        case 'week':
          return "+20%";
        case 'month':
          return "+15%";
        case 'year':
          return "+25%";
        default:
          return "+20%";
      }
    };

    const getSummaryText = () => {
      switch (selectedPeriod) {
        case 'week':
          return "This week's income is higher than last week's";
        case 'month':
          return "This month's income is higher than last month's";
        case 'year':
          return "This year's income is higher than last year's";
        default:
          return "This week's income is higher than last week's";
      }
    };

    const currentData = getCurrentData();

    return (
      <Card
        ref={incomeTrackerRef}
        className={cn(
          "rounded-2xl bg-white dark:bg-gray-800 p-3 sm:p-4 max-w-4xl h-auto min-h-[440px] sm:h-[440px] hover:shadow-lg hover:-translate-y-1 transition-all duration-200",
          normalize(searchValue).includes(normalize("Income Tracker")) && "ring-2 ring-blue-500 bg-yellow-50 dark:bg-yellow-900/20"
        )}
      >
        <CardHeader className="pb-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
            <div className="flex flex-col gap-2">
            <CardTitle className="text-lg sm:text-3xl font-bold flex items-center gap-2 text-gray-900 dark:text-gray-100">
              <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 dark:text-gray-400" />
              Income Tracker
            </CardTitle>
              <div className="text-xs sm:text-sm text-muted-foreground dark:text-gray-400 break-words leading-relaxed line-clamp-2 sm:line-clamp-none">
                Track changes in income over time and access detailed data on each project and payments received.
              </div>
            </div>
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm w-full sm:w-auto mt-2 sm:mt-0">
                  {selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)}
                  <ChevronDown className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-32 sm:w-40 p-2">
                <div className="space-y-1">
                  <Button 
                    variant={selectedPeriod === 'week' ? 'default' : 'ghost'} 
                    size="sm" 
                    className="w-full justify-start"
                    onClick={() => {
                      setSelectedPeriod('week');
                      setSelectedDay(null);
                      setIsPopoverOpen(false);
                    }}
                  >
                    Week
                  </Button>
                  <Button 
                    variant={selectedPeriod === 'month' ? 'default' : 'ghost'} 
                    size="sm" 
                    className="w-full justify-start"
                    onClick={() => {
                      setSelectedPeriod('month');
                      setSelectedDay(null);
                      setIsPopoverOpen(false);
                    }}
                  >
                    Month
                  </Button>
                  <Button 
                    variant={selectedPeriod === 'year' ? 'default' : 'ghost'} 
                    size="sm" 
                    className="w-full justify-start"
                    onClick={() => {
                      setSelectedPeriod('year');
                      setSelectedDay(null);
                      setIsPopoverOpen(false);
                    }}
                  >
                    Year
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </CardHeader>

        <CardContent className="mt-0 sm:mt-0 pb-2 sm:pb-4">
          <div className="block sm:hidden mb-4 text-center">
            <Badge variant="default" className="text-base font-semibold text-gray-900 dark:text-gray-100 bg-transparent border-0 p-0">{getSummaryPercentage()}</Badge>
            <Badge variant="secondary" className="text-xs text-muted-foreground dark:text-gray-400 bg-transparent border-0 p-0 break-words leading-relaxed">{getSummaryText()}</Badge>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-1 sm:gap-4 min-h-48 sm:h-62 w-full">
            <div className="hidden sm:block text-center md:text-left mb-10 sm:mb-0">
              <Badge variant="default" className="text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-gray-100 bg-transparent border-0 p-0">{getSummaryPercentage()}</Badge>
              <Badge variant="secondary" className="text-sm text-muted-foreground dark:text-gray-400 bg-transparent border-0 p-0 break-words leading-relaxed">{getSummaryText()}</Badge>
            </div>

            <TooltipProvider>
              <div className="flex justify-between items-end w-full max-w-xl mx-auto gap-1 sm:gap-2 lg:gap-3 px-1 sm:px-0 min-h-0 flex-wrap">
                {currentData.map((d, i) => {
                  const normalizedValue = (d.amount - Math.min(...currentData.map(item => item.amount))) / (Math.max(...currentData.map(item => item.amount)) - Math.min(...currentData.map(item => item.amount)));
                  const height = 20 + (normalizedValue * 80);
                  const isSelected = selectedDay === i;

                  return (
                    <Tooltip key={i}>
                      <TooltipTrigger asChild>
                        <div 
                          className="flex flex-col items-center gap-1 cursor-pointer max-w-full"
                          onClick={() => setSelectedDay(isSelected ? null : i)}
                        >
                          {isSelected && (
                              <div className="text-xs font-medium bg-black dark:bg-white text-white dark:text-black rounded-full px-1 py-0.5 mb-1 max-w-full overflow-hidden">
                              ${d.amount.toLocaleString()}
                            </div>
                          )}
                          <div
                            className={cn(
                              "w-1.5 sm:w-2 rounded-full bg-gradient-to-b from-[#d4d8db] to-[#f0f1f2] dark:from-gray-600 dark:to-gray-500 hover:opacity-80 transition-opacity",
                              isSelected && "bg-blue-500 dark:bg-blue-400 ring-2 ring-blue-500 dark:ring-blue-400"
                            )}
                            style={{ height: `${height}px`, minHeight: "20px", maxHeight: "100px" }}
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
                      <Badge variant="default" className="font-medium bg-transparent border-0 p-0">${d.amount.toLocaleString()}</Badge>
                      <Badge variant="secondary" className="text-xs text-muted-foreground bg-transparent border-0 p-0">Click to select {d.day}'s data</Badge>
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

    const displayedUsers = showAll ? users : users.slice(0, 2);

    return (
      <Card
        ref={letsConnectRef}
        className={cn(
           "p-1 bg-gray-200 dark:bg-gray-800 shadow-xs flex flex-col h-48 w-full max-w-4xl mx-auto hover:shadow-lg hover:-translate-y-1 transition-all duration-200",
          normalize(searchValue).includes(normalize("Let's Connect")) && "ring-2 ring-blue-500 bg-yellow-50 dark:bg-yellow-900/20"
        )}
      >
        <CardHeader className="">
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
                          <Badge variant="secondary" className="hidden sm:inline bg-transparent border-0 p-0">{showAll ? 'Show less' : 'See all'}</Badge>
            <Badge variant="secondary" className="sm:hidden bg-transparent border-0 p-0">{showAll ? 'Less' : 'All'}</Badge>
            </Button>
          </div>
        </CardHeader>

                 <CardContent className="flex-1 overflow-hidden p-2 pt-1">
           <div className={cn(
             "h-full",
             showAll ? "overflow-y-auto scrollbar-hide" : ""
           )}>
            <div className="space-y-1">
            {displayedUsers.map((user, idx) => (
              <div key={idx} className="flex items-center gap-2 p-1 rounded-full bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                <Avatar className="w-7 h-7">
                  <AvatarImage src={user.avatarUrl} alt={user.name} />
                  <AvatarFallback className="text-xs">{user.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                    <div className="flex flex-col gap-0.5">
                      <Badge variant="default" className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate bg-transparent border-0 p-0">{user.name}</Badge>
                      <Badge variant="secondary" className="text-xs text-muted-foreground dark:text-gray-400 truncate bg-transparent border-0 p-0">{user.role}</Badge>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                  <Badge variant={user.level === "Senior" ? "default" : "secondary"} className="text-xs">
                    {user.level}
                  </Badge>
                  <Button
                    size="sm"
                    variant={connected[idx] ? "outline" : "default"}
                       className={cn(
                         "w-5 h-5 p-0 rounded-full",
                         connected[idx] && "border-green-500 text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/20"
                       )}
                    onClick={() => setConnected(prev => prev.map((val, i) => i === idx ? !val : val))}
                  >
                       {connected[idx] ? <CheckIcon className="w-2.5 h-2.5 text-green-600 dark:text-green-400" /> : <Plus className="w-2.5 h-2.5" />}
                  </Button>
                </div>
              </div>
            ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  // Upgrade Premium Component
  const UpgradePremium = () => {
    const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');
    const [isProcessing, setIsProcessing] = useState(false);
    const { toast } = useToast();

    const plans = [
      {
        id: 'monthly',
        name: 'Monthly Plan',
        price: 29,
        period: 'month',
        popular: false,
        savings: null
      },
      {
        id: 'yearly',
        name: 'Yearly Plan',
        price: 290,
        period: 'year',
        popular: true,
        savings: 'Save 17%'
      }
    ];

    const benefits = [
      { icon: Crown, title: "Priority Support", description: "Get faster response times and dedicated support" },
      { icon: Zap, title: "Advanced Analytics", description: "Detailed insights into your earnings and performance" },
      { icon: Shield, title: "Enhanced Security", description: "Advanced security features and data protection" },
      { icon: Globe, title: "Global Opportunities", description: "Access to international projects and clients" },
      { icon: Users, title: "Premium Networking", description: "Connect with top-tier clients and professionals" },
      { icon: Star, title: "Featured Profile", description: "Your profile appears first in search results" }
    ];

    const handleUpgrade = async () => {
      setIsProcessing(true);
      
      try {
        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Show success toast
        toast({
          title: "Upgrade Successful!",
          description: `Welcome to Premium! You now have access to all premium features.`,
          action: <CheckCircle className="w-4 h-4 text-green-500" />,
        });
        
        setIsUpgradeModalOpen(false);
      } catch (error) {
        // Show error toast
        toast({
          title: "Upgrade Failed",
          description: "There was an error processing your payment. Please try again.",
          action: <AlertCircle className="w-4 h-4 text-red-500" />,
        });
      } finally {
        setIsProcessing(false);
      }
    };

    const selectedPlanData = plans.find(plan => plan.id === selectedPlan);

    return (
      <>
      <Card
        ref={upgradePremiumRef}
        className={cn(
           "p-1 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-purple-900/20 dark:via-blue-900/20 dark:to-indigo-900/20 shadow-xs flex flex-col h-48 w-full max-w-4xl mx-auto hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out transform hover:scale-105",
          normalize(searchValue).includes(normalize("Upgrade Premium")) && "ring-2 ring-blue-500 bg-yellow-50 dark:bg-yellow-900/20"
        )}
      >
                   <CardHeader className="pb-3 text-left overflow-hidden">
             <CardTitle className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 animate-fade-in">
               Unlock Premium Features
          </CardTitle>
             <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-left animate-fade-in-delay leading-relaxed break-words max-w-full">
               Get access to exclusive benefits and expand your freelancing opportunities.
             </p>
        </CardHeader>

           <CardContent className="pt-2">
             <Dialog open={isUpgradeModalOpen} onOpenChange={setIsUpgradeModalOpen}>
               <DialogTrigger asChild>
                 <Button className="group w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg py-3 transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20 animate-pulse hover:animate-none">
                   <div className="flex items-center justify-between w-full">
                     <Badge variant="default" className="transition-all duration-300 ease-in-out group-hover:translate-x-1 bg-transparent border-0 p-0">Upgrade now</Badge>
                     <ArrowRight className="w-4 h-4 transition-all duration-300 ease-in-out group-hover:translate-x-2 group-hover:scale-110" />
            </div>
                </Button>
               </DialogTrigger>
               <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                 <DialogHeader>
                   <DialogTitle className="text-2xl font-bold text-center">
                     <Crown className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                     Choose Your Premium Plan
                   </DialogTitle>
                   <DialogDescription className="text-center mb-4">
                     Select the plan that best fits your needs and unlock premium features
                   </DialogDescription>
                   <div className="text-center mb-6 px-4">
                     <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-md mx-auto">
                       Get access to exclusive benefits and expand your freelancing opportunities.
                     </p>
            </div>
                 </DialogHeader>

                 {/* Plan Selection */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                   {plans.map((plan) => (
                     <div
                       key={plan.id}
                       className={cn(
                         "relative p-4 border-2 rounded-lg cursor-pointer transition-all duration-200",
                         selectedPlan === plan.id
                           ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                           : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                       )}
                       onClick={() => setSelectedPlan(plan.id as 'monthly' | 'yearly')}
                     >
                       {plan.popular && (
                         <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-green-500 text-white">
                           Most Popular
                         </Badge>
                       )}
                                              <div className="text-center">
                         <Badge variant="default" className="font-semibold text-gray-900 dark:text-gray-100 text-lg bg-transparent dark:bg-transparent border-0 p-0">{plan.name}</Badge>
                         <div className="mt-2">
                           <Badge variant="default" className="text-3xl text-gray-900 dark:text-gray-100 font-bold bg-transparent border-0 p-0">${plan.price}</Badge>
                           <Badge variant="secondary" className="text-gray-500 dark:text-gray-400 bg-transparent border-0 p-0">/{plan.period}</Badge>
            </div>
                         {plan.savings && (
                           <Badge variant="outline" className="text-sm text-green-600 dark:text-green-400 mt-1 bg-transparent border-green-500">{plan.savings}</Badge>
                         )}
                       </div>
            </div>
                   ))}
          </div>
          
                 {/* Premium Benefits */}
                 <div className="mb-6">
                   <Badge variant="default" className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-4 bg-transparent border-0 p-0">Premium Benefits</Badge>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                     {benefits.map((benefit, index) => {
                       const IconComponent = benefit.icon;
                       return (
                         <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                           <IconComponent className="w-5 h-5 text-blue-500 mt-0.5" />
                           <div>
                             <Badge variant="default" className="font-medium text-sm bg-transparent border-0 p-0">{benefit.title}</Badge>
                             <Badge variant="secondary" className="text-xs text-gray-600 dark:text-gray-400 bg-transparent border-0 p-0">{benefit.description}</Badge>
                           </div>
                         </div>
                       );
                     })}
                   </div>
                 </div>

                 {/* Payment Summary */}
                 <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6">
                   <Badge variant="default" className="font-semibold mb-3 bg-transparent border-0 p-0">Payment Summary</Badge>
                   <div className="space-y-2">
                     <div className="flex justify-between">
                       <Badge variant="secondary" className="bg-transparent border-0 p-0">Plan:</Badge>
                       <Badge variant="default" className="bg-transparent border-0 p-0">{selectedPlanData?.name}</Badge>
                     </div>
                     <div className="flex justify-between">
                       <Badge variant="secondary" className="bg-transparent border-0 p-0">Amount:</Badge>
                       <Badge variant="default" className="font-semibold bg-transparent border-0 p-0">${selectedPlanData?.price}</Badge>
                     </div>
                     <div className="border-t pt-2 mt-2">
                       <div className="flex justify-between font-semibold">
                         <Badge variant="secondary" className="bg-transparent border-0 p-0">Total:</Badge>
                         <Badge variant="default" className="bg-transparent border-0 p-0">${selectedPlanData?.price}</Badge>
                       </div>
                     </div>
                   </div>
                 </div>

                 <DialogFooter className="flex flex-col sm:flex-row gap-2">
                   <Button
                     variant="outline"
                     onClick={() => setIsUpgradeModalOpen(false)}
                     className="w-full sm:w-auto"
                   >
                     Cancel
          </Button>
                   <Button
                     onClick={handleUpgrade}
                     disabled={isProcessing}
                     className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
                   >
                     {isProcessing ? (
                       <>
                         <CheckCircle className="w-4 h-4 mr-2 animate-spin" />
                         Processing...
                       </>
                     ) : (
                       <>
                         <CreditCard className="w-4 h-4 mr-2" />
                         Upgrade to Premium
                       </>
                     )}
                   </Button>
                 </DialogFooter>
               </DialogContent>
             </Dialog>
        </CardContent>
      </Card>
      </>
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

    const displayedProjects = showAll ? allProjects : allProjects.slice(0, 4);

    return (
      <Card
        ref={yourRecentProjectsRef}
        className={cn(
          " bg-gray-200 dark:bg-gray-800 shadow-xs flex flex-col h-[442px] w-full max-w-4xl mx-auto hover:shadow-sm hover:-translate-y-1 transition-all duration-200",
          normalize(searchValue).includes(normalize("Your Recent Project")) && "ring-2 ring-blue-500 bg-yellow-50 dark:bg-yellow-900/20"
        )}
      >
        <CardHeader className="-mt-4 pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base sm:text-xl font-bold text-gray-800 dark:text-gray-100 text-left">
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
                                 <AccordionItem key={idx} value={`project-${idx}`} className="border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors mb-2">
                   <AccordionTrigger className="hover:no-underline py-3 px-4">
                     <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-3 flex-1">
                         <IconComponent className="w-4 h-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                         <div className="flex-1 text-left min-w-0">
                           <div className="flex items-center gap-2 mb-1">
                             <Badge variant="default" className="text-sm font-medium text-gray-900 dark:text-gray-100 bg-transparent border-0 p-0 truncate">{project.name}</Badge>
                          </div>
                           <div className="flex items-center gap-2">
                          <Badge 
                            variant={project.status === "Paid" ? "default" : "secondary"} 
                               className="text-xs"
                          >
                            {project.status}
                          </Badge>
                             <Badge variant="outline" className="text-xs bg-transparent">
                               {project.rate}
                          </Badge>
                           </div>
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>
                                     <AccordionContent className="pt-0 pb-4 px-4">
                     <div className="space-y-4">
                       <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                         <p className="text-sm text-muted-foreground dark:text-gray-400 leading-relaxed text-left">
                        {project.description}
                      </p>
                       </div>
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
                       <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                         <Badge variant="secondary" className="text-xs text-muted-foreground dark:text-gray-400 bg-transparent border-0 p-0">
                        {project.location} • {project.timeAgo}
                         </Badge>
                         <Badge variant="outline" className="text-xs bg-transparent">
                           {project.rate}
                         </Badge>
                       </div>
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

    // Dynamic data based on selected date
    const getProposalData = (selectedDate?: Date) => {
      const baseData = {
        proposals: { count: 87, bars: 9 },
        interviews: { count: 15, bars: 4 },
        hires: { count: 8, bars: 3 }
      };

      if (!selectedDate) {
        return [
      { 
        label: "Proposals sent", 
            count: baseData.proposals.count, 
            bars: baseData.proposals.bars,
        lineColor: "bg-blue-400",
        barColor: "bg-blue-500",
        inactiveBarColor: "bg-blue-200"
      },
      { 
        label: "Interviews", 
            count: baseData.interviews.count, 
            bars: baseData.interviews.bars,
        lineColor: "bg-gray-400",
        barColor: "bg-gray-600",
        inactiveBarColor: "bg-gray-200"
      },
      { 
        label: "Hires", 
            count: baseData.hires.count, 
            bars: baseData.hires.bars,
        lineColor: "bg-red-400",
        barColor: "bg-red-500",
        inactiveBarColor: "bg-red-200"
      },
    ];
      }

      // Generate dynamic data based on date
      const dayOfYear = Math.floor((selectedDate.getTime() - new Date(selectedDate.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
      const month = selectedDate.getMonth();
      const day = selectedDate.getDate();

      // Create variations based on date
      const proposalsVariation = Math.floor(Math.sin(dayOfYear * 0.1) * 20) + baseData.proposals.count;
      const interviewsVariation = Math.floor(Math.cos(dayOfYear * 0.15) * 8) + baseData.interviews.count;
      const hiresVariation = Math.floor(Math.sin(dayOfYear * 0.2) * 5) + baseData.hires.count;

      return [
        { 
          label: "Proposals sent", 
          count: Math.max(0, proposalsVariation), 
          bars: Math.min(12, Math.max(1, Math.floor(proposalsVariation / 10))),
          lineColor: "bg-blue-400",
          barColor: "bg-blue-500",
          inactiveBarColor: "bg-blue-200"
        },
        { 
          label: "Interviews", 
          count: Math.max(0, interviewsVariation), 
          bars: Math.min(12, Math.max(1, Math.floor(interviewsVariation / 4))),
          lineColor: "bg-gray-400",
          barColor: "bg-gray-600",
          inactiveBarColor: "bg-gray-200"
        },
        { 
          label: "Hires", 
          count: Math.max(0, hiresVariation), 
          bars: Math.min(12, Math.max(1, Math.floor(hiresVariation / 2))),
          lineColor: "bg-red-400",
          barColor: "bg-red-500",
          inactiveBarColor: "bg-red-200"
        },
      ];
    };

    const proposalData = getProposalData(date);

    return (
      <Card
        ref={proposalProgressRef}
        className={cn(
           "p-4 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-100 dark:from-orange-900/20 dark:via-amber-900/20 dark:to-yellow-900/20 shadow-xs flex flex-col h-48 w-full max-w-4xl mx-auto hover:shadow-sm hover:-translate-y-1 transition-all duration-200",
          normalize(searchValue).includes(normalize("Proposal Progress")) && "ring-2 ring-blue-500 bg-yellow-50 dark:bg-yellow-900/20"
        )}
      >
        <CardHeader className="-mt-4 pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base sm:text-xl font-bold text-gray-800 dark:text-gray-100 text-left">
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
                  onSelect={(newDate) => {
                    setDate(newDate);
                    setIsCalendarOpen(false);
                  }}
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
                
                <div className="text-xs text-muted-foreground dark:text-gray-400 font-medium">
                  {item.label}
                </div>
                <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 transition-all duration-300">
                  {item.count}
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
    const weeklyData = [
      { period: "Mon", Freelance: 2450, Consulting: 1200, Training: 800 },
      { period: "Tue", Freelance: 2800, Consulting: 1400, Training: 900 },
      { period: "Wed", Freelance: 3200, Consulting: 1600, Training: 1100 },
      { period: "Thu", Freelance: 2900, Consulting: 1300, Training: 850 },
      { period: "Fri", Freelance: 3100, Consulting: 1500, Training: 1000 },
      { period: "Sat", Freelance: 2600, Consulting: 1200, Training: 750 },
      { period: "Sun", Freelance: 2400, Consulting: 1100, Training: 700 },
    ];

    const monthlyData = [
      { period: "Week 1", Freelance: 8450, Consulting: 4200, Training: 2800 },
      { period: "Week 2", Freelance: 9200, Consulting: 4800, Training: 3200 },
      { period: "Week 3", Freelance: 8800, Consulting: 4400, Training: 2900 },
      { period: "Week 4", Freelance: 9500, Consulting: 5000, Training: 3500 },
    ];

    const yearlyData = [
      { period: "Jan", Freelance: 98450, Consulting: 52200, Training: 28800 },
      { period: "Feb", Freelance: 102300, Consulting: 54800, Training: 31200 },
      { period: "Mar", Freelance: 98700, Consulting: 52100, Training: 28900 },
      { period: "Apr", Freelance: 105600, Consulting: 56900, Training: 33400 },
      { period: "May", Freelance: 101200, Consulting: 53800, Training: 30100 },
      { period: "Jun", Freelance: 108900, Consulting: 58700, Training: 35600 },
    ];

    const CustomTooltip = ({ active, payload, label }: any) => {
      if (active && payload && payload.length) {
        return (
          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <Badge variant="default" className="font-medium text-gray-900 dark:text-gray-100 bg-transparent border-0 p-0">{label}</Badge>
            {payload.map((entry: any, index: number) => (
              <Badge key={index} variant="secondary" className="text-sm bg-transparent border-0 p-0" style={{ color: entry.color }}>
                {entry.name}: ${entry.value.toLocaleString()}
              </Badge>
            ))}
          </div>
        );
      }
      return null;
    };

    return (
      <Card
        ref={earningBreakdownRef}
        className={cn(
          " bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100 dark:from-green-900/20 dark:via-emerald-900/20 dark:to-teal-900/20 shadow-xs flex flex-col h-full w-full max-w-4xl mx-auto hover:shadow-lg hover:-translate-y-1 transition-all duration-200",
          normalize(searchValue).includes(normalize("Earning Breakdown")) && "ring-2 ring-blue-500 bg-yellow-50 dark:bg-yellow-900/20"
        )}
      >
        <CardHeader className="-mt-4 pb-3">
          <CardTitle className="text-base sm:text-xl font-bold text-gray-800 dark:text-gray-100 text-center">
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
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="period" 
                      tick={{ fontSize: 12, fill: '#6b7280' }}
                      axisLine={{ stroke: '#e5e7eb' }}
                    />
                    <YAxis 
                      tick={{ fontSize: 12, fill: '#6b7280' }}
                      axisLine={{ stroke: '#e5e7eb' }}
                      tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                    />
                    <RechartsTooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="Freelance" stackId="a" fill="#3b82f6" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="Consulting" stackId="a" fill="#10b981" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="Training" stackId="a" fill="#f59e0b" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="monthly" className="mt-4">
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="period" 
                      tick={{ fontSize: 12, fill: '#6b7280' }}
                      axisLine={{ stroke: '#e5e7eb' }}
                    />
                    <YAxis 
                      tick={{ fontSize: 12, fill: '#6b7280' }}
                      axisLine={{ stroke: '#e5e7eb' }}
                      tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                    />
                    <RechartsTooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="Freelance" stackId="a" fill="#3b82f6" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="Consulting" stackId="a" fill="#10b981" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="Training" stackId="a" fill="#f59e0b" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="yearly" className="mt-4">
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={yearlyData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="period" 
                      tick={{ fontSize: 12, fill: '#6b7280' }}
                      axisLine={{ stroke: '#e5e7eb' }}
                    />
                    <YAxis 
                      tick={{ fontSize: 12, fill: '#6b7280' }}
                      axisLine={{ stroke: '#e5e7eb' }}
                      tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                    />
                    <RechartsTooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="Freelance" stackId="a" fill="#3b82f6" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="Consulting" stackId="a" fill="#10b981" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="Training" stackId="a" fill="#f59e0b" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    );
  };

  // Client Feedback Component
  const ClientFeedback = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const feedbacks = [
      { 
        name: "Sarah Johnson", 
        rating: 5, 
        comment: "Excellent work and communication! The project was delivered ahead of schedule with outstanding quality. Highly recommend working with this professional.", 
        avatar: "SJ",
        avatarUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
      },
      { 
        name: "Mike Chen", 
        rating: 4, 
        comment: "Great quality, delivered on time. Very professional and responsive throughout the entire process. The technical expertise demonstrated was impressive.", 
        avatar: "MC",
        avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
      },
      { 
        name: "Emma Davis", 
        rating: 5, 
        comment: "Highly recommend this professional. Exceeded all expectations and provided exceptional value. The work ethic and attention to detail were outstanding.", 
        avatar: "ED",
        avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
      },
      { 
        name: "David Wilson", 
        rating: 5, 
        comment: "Outstanding attention to detail and creative solutions. Will definitely work together again! The problem-solving approach was innovative and effective.", 
        avatar: "DW",
        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      { 
        name: "Lisa Rodriguez", 
        rating: 4, 
        comment: "Very reliable and skilled developer. The final product was exactly what we needed. The technical implementation was flawless.", 
        avatar: "LR",
        avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
      },
      { 
        name: "James Thompson", 
        rating: 5, 
        comment: "Exceptional problem-solving skills and excellent communication. Highly satisfied with the results. The ability to understand complex requirements was impressive.", 
        avatar: "JT",
        avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face"
      },
      { 
        name: "Maria Garcia", 
        rating: 4, 
        comment: "Professional, punctual, and delivers quality work. Great experience working together. The project was executed with precision and attention to detail.", 
        avatar: "MG",
        avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
      },
      { 
        name: "Robert Kim", 
        rating: 5, 
        comment: "Amazing work ethic and technical expertise. The project exceeded our expectations completely. The innovative approach to problem-solving was effective.", 
        avatar: "RK",
        avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face"
      },
    ];

    // Auto-advance slider
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % feedbacks.length);
      }, 3000);
      return () => clearInterval(interval);
    }, [feedbacks.length]);

    return (
      <Card
        ref={clientFeedbackRef}
        className={cn(
          " bg-gradient-to-br from-pink-50 via-rose-50 to-red-100 dark:from-pink-900/20 dark:via-rose-900/20 dark:to-red-900/20 shadow-xs flex flex-col h-full w-full max-w-4xl mx-auto hover:shadow-lg hover:-translate-y-1 transition-all duration-200",
          normalize(searchValue).includes(normalize("Client Feedback")) && "ring-2 ring-blue-500 bg-yellow-50 dark:bg-yellow-900/20"
        )}
      >
        <CardHeader className="-mt-4 pb-3">
          <CardTitle className="text-base sm:text-xl font-bold text-gray-800 dark:text-gray-100 text-center">
            Client Feedback
          </CardTitle>
        </CardHeader>

                 <CardContent className="flex-1 relative overflow-hidden min-h-[200px] sm:min-h-[250px] max-h-[200px] sm:max-h-[250px]">
           <div className="relative h-full min-h-[180px] sm:min-h-[220px]">
            {feedbacks.map((feedback, idx) => (
               <div
                 key={idx}
                                                     className={cn(
                    "absolute inset-0 p-2 rounded-lg bg-white dark:bg-gray-700 transition-all duration-500 ease-in-out",
                   idx === currentIndex 
                     ? "opacity-100 translate-x-0" 
                     : idx === (currentIndex + 1) % feedbacks.length
                     ? "opacity-0 translate-x-full"
                     : idx === (currentIndex - 1 + feedbacks.length) % feedbacks.length
                     ? "opacity-0 -translate-x-full"
                     : "opacity-0 translate-x-full"
                  )}
               >
                                                      <div className="flex flex-col items-center justify-center h-full text-center p-2 space-y-2">
                     <Avatar className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0">
                       <AvatarImage src={feedback.avatarUrl} alt={feedback.name} />
                       <AvatarFallback className="text-xs sm:text-sm font-medium">{feedback.avatar}</AvatarFallback>
                  </Avatar>
                     <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                       <Badge variant="default" className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100 bg-transparent border-0 p-0">{feedback.name}</Badge>
                       <div className="flex items-center gap-0.5">
                        {[...Array(feedback.rating)].map((_, i) => (
                           <Star key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                     <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-4 sm:line-clamp-5 max-w-xs sm:max-w-sm break-words flex-1">{feedback.comment}</p>
                  </div>
                </div>
            ))}
              </div>
           
           {/* Enhanced Slider Controls */}
                      <div className="absolute bottom-2 sm:bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-2">
             {feedbacks.map((_, idx) => (
               <Button
                 key={idx}
                 variant="outline"
                 size="sm"
                 onClick={() => setCurrentIndex(idx)}
                 className={cn(
                   "w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 hover:scale-110 p-0",
                   idx === currentIndex 
                     ? "bg-blue-500 dark:bg-blue-400 shadow-lg" 
                     : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                 )}
               />
            ))}
          </div>
           
           {/* Navigation Arrows */}
           <Button
             variant="outline"
             size="sm"
             onClick={() => setCurrentIndex((prev) => (prev - 1 + feedbacks.length) % feedbacks.length)}
             className="absolute left-1 sm:left-2 top-1/2 transform -translate-y-1/2 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white dark:bg-gray-700 shadow-md hover:shadow-lg transition-all duration-200 opacity-80 hover:opacity-100 p-0"
           >
             <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 rotate-90 mx-auto" />
           </Button>
           <Button
             variant="outline"
             size="sm"
             onClick={() => setCurrentIndex((prev) => (prev + 1) % feedbacks.length)}
             className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white dark:bg-gray-700 shadow-md hover:shadow-lg transition-all duration-200 opacity-80 hover:opacity-100 p-0"
           >
             <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 -rotate-90 mx-auto" />
           </Button>
        </CardContent>
      </Card>
    );
  };

  // Next Payout Component
  const NextPayout = () => {
    const [selectedBank, setSelectedBank] = useState("Chase Bank •••• 1234");
    const [showDetails, setShowDetails] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isScheduling, setIsScheduling] = useState(false);
    const [scheduledDate, setScheduledDate] = useState<Date>();
    const [isSchedulePopoverOpen, setIsSchedulePopoverOpen] = useState(false);
    const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
    const { toast } = useToast();
    
    const handleProcessPayout = async () => {
      setIsProcessing(true);
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Show success toast
        toast({
          title: "Payout Processed Successfully!",
          description: `$${payoutData.amount.toLocaleString()} has been transferred to ${selectedBank}. Transaction ID: ${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
          action: <CheckCircle className="w-4 h-4 text-green-500" />,
        });
      } catch (error) {
        // Show error toast
        toast({
          title: "Payout Failed",
          description: "There was an error processing your payout. Please try again.",
          action: <AlertCircle className="w-4 h-4 text-red-500" />,
        });
      } finally {
        setIsProcessing(false);
      }
    };

    const handleSchedulePayout = async () => {
      if (!scheduledDate) return;
      
      setIsScheduling(true);
      setIsScheduleDialogOpen(false);
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success toast
        toast({
          title: "Payout Scheduled Successfully!",
          description: `$${payoutData.amount.toLocaleString()} will be transferred to ${selectedBank} on ${scheduledDate.toLocaleDateString()}. Schedule ID: ${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
          action: <CheckCircle className="w-4 h-4 text-green-500" />,
        });
        
        // Reset states
        setScheduledDate(undefined);
        setIsSchedulePopoverOpen(false);
      } catch (error) {
        // Show error toast
        toast({
          title: "Schedule Failed",
          description: "There was an error scheduling your payout. Please try again.",
          action: <AlertCircle className="w-4 h-4 text-red-500" />,
        });
      } finally {
        setIsScheduling(false);
      }
    };
    
    const payoutData = {
      amount: 2847.50,
      date: "Dec 15, 2024",
      projects: ["Web Development Project", "UI/UX Design Project"],
      bankAccount: "Chase Bank •••• 1234",
      breakdown: [
        { project: "Web Development Project", amount: 1847.50, hours: 45 },
        { project: "UI/UX Design Project", amount: 1000.00, hours: 25 }
      ],
      bankOptions: [
        "Chase Bank •••• 1234",
        "Wells Fargo •••• 5678",
        "Bank of America •••• 9012"
      ]
    };

    return (
      <Card
        className={cn(
          "p- bg-gradient-to-br from-cyan-50 via-sky-50 to-blue-100 dark:from-cyan-900/20 dark:via-sky-900/20 dark:to-blue-900/20 shadow-xs flex flex-col h-full w-full max-w-4xl mx-auto hover:shadow-lg hover:-translate-y-1 transition-all duration-200",
          normalize(searchValue).includes(normalize("Next Payout")) && "ring-2 ring-blue-500 bg-yellow-50 dark:bg-yellow-900/20"
        )}
      >
        <CardHeader className="-mt-4 pb-2">
          <div className="flex items-center justify-center relative">
            <CardTitle className="text-base sm:text-xl font-bold text-gray-800 dark:text-gray-100 text-center">
              Next Payout
            </CardTitle>
            <CreditCard className="w-5 h-5 text-gray-500 dark:text-gray-400 absolute right-0" />
          </div>
        </CardHeader>

        <CardContent className="flex-1 space-y-1">
          {/* Payout Amount */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
                           <Badge variant="default" className="text-2xl font-bold text-gray-900 dark:text-gray-100 bg-transparent border-0 p-0">
               ${payoutData.amount.toLocaleString()}
             </Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <CalendarIcon className="w-4 h-4" />
              <Badge variant="secondary" className="bg-transparent border-0 p-0">{payoutData.date}</Badge>
            </div>
          </div>

          {/* Interactive Breakdown Toggle */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <Badge variant="default" className="text-sm font-medium text-gray-700 dark:text-gray-300 bg-transparent border-0 p-0">Linked Projects</Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDetails(!showDetails)}
                className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                {showDetails ? 'Hide Details' : 'Show Details'}
              </Button>
            </div>
            
            <div className="h-16 overflow-hidden">
              {showDetails ? (
                <div className="space-y-2 bg-white dark:bg-gray-700 rounded-lg p-3 h-full overflow-y-auto">
                  {payoutData.breakdown.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                        <Badge variant="secondary" className="text-gray-600 dark:text-gray-400 truncate bg-transparent border-0 p-0">{item.project}</Badge>
                      </div>
                      <div className="flex items-center gap-3">
                                             <Badge variant="secondary" className="text-gray-500 dark:text-gray-400 bg-transparent border-0 p-0">{item.hours}h</Badge>
                     <Badge variant="default" className="font-medium text-gray-900 dark:text-gray-100 bg-transparent border-0 p-0">${item.amount.toLocaleString()}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-1">
                  {payoutData.projects.map((project, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                      <Badge variant="secondary" className="truncate bg-transparent border-0 p-0">{project}</Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Bank Account Selection */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <Badge variant="default" className="text-sm font-medium text-gray-700 dark:text-gray-300 bg-transparent border-0 p-0">Bank Account</Badge>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-between text-xs h-8"
                >
                  <Badge variant="secondary" className="truncate bg-transparent border-0 p-0">{selectedBank}</Badge>
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48 p-2">
                <div className="space-y-1">
                  {payoutData.bankOptions.map((bank, idx) => (
                    <Button
                      key={idx}
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-xs h-7"
                      onClick={() => setSelectedBank(bank)}
                    >
                      {bank}
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  size="sm" 
                  className="flex-1 text-xs h-8"
                  disabled={isProcessing}
                >
                  <CreditCard className="w-3 h-3 mr-1" />
                  {isProcessing ? "Processing..." : "Process Payout"}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm Payout</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to process a payout of ${payoutData.amount.toLocaleString()} to {selectedBank}?
                  </AlertDialogDescription>
                  <div className="mt-4">
                    <Badge variant="default" className="text-sm text-muted-foreground bg-transparent border-0 p-0">Linked Projects:</Badge>
                    <div className="mt-2 space-y-1">
                      {payoutData.projects.map((project, idx) => (
                        <Badge key={idx} variant="secondary" className="text-sm text-muted-foreground bg-transparent border-0 p-0 block">• {project}</Badge>
                      ))}
                    </div>
                  </div>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleProcessPayout}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Confirm Payout
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            
            {/* Schedule Button with Popover Calendar */}
            <Popover open={isSchedulePopoverOpen} onOpenChange={setIsSchedulePopoverOpen}>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs h-8"
                  disabled={isScheduling}
                >
                  <CalendarIcon className="w-3 h-3 mr-1" />
                  {isScheduling ? "Scheduling..." : "Schedule"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={scheduledDate}
                  onSelect={(date) => {
                    setScheduledDate(date);
                    if (date) {
                      setIsSchedulePopoverOpen(false);
                      setIsScheduleDialogOpen(true);
                    }
                  }}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            
            {/* Schedule Confirmation Dialog */}
            <AlertDialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm Scheduled Payout</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to schedule a payout of ${payoutData.amount.toLocaleString()} to {selectedBank} for {scheduledDate?.toLocaleDateString()}?
                  </AlertDialogDescription>
                  <div className="mt-4">
                    <Badge variant="default" className="text-sm text-muted-foreground bg-transparent border-0 p-0">Linked Projects:</Badge>
                    <div className="mt-2 space-y-1">
                      {payoutData.projects.map((project, idx) => (
                        <Badge key={idx} variant="secondary" className="text-sm text-muted-foreground bg-transparent border-0 p-0 block">• {project}</Badge>
                      ))}
                    </div>
                  </div>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleSchedulePayout}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Confirm Schedule
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <>
      <ToastProvider>
    <main className="w-full bg-gray-200 dark:bg-gray-800 px-4 sm:px-6 py-6 lg:py-8 max-w-[1400px] mx-auto transition-colors duration-200">
          <div className="relative">
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
            {/* Next Payout - Row 3, below Earnings Breakdown */}
            <NextPayout />
        {/* Client Feedback - Row 3, below Proposal Progress */}
        <ClientFeedback />
      </div>
      </div>
    </main>
        <ToastViewport />
      </ToastProvider>
    </>
  );
}
