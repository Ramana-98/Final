import React, { useState, forwardRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const earningsData = {
  week: {
    total: 3200,
    paid: 2400,
    pending: 800,
    colors: ["#2B4586", "#E5E7EB"]
  },
  month: {
    total: 12000,
    paid: 9000,
    pending: 3000,
    colors: ["#059669", "#FEF3C7"]
  },
};

interface EarningBreakdownProps {
  highlight?: boolean;
}

const EarningBreakdown = forwardRef<HTMLDivElement, EarningBreakdownProps>(
  ({ highlight = false }, ref) => {
    const [tab, setTab] = useState("week");
    const [isSurfaceDuo, setIsSurfaceDuo] = useState(false);
    const data = tab === "week" ? earningsData.week : earningsData.month;

    useEffect(() => {
      const checkScreenSize = () => {
        setIsSurfaceDuo(window.innerWidth >= 540 && window.innerWidth < 768);
      };
      
      checkScreenSize();
      window.addEventListener('resize', checkScreenSize);
      
      return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const pieData = {
      labels: ["Paid", "Pending"],
      datasets: [
        {
          data: [data.paid, data.pending],
          backgroundColor: data.colors,
          borderWidth: 0,
        },
      ],
    };

    return (
      <Card
        ref={ref}
        className={`rounded-2xl shadow w-full max-w-md md:max-w-none lg:max-w-md mx-auto p-5 transition-all duration-200 hover:bg-gray-300 dark:hover:bg-gray-700 hover:-translate-y-2 ${
          highlight ? "ring-2 ring-blue-500 bg-yellow-50 dark:bg-yellow-900/20" : ""
        } ${
          tab === "week"
            ? "bg-gradient-to-br from-[#e9f1fe] to-[#d8e7fd] dark:from-[#1e3a8a] dark:to-[#1e40af]"
            : "bg-gradient-to-br from-[#f0fdf4] to-[#dcfce7] dark:from-[#065f46] dark:to-[#047857]"
        }`}
        style={{
          maxWidth: isSurfaceDuo ? '100%' : undefined
        }}
      >
        <CardHeader className="pb-1">
          <CardTitle className="text-2xl md:text-3xl lg:text-2xl font-bold text-gray-900 dark:text-gray-100">Earnings Breakdown</CardTitle>
        </CardHeader>
        <CardContent >
          <Tabs value={tab} onValueChange={setTab} className="mb-2">
            <TabsList className="bg-gray-100 dark:bg-gray-700 rounded-lg p-1 inline-flex mb-7 flex justify-center w-full md:w-auto lg:w-auto md:mx-auto">
              <TabsTrigger
                value="week"
                className={
                  tab === "week"
                    ? "bg-white dark:bg-gray-600 shadow text-black dark:text-gray-100 font-semibold px-4 py-1 md:px-6 md:py-2 lg:px-4 lg:py-1 rounded-lg md:text-base lg:text-sm"
                    : "text-gray-500 dark:text-gray-400 px-4 py-1 md:px-6 md:py-2 lg:px-4 lg:py-1 md:text-base lg:text-sm"
                }
              >
                This week
              </TabsTrigger>
              <TabsTrigger
                value="month"
                className={
                  tab === "month"
                    ? "bg-white dark:bg-gray-600 shadow text-black dark:text-gray-100 font-semibold px-4 py-1 md:px-6 md:py-2 lg:px-4 lg:py-1 rounded-lg md:text-base lg:text-sm"
                    : "text-gray-500 dark:text-gray-400 px-4 py-1 md:px-6 md:py-2 lg:px-4 lg:py-1 md:text-base lg:text-sm"
                }
              >
                Last month
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex flex-col sm:flex-row md:flex-row lg:flex-row items-center gap-4">
            <div className="flex-1 flex flex-col items-start md:items-center lg:items-start">
              <div className="text-3xl md:text-4xl lg:text-3xl font-extrabold mb-1 text-gray-900 dark:text-gray-100">${data.total.toLocaleString()}</div>
              <div className="text-gray-500 dark:text-gray-400 text-base md:text-lg lg:text-base mb-4">Total Earnings</div>
              <div className="flex flex-col gap-2 mt-2 md:gap-3 lg:gap-2">
                <div className="flex items-center gap-2 md:gap-3 lg:gap-2">
                  <div 
                    className="w-3 h-3 md:w-4 md:h-4 lg:w-3 lg:h-3 rounded-full" 
                    style={{ backgroundColor: data.colors[0] }}
                  ></div>
                  <span className="font-bold md:text-lg lg:text-base text-gray-900 dark:text-gray-100">Paid</span>
                  <span className="ml-4 text-base md:text-lg lg:text-base text-gray-900 dark:text-gray-100">${data.paid.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2 md:gap-3 lg:gap-2">
                  <div 
                    className="w-3 h-3 md:w-4 md:h-4 lg:w-3 lg:h-3 rounded-full" 
                    style={{ backgroundColor: data.colors[1] }}
                  ></div>
                  <span className="font-bold md:text-lg lg:text-base text-gray-900 dark:text-gray-100">Pending</span>
                  <span className="ml-4 text-base md:text-lg lg:text-base text-gray-900 dark:text-gray-100">${data.pending.toLocaleString()}</span>
                </div>
              </div>
            </div>
            <div className="flex-1 flex justify-center items-center">
              <div className="w-32 h-32 md:w-40 md:h-40 lg:w-32 lg:h-32" style={{
                width: isSurfaceDuo ? '180px' : undefined,
                height: isSurfaceDuo ? '180px' : undefined
              }}>
                <Doughnut
                  data={pieData}
                  options={{
                    plugins: {
                      legend: { display: false },
                      tooltip: { 
                        enabled: true,
                        callbacks: {
                          label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${label}: $${value.toLocaleString()} (${percentage}%)`;
                          }
                        }
                      }
                    },
                    cutout: "70%",
                    responsive: true,
                    maintainAspectRatio: false,
                  }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
);

EarningBreakdown.displayName = "EarningBreakdown";

export default EarningBreakdown;
