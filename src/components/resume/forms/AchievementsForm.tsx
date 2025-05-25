
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Lightbulb } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AchievementsFormProps {
  achievements: string[];
  onChange: (achievements: string[]) => void;
}

export function AchievementsForm({ achievements, onChange }: AchievementsFormProps) {
  const { toast } = useToast();

  const addAchievement = () => {
    onChange([...achievements, ""]);
  };

  const removeAchievement = (index: number) => {
    onChange(achievements.filter((_, i) => i !== index));
  };

  const updateAchievement = (index: number, value: string) => {
    const updated = achievements.map((achievement, i) => 
      i === index ? value : achievement
    );
    onChange(updated);
  };

  const generateSuggestions = () => {
    const suggestions = [
      "Increased team productivity by 30% through implementation of agile methodologies and automation tools",
      "Led digital transformation initiative that reduced operational costs by $2M annually",
      "Recognized as Employee of the Year for exceptional leadership and innovative problem-solving",
      "Successfully managed $5M budget and delivered all projects on time and under budget",
      "Improved customer satisfaction scores from 7.2 to 9.1 through strategic service enhancements"
    ];

    onChange(suggestions.slice(0, 3));

    toast({
      title: "Suggestions Applied",
      description: "AI-generated achievements have been added. Feel free to customize them!",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label>Key Achievements</Label>
        <Button onClick={generateSuggestions} variant="outline" size="sm">
          <Lightbulb className="mr-2 h-4 w-4" />
          Get AI Suggestions
        </Button>
      </div>

      {achievements.map((achievement, index) => (
        <div key={index} className="flex gap-2">
          <Textarea
            value={achievement}
            onChange={(e) => updateAchievement(index, e.target.value)}
            placeholder="Quantify your impact with specific numbers and results..."
            rows={2}
            className="flex-1"
          />
          <Button 
            onClick={() => removeAchievement(index)}
            variant="outline"
            size="sm"
            className="shrink-0"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
      
      <Button onClick={addAchievement} variant="outline" className="w-full">
        <Plus className="mr-2 h-4 w-4" />
        Add Achievement
      </Button>
    </div>
  );
}
