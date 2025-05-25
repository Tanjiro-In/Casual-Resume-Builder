
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { ExperiencedResumeForm } from "@/components/resume/ExperiencedResumeForm";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { Button } from "@/components/ui/button";
import { Download, Save, Copy, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generatePDF } from "@/utils/pdfGenerator";
import { ATSScore } from "@/components/resume/ATSScore";

export interface ExperiencedResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    portfolio: string;
  };
  summary: string;
  experience: {
    company: string;
    position: string;
    duration: string;
    location: string;
    description: string[];
  }[];
  skills: {
    technical: string[];
    soft: string[];
  };
  education: {
    degree: string;
    institution: string;
    year: string;
    gpa?: string;
  }[];
  achievements: string[];
  certifications: {
    name: string;
    issuer: string;
    date: string;
  }[];
  awards: string[];
  publications: string[];
}

const ExperiencedBuilder = () => {
  const { toast } = useToast();
  const [showATSScore, setShowATSScore] = useState(false);
  const [resumeData, setResumeData] = useState<ExperiencedResumeData>({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      portfolio: "",
    },
    summary: "",
    experience: [],
    skills: {
      technical: [],
      soft: [],
    },
    education: [],
    achievements: [],
    certifications: [],
    awards: [],
    publications: [],
  });

  const handleSave = () => {
    localStorage.setItem("experienced-resume", JSON.stringify(resumeData));
    toast({
      title: "Resume Saved",
      description: "Your resume has been saved successfully!",
    });
  };

  const handleDownload = async () => {
    try {
      await generatePDF(resumeData, "experienced");
      toast({
        title: "Download Started",
        description: "Your resume PDF is being generated!",
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "There was an error generating your PDF.",
        variant: "destructive",
      });
    }
  };

  const handleDuplicate = () => {
    const duplicatedData = { ...resumeData };
    duplicatedData.personalInfo.fullName = `${duplicatedData.personalInfo.fullName} (Copy)`;
    setResumeData(duplicatedData);
    toast({
      title: "Resume Duplicated",
      description: "Your resume has been duplicated successfully!",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Professional Resume Builder</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Showcase your experience with ATS-optimized templates
          </p>
        </div>

        <div className="flex justify-center mb-6 space-x-4 flex-wrap gap-2">
          <Button onClick={handleSave} variant="outline">
            <Save className="mr-2 h-4 w-4" />
            Save Resume
          </Button>
          <Button onClick={handleDuplicate} variant="outline">
            <Copy className="mr-2 h-4 w-4" />
            Duplicate
          </Button>
          <Button onClick={() => setShowATSScore(!showATSScore)} variant="outline">
            <BarChart3 className="mr-2 h-4 w-4" />
            ATS Score
          </Button>
          <Button onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>

        {showATSScore && (
          <div className="mb-6">
            <ATSScore resumeData={resumeData} />
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <ExperiencedResumeForm 
              resumeData={resumeData} 
              setResumeData={setResumeData}
            />
          </div>
          
          <div className="lg:sticky lg:top-24 h-fit">
            <ResumePreview resumeData={resumeData} type="experienced" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperiencedBuilder;
