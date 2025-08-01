import React, { useState, useEffect, forwardRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const feedbacks = [
  {
    name: "Emily Johnson",
    role: "UI Designer",
    message: "Amazing work! The project exceeded my expectations.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "James Carter",
    role: "Software Engineer",
    message: "Great communication and excellent delivery.Prescribe!",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Sophia Lee",
    role: "Product Manager",
    message: "The attention to detail was top-notch. Will hire again.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Daniel Kim",
    role: "Tech Lead",
    message: "Delivered exactly what we needed under tight deadlines.",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
  },
  {
    name: "Ava Smith",
    role: "Marketing Strategist",
    message: "Creative and thoughtful approach to problem-solving!",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
  },
];

const CARD_WIDTH = 220; // px (card + gap)

interface ClientFeedbackProps {
  highlight?: boolean;
}

const ClientFeedback = forwardRef<HTMLDivElement, ClientFeedbackProps>(
  ({ highlight = false }, ref) => {
    const [centerIdx, setCenterIdx] = useState(0); // Start with first card centered
    const total = feedbacks.length;

    // Auto-scroll effect
    useEffect(() => {
      const interval = setInterval(() => {
        setCenterIdx((prev) => (prev + 1) % total);
      }, 3000);
      return () => clearInterval(interval);
    }, [total]);

    // For transition: get previous, center, next
    const getCardPosition = (idx: number) => {
      if (idx === centerIdx) return 'center';
      if ((idx + 1) % total === centerIdx) return 'left';
      if ((idx - 1 + total) % total === centerIdx) return 'right';
      return 'hidden';
    };

    return (
      <section
        ref={ref}
        className={`
          rounded-2xl
          w-full
          h-[335px]
          mx-auto
          py-5 px-2 sm:px-6
          bg-gradient-to-br from-[#f3f3ff] to-[#e1e4fb] dark:from-[#1e1b4b] dark:to-[#312e81] backdrop-blur-md
          font-sans overflow-hidden
          transition-all duration-200 hover:-translate-y-2
          md:w-[795px] md:max-w-[90vw] md:mx-auto
          ${highlight ? "ring-2 ring-blue-500 bg-yellow-50 dark:bg-yellow-900/20" : ""}
        `}
      >
        <div className="max-w-5xl mx-auto overflow-hidden -mt-1">
          <h2 className="text-2xl sm:text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100 tracking-tight">Client Feedback</h2>
          <div className="flex justify-center items-center relative h-[260px]">
            {feedbacks.map((fb, idx: number) => {
              const pos = getCardPosition(idx);
              let style = { width: CARD_WIDTH };
              let className =
                "absolute top-1/2 left-1/2 transition-all duration-700 flex flex-col items-center";
              if (pos === 'center') {
                className +=
                  " z-20 -translate-x-1/2 -translate-y-[60%] scale-110 shadow-2xl bg-white dark:bg-gray-200 opacity-100";
              } else if (pos === 'left') {
                className +=
                  " z-10 -translate-x-[170%] -translate-y-1/2 scale-95 opacity-60 bg-white dark:bg-gray-200";
              } else if (pos === 'right') {
                className +=
                  " z-10 translate-x-[70%] -translate-y-1/2 scale-95 opacity-60 bg-white dark:bg-gray-200";
              } else {
                className += " opacity-0 pointer-events-none";
              }
              return (
                                 <div key={idx} className={className} style={style}>
                   <Card className="min-w-[220px] max-w-[200px] mx-auto rounded-1xl border-0 px-3 py-4 flex flex-col items-center bg-white dark:bg-gray-400">
                    <CardHeader className="flex flex-col items-center p-0 mb-1">
                      <img
                        src={fb.avatar || `/avatars/default.png`}
                        alt={fb.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-blue-100 dark:border-blue-700 shadow mb-1"
                      />
                      <CardTitle className="text-sm font-semibold text-gray-800 dark:text-gray-800 text-center">
                        {fb.name}
                      </CardTitle>
                      <p className="text-xs text-gray-500 dark:text-gray-800 text-center">{fb.role}</p>
                    </CardHeader>
                    <CardContent className="p-0 text-center">
                      <p className="text-xs text-gray-600 dark:text-gray-200 leading-relaxed">
                        "{fb.message}"
                      </p>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }
);

ClientFeedback.displayName = "ClientFeedback";

export default ClientFeedback;
