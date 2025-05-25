
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Download } from "lucide-react";

const templates = [
  {
    id: "modern-minimal",
    name: "Modern Minimal",
    description: "Clean and professional design perfect for any industry",
    category: "Professional",
    preview: "/placeholder.svg",
    features: ["ATS-Friendly", "Clean Layout", "Professional"]
  },
  {
    id: "creative-designer",
    name: "Creative Designer",
    description: "Showcase your creativity with this vibrant template",
    category: "Creative",
    preview: "/placeholder.svg",
    features: ["Creative", "Colorful", "Portfolio Focus"]
  },
  {
    id: "tech-professional",
    name: "Tech Professional",
    description: "Perfect for software engineers and tech professionals",
    category: "Technology",
    preview: "/placeholder.svg",
    features: ["Tech-Focused", "Skills Emphasis", "Project Showcase"]
  },
  {
    id: "academic-researcher",
    name: "Academic & Research",
    description: "Ideal for academics, researchers, and scientists",
    category: "Academic",
    preview: "/placeholder.svg",
    features: ["Publication Focus", "Research Oriented", "Academic Style"]
  },
  {
    id: "executive-leader",
    name: "Executive Leader",
    description: "Sophisticated design for senior executives",
    category: "Executive",
    preview: "/placeholder.svg",
    features: ["Leadership Focus", "Achievement Oriented", "Premium Design"]
  },
  {
    id: "fresher-graduate",
    name: "Fresher Graduate",
    description: "Perfect for new graduates and entry-level positions",
    category: "Entry Level",
    preview: "/placeholder.svg",
    features: ["Education Focus", "Skills Highlight", "Project Emphasis"]
  }
];

const Templates = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Resume Templates</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Choose from our collection of professional, ATS-friendly templates
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <Card key={template.id} className="group hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="relative">
                  <img 
                    src={template.preview} 
                    alt={template.name}
                    className="w-full h-48 object-cover rounded-lg bg-gray-100 dark:bg-gray-800"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                    <Button size="sm" variant="secondary">
                      <Eye className="mr-2 h-4 w-4" />
                      Preview
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{template.name}</CardTitle>
                  <Badge variant="outline">{template.category}</Badge>
                </div>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {template.features.map((feature) => (
                    <Badge key={feature} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1">
                    Use Template
                  </Button>
                  <Button size="icon" variant="outline">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Templates;
