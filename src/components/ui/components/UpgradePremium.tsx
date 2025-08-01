import React, { forwardRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";

interface UpgradePremiumProps {
  highlight?: boolean;
}

const UpgradePremium = forwardRef<HTMLDivElement, UpgradePremiumProps>(({ highlight }, ref) => {
  const [popoverOpen, setPopoverOpen] = React.useState(false);
  const handleUpgradeClick = () => {
    setPopoverOpen(true);
    setTimeout(() => setPopoverOpen(false), 3000); // Auto-close after 3s
  };
  return (
    <Card
      ref={ref}
      className={`bg-gray-300 dark:bg-gray-700 text-black dark:text-white hover:bg-gradient-to-br from-[#e9f1fe] to-[#d8e7fd] dark:hover:from-[#1e3a8a] dark:hover:to-[#1e40af] rounded-2xl shadow-md relative overflow-hidden border-0 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 h-55 w-full mx-auto ${highlight ? "ring-2 ring-blue-500 bg-yellow-50 dark:bg-yellow-900/20" : ""}`}
    >
      {/* Dotted background pattern */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, #d1d5db 1.2px, transparent 1.2px)`,
            backgroundSize: '18px 18px'
          }}
        ></div>
        <div
          className="absolute inset-0 dark:block hidden"
          style={{
            backgroundImage: `radial-gradient(circle, #4b5563 1.2px, transparent 1.2px)`,
            backgroundSize: '18px 18px'
          }}
        ></div>
      </div>
      <CardContent className="relative z-10 flex flex-col items-start p-6 space-y-4 h-full -mt-8">
        <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 text-left w-full">Unlock Premium Features</h4>
        <p className="text-gray-700 dark:text-gray-300 text-base mb-6 text-left w-full">
          Get access to exclusive benefits and expand your freelancing opportunities
        </p>
        <div className="flex-grow" />
        <div className="w-full flex justify-center mt-auto">
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                className="w-full bg-gradient-to-r from-blue-500 to-green-400 hover:from-pink-500 hover:to-yellow-500 text-white hover:bg-blue hover:animate-pulse rounded-full py-6 text-xl font-semibold shadow transition-all flex items-center justify-between"
                style={{ boxShadow: "0 2px 16px 0 rgba(16,30,54,0.08)" }}
                onClick={handleUpgradeClick}
              >
                <span className="pl-2 text-left flex-1">Upgrade now</span>
                <ArrowRight className="w-7 h-7 mr-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent side="top" align="center" className="text-gray-800 dark:text-gray-100 text-base font-medium space-y-2 w-72 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <div className="font-semibold mb-1">Premium Features:</div>
              <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1 mb-2">
                <li>Priority project support</li>
                <li>Advanced analytics dashboard</li>
                <li>Unlimited proposals</li>
                <li>Early access to new features</li>
              </ul>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
                <div className="flex justify-between text-sm">
                  <span>Premium Plan</span>
                  <span className="font-bold text-blue-700 dark:text-blue-400">$19/month</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>Billing cycle</span>
                  <span>Monthly</span>
                </div>
              </div>
              <div className="mt-3">
                <input className="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-2 py-1 mb-2 text-sm" placeholder="Promo code (optional)" disabled />
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                  onClick={() => {
                    toast("Are you sure you want to pay?", {
                      action: {
                        label: "Undo",
                        onClick: () => {
                          toast("Payment cancelled");
                        }
                      }
                    });
                  }}
                >
                  Pay with Card
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </CardContent>
    </Card>
  );
});

export default UpgradePremium;
