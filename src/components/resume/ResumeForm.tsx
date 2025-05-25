
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PersonalInfoForm } from "./forms/PersonalInfoForm";
import { EducationForm } from "./forms/EducationForm";
import { SkillsForm } from "./forms/SkillsForm";
import { ProjectsForm } from "./forms/ProjectsForm";
import { InternshipsForm } from "./forms/InternshipsForm";
import { CertificationsForm } from "./forms/CertificationsForm";
import { ObjectiveForm } from "./forms/ObjectiveForm";
import { FresherResumeData } from "@/pages/FresherBuilder";

interface ResumeFormProps {
  resumeData: FresherResumeData;
  setResumeData: (data: FresherResumeData) => void;
  type: "fresher";
}

export function ResumeForm({ resumeData, setResumeData, type }: ResumeFormProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Your basic contact information</CardDescription>
        </CardHeader>
        <CardContent>
          <PersonalInfoForm 
            personalInfo={resumeData.personalInfo}
            onChange={(personalInfo) => setResumeData({ ...resumeData, personalInfo })}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Career Objective</CardTitle>
          <CardDescription>A brief summary of your career goals</CardDescription>
        </CardHeader>
        <CardContent>
          <ObjectiveForm 
            objective={resumeData.objective}
            onChange={(objective) => setResumeData({ ...resumeData, objective })}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Education</CardTitle>
          <CardDescription>Your educational background</CardDescription>
        </CardHeader>
        <CardContent>
          <EducationForm 
            education={resumeData.education}
            onChange={(education) => setResumeData({ ...resumeData, education })}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Skills</CardTitle>
          <CardDescription>Your technical and soft skills</CardDescription>
        </CardHeader>
        <CardContent>
          <SkillsForm 
            skills={resumeData.skills}
            onChange={(skills) => setResumeData({ ...resumeData, skills })}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Projects</CardTitle>
          <CardDescription>Showcase your best projects</CardDescription>
        </CardHeader>
        <CardContent>
          <ProjectsForm 
            projects={resumeData.projects}
            onChange={(projects) => setResumeData({ ...resumeData, projects })}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Internships</CardTitle>
          <CardDescription>Your internship experiences</CardDescription>
        </CardHeader>
        <CardContent>
          <InternshipsForm 
            internships={resumeData.internships}
            onChange={(internships) => setResumeData({ ...resumeData, internships })}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Certifications</CardTitle>
          <CardDescription>Professional certifications and courses</CardDescription>
        </CardHeader>
        <CardContent>
          <CertificationsForm 
            certifications={resumeData.certifications}
            onChange={(certifications) => setResumeData({ ...resumeData, certifications })}
          />
        </CardContent>
      </Card>
    </div>
  );
}
