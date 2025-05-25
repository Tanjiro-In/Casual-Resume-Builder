
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Lightbulb } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ObjectiveFormProps {
  objective: string;
  onChange: (objective: string) => void;
}

export function ObjectiveForm({ objective, onChange }: ObjectiveFormProps) {
  const { toast } = useToast();

  const generateSuggestion = () => {
    const suggestions = [
      "Recent computer science graduate seeking an entry-level software developer position to apply programming skills and contribute to innovative projects while growing professionally.",
      "Motivated engineering graduate with strong analytical skills seeking a challenging role in product development to leverage technical knowledge and problem-solving abilities.",
      "Enthusiastic marketing graduate looking to begin career in digital marketing, bringing fresh perspectives and eagerness to learn in a dynamic environment.",
      "Detail-oriented business administration graduate seeking an entry-level analyst position to apply analytical skills and contribute to data-driven decision making."
    ];
    
    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
    onChange(randomSuggestion);
    
    toast({
      title: "Suggestion Applied",
      description: "AI-generated objective has been added. Feel free to customize it!",
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="objective">Career Objective</Label>
        <Textarea
          id="objective"
          value={objective}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Write a brief statement about your career goals and what you hope to achieve..."
          rows={4}
          className="mt-2"
        />
      </div>
      <Button onClick={generateSuggestion} variant="outline" size="sm">
        <Lightbulb className="mr-2 h-4 w-4" />
        Get AI Suggestion
      </Button>
    </div>
  );
}
