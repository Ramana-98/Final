import React, { useState, forwardRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, Settings, FileText, Moon, Code, Palette, Database } from "lucide-react";

interface Project {
  title: string;
  status: "Paid" | "Not Paid";
  rate: string;
  description?: string;
  tags?: string[];
  country?: string;
  time?: string;
  icon: "settings" | "file" | "moon" | "code" | "palette" | "database";
}

const initialProjects: Project[] = [
  {
    title: "Web Development Project",
    status: "Paid",
    rate: "$10/hour",
    description: "This project involves implementing both frontend and backend functionalities, as well as integrating with third-party APIs.",
    tags: ["Remote", "Part-time"],
    country: "Germany",
    time: "2h ago",
    icon: "settings",
  },
  {
    title: "Copyright Project",
    status: "Not Paid",
    rate: "$10/hour",
    icon: "file",
  },
  {
    title: "Web Design Project",
    status: "Paid",
    rate: "$10/hour",
    icon: "moon",
  },
  
];

const additionalProjects: Project[] = [
  
  {
    title: "UI/UX Design Project",
    status: "Not Paid",
    rate: "$12/hour",
    description: "Creating comprehensive user interface designs and user experience flows for a fintech application.",
    tags: ["Remote", "Part-time"],
    country: "Canada",
    time: "3h ago",
    icon: "palette",
  },
  {
    title: "Database Optimization",
    status: "Paid",
    rate: "$18/hour",
    description: "Optimizing database performance and implementing efficient query structures for large-scale applications.",
    tags: ["Remote", "Contract"],
    country: "UK",
    time: "4h ago",
    icon: "database",
  },
  {
    title: "API Integration Project",
    status: "Not Paid",
    rate: "$14/hour",
    icon: "settings",
  },
  {
    title: "E-commerce Platform",
    status: "Paid",
    rate: "$16/hour",
    icon: "code",
  },
];

const getIcon = (icon: string) => {
  switch (icon) {
    case "settings":
      return <Settings className="w-3 h-3 text-gray-600 dark:text-gray-400" />;
    case "file":
      return <FileText className="w-3 h-3 text-gray-600 dark:text-gray-400" />;
    case "moon":
      return <Moon className="w-3 h-3 text-gray-600 dark:text-gray-400" />;
    case "code":
      return <Code className="w-3 h-3 text-gray-600 dark:text-gray-400" />;
    case "palette":
      return <Palette className="w-3 h-3 text-gray-600 dark:text-gray-400" />;
    case "database":
      return <Database className="w-3 h-3 text-gray-600 dark:text-gray-400" />;
    default:
      return <Settings className="w-3 h-3" />;
  }
};

interface YourRecentProjectsProps {
  highlight?: boolean;
}

const YourRecentProjects = forwardRef<HTMLDivElement, YourRecentProjectsProps>(({ highlight }, ref) => {
  const [expandedProjects, setExpandedProjects] = useState<Set<number>>(new Set([0])); // First project expanded by default
  const [showAllProjects, setShowAllProjects] = useState(false);

  const toggleProject = (index: number) => {
    const newExpanded = new Set(expandedProjects);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedProjects(newExpanded);
  };

  const toggleShowAllProjects = () => {
    setShowAllProjects(!showAllProjects);
  };

  const allProjects = showAllProjects ? [...initialProjects, ...additionalProjects] : initialProjects;

  return (
    <Card
      ref={ref}
      className={`bg-gray-200 dark:bg-gray-800 shadow-xs flex flex-col w-full h-[440px] hover:shadow-xs hover:-translate-y-1 transition-all duration-200 ${highlight ? "ring-2 ring-blue-500 bg-yellow-50 dark:bg-yellow-900/20" : ""}`}
    >
      {/* Move header to the very top of the card */}
      <div className="flex items-center justify-between px-3 pt-0 pb-0 -mt-5">
        <span className="sm:text-xl font-bold text-gray-800 dark:text-gray-100">Your Recent Projects</span>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-xs"
          onClick={toggleShowAllProjects}
        >
          <span className="hidden sm:inline">{showAllProjects ? "Show Less" : "See all Project"}</span>
          <span className="sm:hidden">{showAllProjects ? "Less" : "All"}</span>
          <ArrowUp className={`w-3 h-3 ml-1 transition-transform ${showAllProjects ? 'rotate-180' : ''}`} />
        </Button>
      </div>
      <CardHeader className="sm:px-3 pt-2 flex-shrink-2 hidden" />
      <CardContent className="px-2 sm:px-3 pb-4 flex-1 overflow-y-auto scrollbar-hide">
        <div className="space-y-2 sm:space-y-3">
          {allProjects.map((proj, idx) => (
            <div
              key={idx}
              className="border border-gray-100 dark:border-gray-700 rounded-lg p-2 sm:p-3 space-y-2 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 bg-gray-50/30 dark:bg-gray-700/30"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-100 dark:bg-gray-600 rounded-lg flex items-center justify-center mt-1">
                    {getIcon(proj.icon)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 sm:gap-2 mb-1">
                      <p className="font-medium text-xs text-gray-800 dark:text-gray-100 truncate">{proj.title}</p>
                      <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">{proj.rate}</span>
                    </div>
                    <Badge
                      variant={proj.status === "Paid" ? "default" : "outline"}
                      className={`text-xs ${
                        proj.status === "Paid" 
                          ? "bg-gray-800 dark:bg-gray-700 text-white dark:text-gray-100" 
                          : "border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-600"
                      }`}
                    >
                      {proj.status}
                    </Badge>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="w-5 h-5 p-0"
                  onClick={() => toggleProject(idx)}
                >
                  {expandedProjects.has(idx) ? (
                    <ArrowUp className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                  ) : (
                    <ArrowDown className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                  )}
                </Button>
              </div>
              
              {/* Expandable content */}
              {expandedProjects.has(idx) && proj.description && (
                <p className="text-xs text-gray-500 dark:text-gray-400 ml-11 text-left">
                  {proj.description}
                </p>
              )}
              
              {expandedProjects.has(idx) && proj.tags && (
                <div className="flex flex-wrap gap-2 ml-11">
                  {proj.tags.map((tag, i) => (
                    <Badge 
                      key={i} 
                      variant="outline" 
                      className={`text-xs ${
                        tag === "Remote" 
                          ? "border-red-200 dark:border-red-700 text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20" 
                          : tag === "Part-time"
                          ? "border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                          : "border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-600"
                      }`}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
              
              {expandedProjects.has(idx) && proj.country && (
                <p className="text-xs text-gray-500 dark:text-gray-400 ml-11 text-left">
                  {proj.country} • {proj.time}
                </p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
});

export default YourRecentProjects;
