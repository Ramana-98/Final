import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"
import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";


interface Project {
  title: string
  rate: string
  status: "Paid" | "Not Paid"
  type: string
  mode: string
  country: string
  timeAgo: string
  description?: string; // Added for new accordion
}

const projects: Project[] = [
  {
    title: "Web Development Project",
    rate: "$10/hour",
    status: "Paid",
    type: "Remote",
    mode: "Part-time",
    country: "Germany",
    timeAgo: "2h ago",
    description: "Developing a new website for a client in Germany.",
  },
  {
    title: "Copyright Project",
    rate: "$10/hour",
    status: "Not Paid",
    type: "Remote",
    mode: "Contract",
    country: "India",
    timeAgo: "5h ago",
    description: "Creating a comprehensive copyright protection strategy for a startup in India.",
  },
  {
    title: "Web Design Project",
    rate: "$10/hour",
    status: "Paid",
    type: "Remote",
    mode: "Freelance",
    country: "UK",
    timeAgo: "1d ago",
    description: "Designing a modern and user-friendly website for a UK-based e-commerce company.",
  },
  {
    title: "UI/UX Design Project",
    rate: "$12/hour",
    status: "Not Paid",
    type: "Remote",
    mode: "Part-time",
    country: "Canada",
    timeAgo: "3h ago",
    description: "Conducting user research and designing wireframes for a Canadian fintech startup.",
  },
  {
    title: "Database Optimization",
    rate: "$18/hour",
    status: "Paid",
    type: "Remote",
    mode: "Contract",
    country: "UK",
    timeAgo: "4h ago",
    description: "Optimizing the database structure and performance for a UK-based SaaS company.",
  },
  {
    title: "API Integration Project",
    rate: "$14/hour",
    status: "Not Paid",
    type: "Remote",
    mode: "Freelance",
    country: "UK",
    timeAgo: "4h ago",
    description: "Integrating multiple APIs for a UK-based logistics platform.",
  },
  {
    title: "E-commerce Platform",
    rate: "$16/hour",
    status: "Paid",
    type: "Remote",
    mode: "Freelance",
    country: "UK",
    timeAgo: "4h ago",
    description: "Building a robust e-commerce platform for a UK-based fashion retailer.",
  }
]
  



interface ProjectsPageProps {
  onBack: () => void;
}

