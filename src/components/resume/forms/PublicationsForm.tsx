
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";

interface PublicationsFormProps {
  publications: string[];
  onChange: (publications: string[]) => void;
}

export function PublicationsForm({ publications, onChange }: PublicationsFormProps) {
  const addPublication = () => {
    onChange([...publications, ""]);
  };

  const removePublication = (index: number) => {
    onChange(publications.filter((_, i) => i !== index));
  };

  const updatePublication = (index: number, value: string) => {
    const updated = publications.map((publication, i) => 
      i === index ? value : publication
    );
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <Label>Publications</Label>

      {publications.map((publication, index) => (
        <div key={index} className="flex gap-2">
          <Input
            value={publication}
            onChange={(e) => updatePublication(index, e.target.value)}
            placeholder="e.g., 'Machine Learning in Healthcare', Journal of Medical AI, 2024"
            className="flex-1"
          />
          <Button 
            onClick={() => removePublication(index)}
            variant="outline"
            size="sm"
            className="shrink-0"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
      
      <Button onClick={addPublication} variant="outline" className="w-full">
        <Plus className="mr-2 h-4 w-4" />
        Add Publication
      </Button>
    </div>
  );
}
