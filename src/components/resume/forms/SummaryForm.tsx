
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Lightbulb } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SummaryFormProps {
  summary: string;
  onChange: (summary: string) => void;
}

export function SummaryForm({ summary, onChange }: SummaryFormProps) {
  const { toast } = useToast();

  const generateSuggestion = () => {
    const suggestions = [
      "Results-driven software engineer with 5+ years of experience developing scalable web applications. Proven track record of leading cross-functional teams and delivering high-quality solutions that improve user experience and business outcomes.",
      "Strategic marketing professional with 8+ years of experience driving growth through data-driven campaigns. Expert in digital marketing, brand management, and customer acquisition with a track record of increasing revenue by 40%+.",
      "Experienced project manager with 6+ years of success delivering complex initiatives on time and under budget. Strong leadership skills with expertise in Agile methodologies and stakeholder management.",
      "Senior financial analyst with 7+ years of experience in financial planning, analysis, and reporting. Proven ability to identify cost-saving opportunities and drive strategic decision-making through actionable insights."
    ];
    
    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
    onChange(randomSuggestion);
    
    toast({
      title: "Suggestion Applied",
      description: "AI-generated summary has been added. Feel free to customize it!",
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="summary">Professional Summary</Label>
        <Textarea
          id="summary"
          value={summary}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Write a compelling summary of your professional experience and key achievements..."
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