export default function ProjectsPage({ onBack }: ProjectsPageProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectStatus, setProjectStatus] = useState(
    projects.map((p) => p.status === "Paid")
  );
  const [projectNote, setProjectNote] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 3;
  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const paginatedProjects = projects.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );

  // Function to get gradient class based on project status and mode
  const getGradientClass = (isPaid: boolean, mode: string) => {
    if (isPaid) {
      return "bg-gradient-to-br from-[#f0fdf4] to-[#e1faea] hover:from-[#dcfce7] hover:to-[#bbf7d0] dark:from-green-200/30 dark:to-green-800/30 dark:hover:from-green-800/40 dark:hover:to-green-700/40";
    } else {
      if (mode === "Contract" || mode === "Freelance") {
        return "bg-gradient-to-br from-[#f3f7fd] to-[#e0ecfb] hover:from-[#dbeafe] hover:to-[#bfdbfe] dark:from-blue-200/30 dark:to-blue-800/30 dark:hover:from-blue-800/40 dark:hover:to-blue-700/40";
      } else {
        return "bg-gradient-to-br from-[#fdf4f5] to-[#f3eaea] hover:from-[#fce7f3] hover:to-[#fbcfe8] dark:from-blue-900/30 dark:to-blue-800/30 dark:hover:from-blue-800/40 dark:hover:to-blue-700/40";
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 dark:bg-gray-900 px-4 md:px-8 py-6 space-y-6 transition-colors duration-200">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-sm font-medium shadow-sm border border-gray-200 dark:border-gray-700 transition-colors text-gray-900 dark:text-gray-100"
        >
          ← Back
        </button>
        <h1 className="text-3xl font-bold m-0 text-gray-800 dark:text-gray-100">Your Projects</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {paginatedProjects.map((project, i) => {
          const isPaid = projectStatus[i];
          const gradientClass = getGradientClass(isPaid, project.mode);
          
          return (
            <Card 
              key={i} 
              className={`rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 ${gradientClass}`}
            >
              <CardHeader className="pb-1">
                <CardTitle className="flex justify-between items-start text-sm font-semibold text-gray-800 dark:text-gray-100">
                  <span className="line-clamp-2">{project.title}</span>
                  <Badge
                    variant={isPaid ? "default" : "secondary"}
                    className={`${
                      isPaid 
                        ? "bg-green-500 text-white shadow-sm dark:bg-green-600" 
                        : "bg-gray-300 text-gray-700 shadow-sm dark:bg-gray-600 dark:text-gray-300"
                    } font-medium text-xs`}
                  >
                    {isPaid ? "Paid" : "Not Paid"}
                  </Badge>
                </CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Switch
                    checked={isPaid}
                    onCheckedChange={(checked) => {
                      setProjectStatus((prev) =>
                        prev.map((val, idx) => (idx === i ? checked : val))
                      );
                    }}
                    id={`switch-${i}`}
                  />
                  <label htmlFor={`switch-${i}`} className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                    {isPaid ? "Paid" : "Not Paid"}
                  </label>
                </div>
                <p className="text-sm font-bold text-gray-700 dark:text-gray-300 mt-1">{project.rate}</p>
              </CardHeader>
              <CardContent className="text-xs text-gray-600 dark:text-gray-400 space-y-1 pt-0">
                <div className="flex flex-wrap gap-1">
                  {(() => {
                    let typeClass = "border-gray-200 text-gray-600 bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:bg-gray-700";
                    if (project.type === "Remote") typeClass = "border-red-200 text-red-700 bg-red-50 dark:border-red-600 dark:text-red-400 dark:bg-red-900/20";
                    else if (project.type === "Contract") typeClass = "border-teal-200 text-teal-700 bg-teal-50 dark:border-teal-600 dark:text-teal-400 dark:bg-teal-900/20";
                    return (
                      <Badge variant="outline" className={`${typeClass} font-medium text-xs`}>
                        {project.type}
                      </Badge>
                    );
                  })()}
                  {(() => {
                    let modeClass = "border-gray-200 text-gray-600 bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:bg-gray-700";
                    if (project.mode === "Part-time") modeClass = "border-blue-200 text-blue-700 bg-blue-50 dark:border-blue-600 dark:text-blue-400 dark:bg-blue-900/20";
                    else if (project.mode === "Freelance") modeClass = "border-yellow-200 text-yellow-700 bg-yellow-50 dark:border-yellow-600 dark:text-yellow-400 dark:bg-yellow-900/20";
                    else if (project.mode === "Contract") modeClass = "border-teal-200 text-teal-700 bg-teal-50 dark:border-teal-600 dark:text-teal-400 dark:bg-teal-900/20";
                    return (
                      <Badge variant="outline" className={`${modeClass} font-medium text-xs`}>
                        {project.mode}
                      </Badge>
                    );
                  })()}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  {project.country} · {project.timeAgo}
                </p>
                <Button
                  variant="ghost"
                  className="mt-1 p-0 text-xs text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1 font-medium dark:text-blue-400 dark:hover:text-blue-300"
                  onClick={() => setSelectedProject(project)}
                >
                  View Details <ArrowUpRight className="w-3 h-3" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-2 mt-8">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-lg border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100"
        >
          Previous
        </Button>
        {Array.from({ length: totalPages }, (_, idx) => (
          <Button
            key={idx + 1}
            variant={currentPage === idx + 1 ? "default" : "outline"}
            size="sm"
            onClick={() => setCurrentPage(idx + 1)}
            className={`px-4 py-2 rounded-lg ${
              currentPage === idx + 1 
                ? "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600" 
                : "border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100"
            }`}
          >
            {idx + 1}
          </Button>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded-lg border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100"
        >
          Next
        </Button>
      </div>
      
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 w-full max-w-md relative mx-4">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-xl font-bold"
              onClick={() => setSelectedProject(null)}
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">{selectedProject.title}</h2>
            <div className="space-y-2 text-sm">
              <p className="flex justify-between text-gray-900 dark:text-gray-100"><b>Rate:</b> <span className="font-semibold text-gray-700 dark:text-gray-300">{selectedProject.rate}</span></p>
              <p className="flex justify-between text-gray-900 dark:text-gray-100"><b>Status:</b> <span className="font-semibold text-gray-700 dark:text-gray-300">{selectedProject.status}</span></p>
              <p className="flex justify-between text-gray-900 dark:text-gray-100"><b>Type:</b> <span className="font-semibold text-gray-700 dark:text-gray-300">{selectedProject.type}</span></p>
              <p className="flex justify-between text-gray-900 dark:text-gray-100"><b>Mode:</b> <span className="font-semibold text-gray-700 dark:text-gray-300">{selectedProject.mode}</span></p>
              <p className="flex justify-between text-gray-900 dark:text-gray-100"><b>Country:</b> <span className="font-semibold text-gray-700 dark:text-gray-300">{selectedProject.country}</span></p>
              <p className="flex justify-between text-gray-900 dark:text-gray-100"><b>Posted:</b> <span className="font-semibold text-gray-700 dark:text-gray-300">{selectedProject.timeAgo}</span></p>
            </div>
            {/* Feedback/Notes Textarea */}
            <div className="mt-6">
              <label htmlFor="project-note" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Notes / Feedback</label>
              <Textarea
                id="project-note"
                placeholder="Add notes, feedback, or comments about this project..."
                value={projectNote}
                onChange={e => setProjectNote(e.target.value)}
                className="w-full min-h-[80px] rounded-lg border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              <Button
                className="mt-3 w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg font-medium"
                onClick={() => {
                  toast("Note saved!");
                  setProjectNote("");
                }}
                disabled={!projectNote.trim()}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
