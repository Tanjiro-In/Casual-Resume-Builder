
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Lightbulb } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Experience {
  company: string;
  position: string;
  duration: string;
  location: string;
  description: string[];
}

interface ExperienceFormProps {
  experience: Experience[];
  onChange: (experience: Experience[]) => void;
}

export function ExperienceForm({ experience, onChange }: ExperienceFormProps) {
  const { toast } = useToast();

  const addExperience = () => {
    onChange([...experience, { 
      company: "", 
      position: "", 
      duration: "", 
      location: "", 
      description: [""] 
    }]);
  };

  const removeExperience = (index: number) => {
    onChange(experience.filter((_, i) => i !== index));
  };

  const updateExperience = (index: number, field: keyof Experience, value: string | string[]) => {
    const updated = experience.map((exp, i) => 
      i === index ? { ...exp, [field]: value } : exp
    );
    onChange(updated);
  };

  const addDescriptionPoint = (expIndex: number) => {
    const updated = [...experience];
    updated[expIndex].description.push("");
    onChange(updated);
  };

  const removeDescriptionPoint = (expIndex: number, descIndex: number) => {
    const updated = [...experience];
    updated[expIndex].description = updated[expIndex].description.filter((_, i) => i !== descIndex);
    onChange(updated);
  };

  const updateDescriptionPoint = (expIndex: number, descIndex: number, value: string) => {
    const updated = [...experience];
    updated[expIndex].description[descIndex] = value;
    onChange(updated);
  };

  const generateSuggestions = (expIndex: number) => {
    const suggestions = [
      "Led cross-functional team of 8 developers to deliver high-impact features, resulting in 25% increase in user engagement",
      "Implemented automated testing framework that reduced bug reports by 40% and improved deployment efficiency",
      "Collaborated with product managers and designers to define requirements and deliver user-centric solutions",
      "Optimized database queries and system architecture, improving application performance by 60%",
      "Mentored junior developers and established coding best practices across the development team"
    ];

    const updated = [...experience];
    updated[expIndex].description = suggestions.slice(0, 3);
    onChange(updated);

    toast({
      title: "Suggestions Applied",
      description: "AI-generated descriptions have been added. Feel free to customize them!",
    });
  };

  return (
    <div className="space-y-4">
      {experience.map((exp, expIndex) => (
        <Card key={expIndex}>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Experience {expIndex + 1}</CardTitle>
              <Button 
                onClick={() => generateSuggestions(expIndex)} 
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
                <Label htmlFor={`exp-company-${expIndex}`}>Company *</Label>
                <Input
                  id={`exp-company-${expIndex}`}
                  value={exp.company}
                  onChange={(e) => updateExperience(expIndex, "company", e.target.value)}
                  placeholder="Google Inc."
                />
              </div>
              <div>
                <Label htmlFor={`exp-position-${expIndex}`}>Position *</Label>
                <Input
                  id={`exp-position-${expIndex}`}
                  value={exp.position}
                  onChange={(e) => updateExperience(expIndex, "position", e.target.value)}
                  placeholder="Senior Software Engineer"
                />
              </div>
              <div>
                <Label htmlFor={`exp-duration-${expIndex}`}>Duration *</Label>
                <Input
                  id={`exp-duration-${expIndex}`}
                  value={exp.duration}
                  onChange={(e) => updateExperience(expIndex, "duration", e.target.value)}
                  placeholder="Jan 2022 - Present"
                />
              </div>
              <div>
                <Label htmlFor={`exp-location-${expIndex}`}>Location</Label>
                <Input
                  id={`exp-location-${expIndex}`}
                  value={exp.location}
                  onChange={(e) => updateExperience(expIndex, "location", e.target.value)}
                  placeholder="San Francisco, CA"
                />
              </div>
            </div>

            <div>
              <Label>Key Responsibilities & Achievements</Label>
              <div className="space-y-2 mt-2">
                {exp.description.map((desc, descIndex) => (
                  <div key={descIndex} className="flex gap-2">
                    <Textarea
                      value={desc}
                      onChange={(e) => updateDescriptionPoint(expIndex, descIndex, e.target.value)}
                      placeholder="Start with an action verb (Led, Implemented, Developed...)"
                      rows={2}
                      className="flex-1"
                    />
                    <Button 
                      onClick={() => removeDescriptionPoint(expIndex, descIndex)}
                      variant="outline"
                      size="sm"
                      className="shrink-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button 
                  onClick={() => addDescriptionPoint(expIndex)} 
                  variant="outline" 
                  size="sm"
                  className="w-full"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Description Point
                </Button>
              </div>
            </div>

            <Button 
              onClick={() => removeExperience(expIndex)} 
              variant="destructive" 
              size="sm"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Remove Experience
            </Button>
          </CardContent>
        </Card>
      ))}
      
      <Button onClick={addExperience} variant="outline" className="w-full">
        <Plus className="mr-2 h-4 w-4" />
        Add Work Experience
      </Button>
    </div>
  );
}
