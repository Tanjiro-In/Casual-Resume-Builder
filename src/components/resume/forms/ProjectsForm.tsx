
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

interface Project {
  title: string;
  description: string;
  technologies: string;
  link: string;
}

interface ProjectsFormProps {
  projects: Project[];
  onChange: (projects: Project[]) => void;
}

export function ProjectsForm({ projects, onChange }: ProjectsFormProps) {
  const addProject = () => {
    onChange([...projects, { title: "", description: "", technologies: "", link: "" }]);
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

  return (
    <div className="space-y-4">
      {projects.map((project, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="text-lg">Project {index + 1}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`project-title-${index}`}>Project Title *</Label>
                <Input
                  id={`project-title-${index}`}
                  value={project.title}
                  onChange={(e) => updateProject(index, "title", e.target.value)}
                  placeholder="E-commerce Website"
                />
              </div>
              <div>
                <Label htmlFor={`project-technologies-${index}`}>Technologies Used *</Label>
                <Input
                  id={`project-technologies-${index}`}
                  value={project.technologies}
                  onChange={(e) => updateProject(index, "technologies", e.target.value)}
                  placeholder="React, Node.js, MongoDB"
                />
              </div>
            </div>
            <div>
              <Label htmlFor={`project-description-${index}`}>Description *</Label>
              <Textarea
                id={`project-description-${index}`}
                value={project.description}
                onChange={(e) => updateProject(index, "description", e.target.value)}
                placeholder="Describe what you built and your key contributions..."
                rows={3}
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
    </div>
  );
}
