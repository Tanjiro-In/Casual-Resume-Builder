
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

interface Internship {
  company: string;
  position: string;
  duration: string;
  description: string;
}

interface InternshipsFormProps {
  internships: Internship[];
  onChange: (internships: Internship[]) => void;
}

export function InternshipsForm({ internships, onChange }: InternshipsFormProps) {
  const addInternship = () => {
    onChange([...internships, { company: "", position: "", duration: "", description: "" }]);
  };

  const removeInternship = (index: number) => {
    onChange(internships.filter((_, i) => i !== index));
  };

  const updateInternship = (index: number, field: keyof Internship, value: string) => {
    const updated = internships.map((internship, i) => 
      i === index ? { ...internship, [field]: value } : internship
    );
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      {internships.map((internship, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="text-lg">Internship {index + 1}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`internship-company-${index}`}>Company *</Label>
                <Input
                  id={`internship-company-${index}`}
                  value={internship.company}
                  onChange={(e) => updateInternship(index, "company", e.target.value)}
                  placeholder="Tech Company Inc."
                />
              </div>
              <div>
                <Label htmlFor={`internship-position-${index}`}>Position *</Label>
                <Input
                  id={`internship-position-${index}`}
                  value={internship.position}
                  onChange={(e) => updateInternship(index, "position", e.target.value)}
                  placeholder="Software Developer Intern"
                />
              </div>
            </div>
            <div>
              <Label htmlFor={`internship-duration-${index}`}>Duration *</Label>
              <Input
                id={`internship-duration-${index}`}
                value={internship.duration}
                onChange={(e) => updateInternship(index, "duration", e.target.value)}
                placeholder="June 2023 - August 2023"
              />
            </div>
            <div>
              <Label htmlFor={`internship-description-${index}`}>Description *</Label>
              <Textarea
                id={`internship-description-${index}`}
                value={internship.description}
                onChange={(e) => updateInternship(index, "description", e.target.value)}
                placeholder="Describe your responsibilities and achievements..."
                rows={3}
              />
            </div>
            <Button 
              onClick={() => removeInternship(index)} 
              variant="destructive" 
              size="sm"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Remove Internship
            </Button>
          </CardContent>
        </Card>
      ))}
      
      <Button onClick={addInternship} variant="outline" className="w-full">
        <Plus className="mr-2 h-4 w-4" />
        Add Internship
      </Button>
    </div>
  );
}
