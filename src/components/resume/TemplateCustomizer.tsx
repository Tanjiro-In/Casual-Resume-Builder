
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Palette, Type, List, ChevronUp, ChevronDown } from "lucide-react";

export interface TemplateCustomization {
  style: "modern" | "classic" | "minimal" | "creative";
  font: "inter" | "roboto" | "playfair" | "opensans";
  sectionOrder: string[];
  accentColor: string;
}

interface TemplateCustomizerProps {
  customization: TemplateCustomization;
  onChange: (customization: TemplateCustomization) => void;
  availableSections: string[];
}

const templateStyles = [
  { value: "modern", label: "Modern", description: "Clean with blue accents" },
  { value: "classic", label: "Classic", description: "Traditional professional" },
  { value: "minimal", label: "Minimal", description: "Simple and elegant" },
  { value: "creative", label: "Creative", description: "Colorful and dynamic" },
];

const fontOptions = [
  { value: "inter", label: "Inter", description: "Modern sans-serif" },
  { value: "roboto", label: "Roboto", description: "Clean and readable" },
  { value: "playfair", label: "Playfair Display", description: "Elegant serif" },
  { value: "opensans", label: "Open Sans", description: "Friendly sans-serif" },
];

const accentColors = [
  { value: "#2563eb", label: "Blue", class: "bg-blue-600" },
  { value: "#059669", label: "Green", class: "bg-emerald-600" },
  { value: "#dc2626", label: "Red", class: "bg-red-600" },
  { value: "#7c3aed", label: "Purple", class: "bg-violet-600" },
  { value: "#ea580c", label: "Orange", class: "bg-orange-600" },
  { value: "#0891b2", label: "Cyan", class: "bg-cyan-600" },
];

export function TemplateCustomizer({ customization, onChange, availableSections }: TemplateCustomizerProps) {
  const moveSectionUp = (index: number) => {
    if (index > 0) {
      const newOrder = [...customization.sectionOrder];
      [newOrder[index], newOrder[index - 1]] = [newOrder[index - 1], newOrder[index]];
      onChange({ ...customization, sectionOrder: newOrder });
    }
  };

  const moveSectionDown = (index: number) => {
    if (index < customization.sectionOrder.length - 1) {
      const newOrder = [...customization.sectionOrder];
      [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
      onChange({ ...customization, sectionOrder: newOrder });
    }
  };

  const sectionDisplayNames: Record<string, string> = {
    personalInfo: "Personal Information",
    objective: "Career Objective",
    summary: "Professional Summary",
    education: "Education",
    experience: "Work Experience",
    projects: "Projects",
    internships: "Internships",
    skills: "Skills",
    certifications: "Certifications",
    achievements: "Achievements",
    awards: "Awards",
    publications: "Publications",
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Template Customization
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Template Style */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Template Style</Label>
          <Select
            value={customization.style}
            onValueChange={(value: any) => onChange({ ...customization, style: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select template style" />
            </SelectTrigger>
            <SelectContent>
              {templateStyles.map((style) => (
                <SelectItem key={style.value} value={style.value}>
                  <div>
                    <div className="font-medium">{style.label}</div>
                    <div className="text-xs text-gray-500">{style.description}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Font Selection */}
        <div className="space-y-3">
          <Label className="text-sm font-medium flex items-center gap-2">
            <Type className="h-4 w-4" />
            Font Family
          </Label>
          <Select
            value={customization.font}
            onValueChange={(value: any) => onChange({ ...customization, font: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select font" />
            </SelectTrigger>
            <SelectContent>
              {fontOptions.map((font) => (
                <SelectItem key={font.value} value={font.value}>
                  <div>
                    <div className="font-medium">{font.label}</div>
                    <div className="text-xs text-gray-500">{font.description}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Accent Color */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Accent Color</Label>
          <div className="flex flex-wrap gap-2">
            {accentColors.map((color) => (
              <button
                key={color.value}
                onClick={() => onChange({ ...customization, accentColor: color.value })}
                className={`w-8 h-8 rounded-full ${color.class} ${
                  customization.accentColor === color.value ? "ring-2 ring-gray-400 ring-offset-2" : ""
                }`}
                title={color.label}
              />
            ))}
          </div>
        </div>

        {/* Section Order */}
        <div className="space-y-3">
          <Label className="text-sm font-medium flex items-center gap-2">
            <List className="h-4 w-4" />
            Section Order
          </Label>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {customization.sectionOrder.map((section, index) => (
              <div
                key={section}
                className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-md"
              >
                <span className="text-sm font-medium">
                  {sectionDisplayNames[section] || section}
                </span>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => moveSectionUp(index)}
                    disabled={index === 0}
                    className="h-6 w-6 p-0"
                  >
                    <ChevronUp className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => moveSectionDown(index)}
                    disabled={index === customization.sectionOrder.length - 1}
                    className="h-6 w-6 p-0"
                  >
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
