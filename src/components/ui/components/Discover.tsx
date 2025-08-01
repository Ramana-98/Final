import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Heart } from "lucide-react";
import { Carousel, CarouselItem, CarouselContent, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import axios from "axios";
import { useEffect } from "react";

type DiscoverProps = {
  onBack?: () => void;
};

// Example data
const categories = ["All", "Web Dev", "Design", "Writing", "Marketing"];
const projects = [
  {
    id: 1,
    title: "Frontend Dashboard for SaaS App",
    budget: "$800 - $1200",
    type: "Remote",
    skills: ["React", "Tailwind", "API"],
    client: { name: "Acme Corp", location: "USA", rating: 4.8 },
    posted: "3 hours ago",
    featured: true,
    category: "Web Dev",
  },
  {
    id: 2,
    title: "Mobile App UI Redesign",
    budget: "$500 - $900",
    type: "Remote",
    skills: ["Figma", "UI/UX", "Mobile"],
    client: { name: "Designify", location: "UK", rating: 4.6 },
    posted: "1 hour ago",
    featured: true,
    category: "Design",
  },
  {
    id: 3,
    title: "Content Writing for Blog",
    budget: "$100 - $200",
    type: "Part-time",
    skills: ["Writing", "SEO", "Blogging"],
    client: { name: "BlogPro", location: "Canada", rating: 4.9 },
    posted: "30 minutes ago",
    featured: false,
    category: "Writing",
  },
  {
    id: 4,
    title: "Backend API Integration",
    budget: "$600 - $1000",
    type: "Remote",
    skills: ["Node.js", "Express", "MongoDB"],
    client: { name: "API Masters", location: "Germany", rating: 4.7 },
    posted: "2 hours ago",
    featured: false,
    category: "Web Dev",
  },
  {
    id: 5,
    title: "Logo Design for Startup",
    budget: "$50 - $150",
    type: "Remote",
    skills: ["Logo", "Branding", "Illustrator"],
    client: { name: "Startify", location: "India", rating: 4.5 },
    posted: "10 minutes ago",
    featured: true,
    category: "Design",
  },
  {
    id: 6,
    title: "Marketing Campaign Manager",
    budget: "$1200 - $2000",
    type: "Full-time",
    skills: ["Marketing", "Campaigns", "Analytics"],
    client: { name: "MarketGenius", location: "Australia", rating: 4.4 },
    posted: "4 hours ago",
    featured: false,
    category: "Marketing",
  },
  {
    id: 7,
    title: "WordPress Site Migration",
    budget: "$300 - $500",
    type: "Remote",
    skills: ["WordPress", "Migration", "Hosting"],
    client: { name: "WP Experts", location: "USA", rating: 4.8 },
    posted: "5 hours ago",
    featured: false,
    category: "Web Dev",
  },
  {
    id: 8,
    title: "Social Media Content Creator",
    budget: "$400 - $700",
    type: "Part-time",
    skills: ["Social Media", "Content", "Photoshop"],
    client: { name: "Socially", location: "France", rating: 4.6 },
    posted: "1 day ago",
    featured: false,
    category: "Marketing",
  },
];

const carouselItems = [
  {
    title: "Trending: Frontend Dashboard for SaaS App",
    description: "High demand for React/Tailwind developers!",
  },
  {
    title: "Recommended: Design Projects",
    description: "UI/UX and branding projects are hot right now.",
  },
  {
    title: "Spotlight: Jane Smith",
    description: "Top-rated freelancer in Web Development.",
  },
];

const gradients = [
  "bg-gradient-to-r from-blue-100 to-blue-300",
  "bg-gradient-to-r from-pink-100 to-pink-300",
  "bg-gradient-to-r from-green-100 to-green-300",
  // ...add as many as you have carousel items
];

const darkGradients = [
  "dark:from-blue-800 dark:to-blue-600",
  "dark:from-purple-800 dark:to-purple-600", 
  "dark:from-emerald-800 dark:to-emerald-600",
  // ...add as many as you have carousel items
];

export default function Discover({ onBack }: DiscoverProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [savedProjects, setSavedProjects] = useState<Set<string | number>>(() => {
    // Load from localStorage if available
    const saved = localStorage.getItem("savedProjects");
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  // Sync savedProjects to localStorage
  useEffect(() => {
    localStorage.setItem("savedProjects", JSON.stringify(Array.from(savedProjects)));
  }, [savedProjects]);

  // Filter logic here...
  const filteredProjects = projects.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase())
    && (activeCategory === "All" || p.category === activeCategory)
  );

  const featuredProjects = filteredProjects.filter(p => p.featured);
  const regularProjects = filteredProjects.filter(p => !p.featured);

  // Handler to open dialog
  const handleApply = (project: Project) => {
    setSelectedProject(project);
    setDialogOpen(true);
  };

  // Toggle save/unsave
  const handleToggleSave = async (project: Project) => {
    const isSaved = savedProjects.has(project.id);
    const updated = new Set(savedProjects);
    if (isSaved) {
      updated.delete(project.id);
      setSavedProjects(updated);
      toast("Removed from favorites");
      // Optionally notify backend
      // await axios.post("/api/unsave", { projectId: project.id });
    } else {
      updated.add(project.id);
      setSavedProjects(updated);
      toast.success("Project saved to favorites");
      // Optionally notify backend
      // await axios.post("/api/save", { projectId: project.id });
    }
  };

  // Handle form field changes
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Show submitting toast with current time
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    const toastId = toast.loading(`Submitting... (${timeString})`);

    try {
      // Replace with your API endpoint
      await axios.post("/api/apply", {
        projectId: selectedProject?.id,
        projectTitle: selectedProject?.title,
        ...form,
      });
      toast.success("Application submitted successfully!", { id: toastId });
      setDialogOpen(false);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      toast.error("Failed to submit application.", { id: toastId });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-2 sm:p-4 md:p-6 bg-gray-200 dark:bg-gray-900 min-h-screen transition-colors duration-200">
      {/* Dialog Modal for Apply Now */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-gray-100">Apply for Project</DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              {selectedProject ? selectedProject.title : ""}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-gray-900 dark:text-gray-100">Name</Label>
              <Input
                id="name"
                name="name"
                value={form.name}
                onChange={handleFormChange}
                required
                className="mt-1 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-gray-900 dark:text-gray-100">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleFormChange}
                required
                className="mt-1 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <Label htmlFor="message" className="text-gray-900 dark:text-gray-100">Message</Label>
              <Textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleFormChange}
                required
                className="mt-1 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                rows={4}
                placeholder="Write a cover letter..."
              />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={submitting} className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                {submitting ? "Submitting..." : "Submit Application"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <Carousel className="w-full max-w-2xl mx-auto mb-8 relative">
        {/* Add extra horizontal padding to make space for arrows */}
        <div className="relative px-10">
          <CarouselContent>
            {carouselItems.map((item, idx) => (
              <CarouselItem key={idx} >
                <div className={`rounded-xl p-4 shadow-xs ${gradients[idx]} ${darkGradients[idx]}`}>
                  <h3 className="font-bold text-lg mb-1 text-gray-900 dark:text-gray-100">{item.title}</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{item.description}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100" />
          <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100" />
        </div>
      </Carousel>
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 mb-6">
        <div className="flex items-center gap-2">
          <button
            className="back-btn"
            onClick={onBack}
            aria-label="Back to Dashboard"
            style={{
              background: "#1a202c",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "8px 12px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              marginRight: "8px"
            }}
          >
            ←
          </button>
          <div className="relative flex-1 min-w-[120px]">
            <Input
              placeholder="Search projects..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>
        </div>
        <div className="flex gap-2 flex-wrap justify-start sm:justify-end">
          {categories.map(cat => (
            <Button
              key={cat}
              variant={activeCategory === cat ? "default" : "outline"}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs ${
                activeCategory === cat 
                  ? "bg-blue-600 dark:bg-blue-500 text-white" 
                  : "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
              }`}
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      {/* Featured Projects */}
      <div className="mb-8 ">
        <h2 className="text-lg font-bold mb-3 flex items-center gap-2 text-gray-900 dark:text-gray-100">
          <span role="img" aria-label="star">⭐</span> Featured Projects
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {featuredProjects.length === 0 ? (
            <div className="col-span-2 text-center text-gray-500 dark:text-gray-400 py-8">Not Found</div>
          ) : (
            featuredProjects.map(project => (
              <ProjectCard
                key={project.id}
                project={project}
                onApply={handleApply}
                isSaved={savedProjects.has(project.id)}
                onToggleSave={handleToggleSave}
              />
            ))
          )}
        </div>
      </div>

      {/* Project Listings */}
      <h2 className="text-lg font-bold mb-3 flex items-center gap-2 text-gray-900 dark:text-gray-100">
        <span role="img" aria-label="clipboard">📋</span> Project Listings
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {regularProjects.length === 0 ? (
          <div className="col-span-2 text-center text-gray-500 dark:text-gray-400 py-8">Not Found</div>
        ) : (
          regularProjects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onApply={handleApply}
              isSaved={savedProjects.has(project.id)}
              onToggleSave={handleToggleSave}
            />
          ))
        )}
      </div>
    </div>
  );
}

type Project = {
  id: string | number;
  title: string;
  featured?: boolean;
  skills: string[];
  type: string;
  budget: string;
  client: {
    name: string;
    location: string;
    rating: number | string;
  };
  posted: string;
  category: string;
};

function ProjectCard({ project, onApply, isSaved, onToggleSave }: {
  project: Project;
  onApply?: (project: Project) => void;
  isSaved?: boolean;
  onToggleSave?: (project: Project) => void;
}) {
  return (
    <div className="bg-gradient-to-br from-white via-[#f7f9fc] to-[#eaf1fb] rounded-lg shadow p-4 flex flex-col gap-2 border hover:shadow-lg transition dark:from-gray-800 dark:to-gray-700 dark:border-gray-600">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-base text-gray-900 dark:text-gray-200">{project.title}</h3>
        {project.featured && <Badge className="bg-yellow-400 text-black">Featured</Badge>}
      </div>
      <div className="flex gap-2 flex-wrap">
        {project.skills.map(skill => (
          <Badge key={skill} className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">{skill}</Badge>
        ))}
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-600">{project.type} • {project.budget}</div>
      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-600">
        <span>{project.client.name} ({project.client.location})</span>
        <span className="flex items-center gap-1">
          <Star className="w-3 h-3 text-yellow-400" />
          {project.client.rating}
        </span>
        <span>• {project.posted}</span>
      </div>
      <div className="flex gap-2 mt-2">
        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600" onClick={() => onApply && onApply(project)}>
          📝 Apply Now
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => onToggleSave && onToggleSave(project)}
          aria-pressed={isSaved}
          className="bg-gradient-to-r from-blue-500 to-green-400 hover:from-pink-500 hover:to-yellow-500 text-white dark:from-blue-600 dark:to-green-400 dark:hover:from-pink-500 dark:hover:to-yellow-500"
        >
          {isSaved ? (
            <Heart className="w-4 h-4 fill-red-500 text-red-500" />
          ) : (
            <Heart className="w-4 h-4" />
          )}
          {isSaved ? "Saved" : "Save"}
        </Button>
      </div>
    </div>
  );
}
