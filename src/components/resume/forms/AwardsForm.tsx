
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";

interface AwardsFormProps {
  awards: string[];
  onChange: (awards: string[]) => void;
}

export function AwardsForm({ awards, onChange }: AwardsFormProps) {
  const addAward = () => {
    onChange([...awards, ""]);
  };

  const removeAward = (index: number) => {
    onChange(awards.filter((_, i) => i !== index));
  };

  const updateAward = (index: number, value: string) => {
    const updated = awards.map((award, i) => 
      i === index ? value : award
    );
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <Label>Awards & Recognition</Label>

      {awards.map((award, index) => (
        <div key={index} className="flex gap-2">
          <Input
            value={award}
            onChange={(e) => updateAward(index, e.target.value)}
            placeholder="e.g., Employee of the Year 2023, Excellence in Innovation Award"
            className="flex-1"
          />
          <Button 
            onClick={() => removeAward(index)}
            variant="outline"
            size="sm"
            className="shrink-0"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
      
      <Button onClick={addAward} variant="outline" className="w-full">
        <Plus className="mr-2 h-4 w-4" />
        Add Award
      </Button>
    </div>
  );
}
