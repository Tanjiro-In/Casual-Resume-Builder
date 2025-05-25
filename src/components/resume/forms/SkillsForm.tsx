
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { useState } from "react";

interface Skills {
  technical: string[];
  soft: string[];
}

interface SkillsFormProps {
  skills: Skills;
  onChange: (skills: Skills) => void;
}

export function SkillsForm({ skills, onChange }: SkillsFormProps) {
  const [techSkillInput, setTechSkillInput] = useState("");
  const [softSkillInput, setSoftSkillInput] = useState("");

  const addTechnicalSkill = () => {
    if (techSkillInput.trim()) {
      onChange({
        ...skills,
        technical: [...skills.technical, techSkillInput.trim()]
      });
      setTechSkillInput("");
    }
  };

  const addSoftSkill = () => {
    if (softSkillInput.trim()) {
      onChange({
        ...skills,
        soft: [...skills.soft, softSkillInput.trim()]
      });
      setSoftSkillInput("");
    }
  };

  const removeTechnicalSkill = (index: number) => {
    onChange({
      ...skills,
      technical: skills.technical.filter((_, i) => i !== index)
    });
  };

  const removeSoftSkill = (index: number) => {
    onChange({
      ...skills,
      soft: skills.soft.filter((_, i) => i !== index)
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent, type: 'technical' | 'soft') => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (type === 'technical') {
        addTechnicalSkill();
      } else {
        addSoftSkill();
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Technical Skills */}
      <div>
        <Label htmlFor="technical-skills">Technical Skills</Label>
        <div className="flex gap-2 mt-2">
          <Input
            id="technical-skills"
            value={techSkillInput}
            onChange={(e) => setTechSkillInput(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e, 'technical')}
            placeholder="e.g., JavaScript, React, Python..."
          />
          <Button onClick={addTechnicalSkill} size="sm">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {skills.technical.map((skill, index) => (
            <Badge key={index} variant="secondary" className="flex items-center gap-1">
              {skill}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => removeTechnicalSkill(index)}
              />
            </Badge>
          ))}
        </div>
      </div>

      {/* Soft Skills */}
      <div>
        <Label htmlFor="soft-skills">Soft Skills</Label>
        <div className="flex gap-2 mt-2">
          <Input
            id="soft-skills"
            value={softSkillInput}
            onChange={(e) => setSoftSkillInput(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e, 'soft')}
            placeholder="e.g., Leadership, Communication, Teamwork..."
          />
          <Button onClick={addSoftSkill} size="sm">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {skills.soft.map((skill, index) => (
            <Badge key={index} variant="outline" className="flex items-center gap-1">
              {skill}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => removeSoftSkill(index)}
              />
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
