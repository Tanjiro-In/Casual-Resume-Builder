
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PersonalInfoForm } from "./forms/PersonalInfoForm";
import { SummaryForm } from "./forms/SummaryForm";
import { ExperienceForm } from "./forms/ExperienceForm";
import { SkillsForm } from "./forms/SkillsForm";
import { EducationForm } from "./forms/EducationForm";
import { AchievementsForm } from "./forms/AchievementsForm";
import { CertificationsForm } from "./forms/CertificationsForm";
import { AwardsForm } from "./forms/AwardsForm";
import { PublicationsForm } from "./forms/PublicationsForm";
import { ExperiencedResumeData } from "@/pages/ExperiencedBuilder";

interface ExperiencedResumeFormProps {
  resumeData: ExperiencedResumeData;
  setResumeData: (data: ExperiencedResumeData) => void;
}

export function ExperiencedResumeForm({ resumeData, setResumeData }: ExperiencedResumeFormProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Your contact information and professional links</CardDescription>
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
          <CardTitle>Professional Summary</CardTitle>
          <CardDescription>A compelling summary of your experience and value proposition</CardDescription>
        </CardHeader>
        <CardContent>
          <SummaryForm 
            summary={resumeData.summary}
            onChange={(summary) => setResumeData({ ...resumeData, summary })}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Work Experience</CardTitle>
          <CardDescription>Your professional work history</CardDescription>
        </CardHeader>
        <CardContent>
          <ExperienceForm 
            experience={resumeData.experience}
            onChange={(experience) => setResumeData({ ...resumeData, experience })}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Skills</CardTitle>
          <CardDescription>Your core competencies and expertise</CardDescription>
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
          <CardTitle>Education</CardTitle>
          <CardDescription>Your educational qualifications</CardDescription>
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
          <CardTitle>Key Achievements</CardTitle>
          <CardDescription>Notable accomplishments in your career</CardDescription>
        </CardHeader>
        <CardContent>
          <AchievementsForm 
            achievements={resumeData.achievements}
            onChange={(achievements) => setResumeData({ ...resumeData, achievements })}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Certifications</CardTitle>
          <CardDescription>Professional certifications and licenses</CardDescription>
        </CardHeader>
        <CardContent>
          <CertificationsForm 
            certifications={resumeData.certifications}
            onChange={(certifications) => setResumeData({ ...resumeData, certifications })}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Awards & Recognition</CardTitle>
          <CardDescription>Professional awards and recognitions</CardDescription>
        </CardHeader>
        <CardContent>
          <AwardsForm 
            awards={resumeData.awards}
            onChange={(awards) => setResumeData({ ...resumeData, awards })}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Publications</CardTitle>
          <CardDescription>Research papers, articles, and publications</CardDescription>
        </CardHeader>
        <CardContent>
          <PublicationsForm 
            publications={resumeData.publications}
            onChange={(publications) => setResumeData({ ...resumeData, publications })}
          />
        </CardContent>
      </Card>
    </div>
  );
}
