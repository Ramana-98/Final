import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ChevronDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useState } from "react";
import React, { forwardRef } from "react";

// Data for different time periods
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
  { day: "W3", amount: 7800 },
  { day: "W4", amount: 10500 },
];

const yearData = [
  { day: "Jan", amount: 32000 },
  { day: "Feb", amount: 28000 },
  { day: "Mar", amount: 35000 },
  { day: "Apr", amount: 42000 },
  { day: "May", amount: 38000 },
  { day: "Jun", amount: 45000 },
  { day: "Jul", amount: 41000 },
  { day: "Aug", amount: 48000 },
  { day: "Sep", amount: 44000 },
  { day: "Oct", amount: 52000 },
  { day: "Nov", amount: 47000 },
  { day: "Dec", amount: 55000 },
];

type TimePeriod = 'week' | 'month' | 'year';

interface IncomeTrackerProps {
  highlight?: boolean;
}

const IncomeTracker = forwardRef<HTMLDivElement, IncomeTrackerProps>(({ highlight }, ref) => {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('week');
  const [selectedDay, setSelectedDay] = useState<number | null>(5); // Default to Tuesday (index 2)
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

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

  const handleBarClick = (index: number) => {
    setSelectedDay(selectedDay === index ? null : index);
  };

  const handlePeriodChange = (period: TimePeriod) => {
    setSelectedPeriod(period);
    setSelectedDay(null); // Reset selection when changing period
    setIsPopoverOpen(false);
  };

  const currentData = getCurrentData();

  return (
    <Card
      ref={ref}
      className={`rounded-2xl bg-white dark:bg-gray-800 p-3 sm:p-4 max-w-4xl h-[440px] hover:shadow-lg hover:-translate-y-1 transition-all duration-200 ${highlight ? "ring-2 ring-blue-500 bg-yellow-50 dark:bg-yellow-900/20" : ""}`}
    >
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
          <CardTitle className="text-lg sm:text-3xl font-bold flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 dark:text-gray-400" />
            Income Tracker
          </CardTitle>
          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm w-full sm:w-auto mt-2 sm:mt-0"
              >
                {selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)}
                <ChevronDown className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-32 sm:w-40 p-2 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <div className="space-y-1">
                <button
                  onClick={() => handlePeriodChange('week')}
                  className={cn(
                    "w-full text-left px-2 py-1 text-xs sm:text-sm rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300",
                    selectedPeriod === 'week' && "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium"
                  )}
                >
                  Week
                </button>
                <button
                  onClick={() => handlePeriodChange('month')}
                  className={cn(
                    "w-full text-left px-2 py-1 text-xs sm:text-sm rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300",
                    selectedPeriod === 'month' && "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium"
                  )}
                >
                  Month
                </button>
                <button
                  onClick={() => handlePeriodChange('year')}
                  className={cn(
                    "w-full text-left px-2 py-1 text-xs sm:text-sm rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300",
                    selectedPeriod === 'year' && "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium"
                  )}
                >
                  Year
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground dark:text-gray-400 mt-1 text-left">
          Track changes in income over time and access detailed data on each project and payments received.
        </p>
      </CardHeader>

      <CardContent className="mt-0 sm:mt-0 pb-2 sm:pb-4">
        {/* Left Stat for mobile only */}
        <div className="block sm:hidden mb-4 text-center">
          <p className="text-base font-semibold text-gray-900 dark:text-gray-100">{getSummaryPercentage()}</p>
          <p className="text-xs text-muted-foreground dark:text-gray-400">{getSummaryText()}</p>
        </div>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-1  sm:gap-4 min-h-48 sm:h-62 w-full">
          {/* Left Stat for desktop only */}
          <div className="hidden sm:block text-center md:text-left mb-10 sm:mb-0">
            <p className="text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-gray-100">{getSummaryPercentage()}</p>
            <p className="text-sm text-muted-foreground dark:text-gray-400">{getSummaryText()}</p>
          </div>

          {/* Vertical Bar Chart */}
          <TooltipProvider>
            <div className="flex justify-between items-end w-full max-w-xl mx-auto gap-1 sm:gap-2 lg:gap-3 overflow-hidden px-1 sm:px-0 min-h-0">
              {currentData.map((d, i) => {
                // Enhanced height calculation with more dramatic range
                const normalizedValue = (d.amount - Math.min(...currentData.map(item => item.amount))) / (Math.max(...currentData.map(item => item.amount)) - Math.min(...currentData.map(item => item.amount)));
                const height = 20 + (normalizedValue * 120); // 20px minimum, 140px maximum for better mobile fit
                const isSelected = selectedDay === i;

                return (
                  <Tooltip key={i}>
                    <TooltipTrigger asChild>
                      <div 
                        className="flex flex-col items-center gap-1 cursor-pointer"
                        onClick={() => handleBarClick(i)}
                      >
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
                    <TooltipContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                      <p className="font-medium text-gray-900 dark:text-gray-100">${d.amount.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground dark:text-gray-400">Click to select {d.day}day's data</p>
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
});

export default IncomeTracker;
