import React from "react";
import { PersonalInfoForm } from "./forms/PersonalInfoForm";
import { SummaryForm } from "./forms/SummaryForm";
import { ObjectiveForm } from "./forms/ObjectiveForm";
import { EducationForm } from "./forms/EducationForm";
import { InternshipsForm } from "./forms/InternshipsForm";
import { SkillsForm } from "./forms/SkillsForm";
import { CertificationsForm } from "./forms/CertificationsForm";
import { ProjectsFormWithAI } from "./forms/ProjectsFormWithAI";

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  portfolio: string;
}

interface Education {
  degree: string;
  institution: string;
  year: string;
  gpa?: string;
}

interface Skills {
  technical: string[];
  soft: string[];
}

interface Internship {
  company: string;
  position: string;
  duration: string;
  description: string;
}

interface Certification {
  name: string;
  issuer: string;
  date: string;
}

interface ResumeData {
  personalInfo: PersonalInfo;
  summary?: string;
  objective?: string;
  education: Education[];
  skills: Skills;
  internships: Internship[];
  certifications: Certification[];
  projects: any[];
}

interface ResumeFormProps {
  resumeData: ResumeData;
  onChange: (data: ResumeData) => void;
  type?: "fresher" | "experienced";
}

export function ResumeForm({ 
  resumeData, 
  onChange, 
  type = "fresher" 
}: ResumeFormProps) {
  const updatePersonalInfo = (personalInfo: PersonalInfo) => {
    onChange({ ...resumeData, personalInfo });
  };

  const updateObjective = (objective: string) => {
    onChange({ ...resumeData, objective });
  };

  const updateEducation = (education: Education[]) => {
    const normalizedEducation = education.map(edu => ({
      ...edu,
      gpa: edu.gpa || ""
    }));
    onChange({ ...resumeData, education: normalizedEducation });
  };

  const updateInternships = (internships: Internship[]) => {
    onChange({ ...resumeData, internships });
  };

  const updateSkills = (skills: Skills) => {
    onChange({ ...resumeData, skills });
  };

  const updateCertifications = (certifications: Certification[]) => {
    onChange({ ...resumeData, certifications });
  };

  const updateProjects = (projects: any[]) => {
    onChange({ ...resumeData, projects });
  };

  return (
    <div className="space-y-6">
      <PersonalInfoForm
        personalInfo={resumeData.personalInfo}
        onChange={updatePersonalInfo}
      />

      {type === "fresher" && (
        <ObjectiveForm
          objective={resumeData.objective || ""}
          onChange={updateObjective}
        />
      )}
      
      <EducationForm
        education={resumeData.education.map(edu => ({
          ...edu,
          gpa: edu.gpa || ""
        }))}
        onChange={updateEducation}
      />

      <ProjectsFormWithAI
        projects={resumeData.projects || []}
        onChange={updateProjects}
      />

      <InternshipsForm
        internships={resumeData.internships}
        onChange={updateInternships}
      />
      
      <SkillsForm
        skills={resumeData.skills}
        onChange={updateSkills}
      />
      
      <CertificationsForm
        certifications={resumeData.certifications}
        onChange={updateCertifications}
      />
    </div>
  );
}
