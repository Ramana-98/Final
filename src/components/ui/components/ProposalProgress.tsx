import React, { useState, forwardRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, ChevronUp } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

interface Metric {
  label: string;
  value: number;
  color: string;
  barColor: string;
}

function getRandomMetricsForDate(date: Date): Metric[] {
  // Use the date as a seed for consistent random values per date
  const seed = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
  function seededRandom(min: number, max: number, salt: number) {
    // Simple deterministic pseudo-random based on date and salt
    const x = Math.sin(seed + salt) * 10000;
    return Math.floor((x - Math.floor(x)) * (max - min + 1) + min);
  }
  return [
    {
      label: "Proposals sent",
      value: seededRandom(40, 100, 1),
      color: "text-gray-800",
      barColor: "bg-blue-400 dark:bg-blue-500",
    },
    {
      label: "Interviews",
      value: seededRandom(5, 25, 2),
      color: "text-gray-800",
      barColor: "bg-gray-600 dark:bg-gray-500",
    },
    {
      label: "Hires",
      value: seededRandom(5, 20, 3),
      color: "text-gray-800",
      barColor: "bg-red-600 dark:bg-red-500",
    },
  ];
}

interface ProposalProgressProps {
  highlight?: boolean;
}

const ProposalProgress = forwardRef<HTMLDivElement, ProposalProgressProps>(({ highlight }, ref) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2024, 3, 11)); // April 11, 2024
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const formatDate = (date: Date) => {
    return format(date, "MMM dd, yyyy");
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      setIsCalendarOpen(false);
    }
  };

  const currentMetrics = getRandomMetricsForDate(selectedDate);

  return (
    <Card
      ref={ref}
      className={`bg-white dark:bg-gray-800 shadow-sm rounded-2xl  flex flex-col h-55 w-full hover:shadow-lg hover:bg-gradient-to-br from-[#fff3f2] to-[#fce8e7] dark:hover:from-[#1f2937] dark:hover:to-[#374151] hover:-translate-y-1 transition-all duration-200 ${highlight ? "ring-2 ring-blue-500 bg-yellow-50 dark:bg-yellow-900/20" : ""}`}
    >
      <CardHeader className="pb-3  pt-6 sm:pt-3 -mt-6 ">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base sm:text-xl font-bold text-gray-900 dark:text-gray-100">
            Proposal Progress
          </CardTitle>
          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 text-xs sm:text-sm"
              >
                <CalendarIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">{formatDate(selectedDate)}</span>
                <span className="sm:hidden">{format(selectedDate, "MMM dd")}</span>
                <ChevronUp className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-0 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              side="top"
              align="center"
              avoidCollisions={false}
            >
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                initialFocus
                className="rounded-md border border-gray-200 dark:border-gray-700"
              />
            </PopoverContent>
          </Popover>
        </div>
      </CardHeader>
      <CardContent className="flex-1 min-h-0 px-4 pb-1 sm:px-6 pb-1 sm:pb-1 flex flex-col">
        <div className="relative flex flex-row h-full w-full">
          {currentMetrics.map((metric, idx) => (
            <div key={idx} className={`flex flex-col justify-between h-full flex-1 pl-2 pr-4 relative ${idx < 2 ? 'border-r-2' : ''}`} style={{ borderColor: idx === 0 ? '#cbd5e1' : idx === 1 ? '#f87171' : undefined }}>
              {/* Label */}
              <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-semibold text-left mb-1 mt-2">
                {metric.label}
              </div>
              {/* Value */}
              <div className={`text-2xl sm:text-4xl font-extrabold ${metric.color} dark:text-gray-100 text-left mb-2`}>
                {metric.value}
              </div>
              {/* Bar chart */}
              <div className="flex items-end justify-start gap-0.5 sm:gap-1 h-10 sm:h-14 w-full">
                {Array.from({ length: 12 }, (_, i) => (
                  <div
                    key={i}
                    className={`w-1 rounded-full ${metric.barColor} ${
                      i < Math.floor(metric.value / 8.3) ? 'opacity-100' : 'opacity-20'
                    }`}
                    style={{
                      height: '80%',
                      minHeight: '12px',
                      maxHeight: '32px'
                    }}
                  />
                ))}
              </div>
              {/* Vertical line at right edge for all but last column */}
              {idx < 2 && (
                <div className={`absolute top-0 right-0 h-full w-0.5 ${
                  idx === 0 
                    ? 'bg-gray-300 dark:bg-gray-600' 
                    : 'bg-red-400 dark:bg-red-500'
                }`} />
              )}
              {idx === 0 && (
                <div className="absolute top-0 left-0 h-full w-1 bg-blue-300 dark:bg-blue-400 rounded" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
});

export default ProposalProgress;
