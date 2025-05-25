
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

interface Education {
  degree: string;
  institution: string;
  year: string;
  gpa?: string;
}

interface EducationFormProps {
  education: Education[];
  onChange: (education: Education[]) => void;
}

export function EducationForm({ education, onChange }: EducationFormProps) {
  const addEducation = () => {
    onChange([...education, { degree: "", institution: "", year: "", gpa: "" }]);
  };

  const removeEducation = (index: number) => {
    onChange(education.filter((_, i) => i !== index));
  };

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    const updated = education.map((edu, i) => 
      i === index ? { ...edu, [field]: value } : edu
    );
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      {education.map((edu, index) => (
        <Card key={index}>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor={`degree-${index}`}>Degree *</Label>
                <Input
                  id={`degree-${index}`}
                  value={edu.degree}
                  onChange={(e) => updateEducation(index, "degree", e.target.value)}
                  placeholder="Bachelor of Science in Computer Science"
                />
              </div>
              <div>
                <Label htmlFor={`institution-${index}`}>Institution *</Label>
                <Input
                  id={`institution-${index}`}
                  value={edu.institution}
                  onChange={(e) => updateEducation(index, "institution", e.target.value)}
                  placeholder="University Name"
                />
              </div>
              <div>
                <Label htmlFor={`year-${index}`}>Graduation Year *</Label>
                <Input
                  id={`year-${index}`}
                  value={edu.year}
                  onChange={(e) => updateEducation(index, "year", e.target.value)}
                  placeholder="2024"
                />
              </div>
              <div>
                <Label htmlFor={`gpa-${index}`}>GPA (Optional)</Label>
                <Input
                  id={`gpa-${index}`}
                  value={edu.gpa || ""}
                  onChange={(e) => updateEducation(index, "gpa", e.target.value)}
                  placeholder="3.8/4.0"
                />
              </div>
            </div>
            <Button 
              onClick={() => removeEducation(index)} 
              variant="destructive" 
              size="sm"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Remove
            </Button>
          </CardContent>
        </Card>
      ))}
      
      <Button onClick={addEducation} variant="outline" className="w-full">
        <Plus className="mr-2 h-4 w-4" />
        Add Education
      </Button>
    </div>
  );
}
