
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Lightbulb } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Project {
  title: string;
  description: string;
  technologies: string;
  link: string;
}

interface ProjectsFormWithAIProps {
  projects: Project[];
  onChange: (projects: Project[]) => void;
}

export function ProjectsFormWithAI({ projects, onChange }: ProjectsFormWithAIProps) {
  const { toast } = useToast();

  const addProject = () => {
    onChange([...projects, { 
      title: "", 
      description: "", 
      technologies: "", 
      link: "" 
    }]);
  };

  const removeProject = (index: number) => {
    onChange(projects.filter((_, i) => i !== index));
  };

  const updateProject = (index: number, field: keyof Project, value: string) => {
    const updated = projects.map((project, i) => 
      i === index ? { ...project, [field]: value } : project
    );
    onChange(updated);
  };

  const generateProjectSuggestions = (projectIndex: number) => {
    const suggestions = [
      {
        title: "Personal Portfolio Website",
        description: "Developed a responsive personal portfolio website using React and TypeScript. Implemented modern UI/UX design principles with smooth animations and mobile-first approach. Integrated contact form with email functionality and showcased projects with detailed case studies.",
        technologies: "React, TypeScript, Tailwind CSS, Framer Motion, Vercel",
        link: "https://github.com/username/portfolio"
      },
      {
        title: "Task Management Application",
        description: "Built a full-stack task management application with user authentication, real-time updates, and collaborative features. Implemented drag-and-drop functionality, priority levels, and deadline tracking. Optimized performance for handling large datasets.",
        technologies: "Next.js, Node.js, MongoDB, Socket.io, JWT",
        link: "https://github.com/username/task-manager"
      },
      {
        title: "E-commerce Product Catalog",
        description: "Created a dynamic e-commerce product catalog with search functionality, filtering options, and shopping cart integration. Implemented responsive design and optimized loading times through lazy loading and image optimization.",
        technologies: "Vue.js, Express.js, PostgreSQL, Stripe API, AWS S3",
        link: "https://github.com/username/ecommerce-catalog"
      }
    ];

    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
    const updated = [...projects];
    updated[projectIndex] = randomSuggestion;
    onChange(updated);

    toast({
      title: "AI Suggestion Applied",
      description: "A sample project has been generated. Feel free to customize it!",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Projects</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {projects.map((project, index) => (
          <Card key={index} className="border-l-4 border-l-blue-500">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Project {index + 1}</CardTitle>
                <Button 
                  onClick={() => generateProjectSuggestions(index)} 
                  variant="outline" 
                  size="sm"
                >
                  <Lightbulb className="mr-2 h-4 w-4" />
                  AI Suggestions
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`project-title-${index}`}>Project Title *</Label>
                  <Input
                    id={`project-title-${index}`}
                    value={project.title}
                    onChange={(e) => updateProject(index, "title", e.target.value)}
                    placeholder="Personal Portfolio Website"
                  />
                </div>
                <div>
                  <Label htmlFor={`project-link-${index}`}>Project Link</Label>
                  <Input
                    id={`project-link-${index}`}
                    value={project.link}
                    onChange={(e) => updateProject(index, "link", e.target.value)}
                    placeholder="https://github.com/username/project"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor={`project-technologies-${index}`}>Technologies Used *</Label>
                <Input
                  id={`project-technologies-${index}`}
                  value={project.technologies}
                  onChange={(e) => updateProject(index, "technologies", e.target.value)}
                  placeholder="React, TypeScript, Node.js, MongoDB"
                />
              </div>

              <div>
                <Label htmlFor={`project-description-${index}`}>Project Description *</Label>
                <Textarea
                  id={`project-description-${index}`}
                  value={project.description}
                  onChange={(e) => updateProject(index, "description", e.target.value)}
                  placeholder="Describe your project, the problem it solves, and your role in development..."
                  rows={4}
                />
              </div>

              <Button 
                onClick={() => removeProject(index)} 
                variant="destructive" 
                size="sm"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Remove Project
              </Button>
            </CardContent>
          </Card>
        ))}
        
        <Button onClick={addProject} variant="outline" className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          Add Project
        </Button>
      </CardContent>
    </Card>
  );
}
