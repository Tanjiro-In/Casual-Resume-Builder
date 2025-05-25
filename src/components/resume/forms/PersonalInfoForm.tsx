
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  portfolio: string;
}

interface PersonalInfoFormProps {
  personalInfo: PersonalInfo;
  onChange: (personalInfo: PersonalInfo) => void;
}

export function PersonalInfoForm({ personalInfo, onChange }: PersonalInfoFormProps) {
  // Auto-save functionality
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("personal-info", JSON.stringify(personalInfo));
    }, 1000);

    return () => clearTimeout(timer);
  }, [personalInfo]);

  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onChange({ ...personalInfo, [field]: value });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="fullName">Full Name *</Label>
        <Input
          id="fullName"
          value={personalInfo.fullName}
          onChange={(e) => handleChange("fullName", e.target.value)}
          placeholder="John Doe"
        />
      </div>
      <div>
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          value={personalInfo.email}
          onChange={(e) => handleChange("email", e.target.value)}
          placeholder="john.doe@email.com"
        />
      </div>
      <div>
        <Label htmlFor="phone">Phone Number *</Label>
        <Input
          id="phone"
          value={personalInfo.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          placeholder="+1 (555) 123-4567"
        />
      </div>
      <div>
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          value={personalInfo.location}
          onChange={(e) => handleChange("location", e.target.value)}
          placeholder="City, State"
        />
      </div>
      <div>
        <Label htmlFor="linkedin">LinkedIn Profile</Label>
        <Input
          id="linkedin"
          value={personalInfo.linkedin}
          onChange={(e) => handleChange("linkedin", e.target.value)}
          placeholder="linkedin.com/in/johndoe"
        />
      </div>
      <div>
        <Label htmlFor="portfolio">Portfolio/Website</Label>
        <Input
          id="portfolio"
          value={personalInfo.portfolio}
          onChange={(e) => handleChange("portfolio", e.target.value)}
          placeholder="johndoe.com"
        />
      </div>
    </div>
  );
}
