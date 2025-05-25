
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { ResumeForm } from "@/components/resume/ResumeForm";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generatePDF } from "@/utils/pdfGenerator";

export interface FresherResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    portfolio: string;
  };
  objective: string;
  education: {
    degree: string;
    institution: string;
    year: string;
    gpa: string;
  }[];
  skills: {
    technical: string[];
    soft: string[];
  };
  projects: {
    title: string;
    description: string;
    technologies: string;
    link: string;
  }[];
  internships: {
    company: string;
    position: string;
    duration: string;
    description: string;
  }[];
  certifications: {
    name: string;
    issuer: string;
    date: string;
  }[];
}

const FresherBuilder = () => {
  const { toast } = useToast();
  const [resumeData, setResumeData] = useState<FresherResumeData>({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      portfolio: "",
    },
    objective: "",
    education: [],
    skills: {
      technical: [],
      soft: [],
    },
    projects: [],
    internships: [],
    certifications: [],
  });

  const handleResumeChange = (data: any) => {
    setResumeData(data);
  };

  const handleDownload = async () => {
    try {
      await generatePDF(resumeData, "fresher");
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Fresher Resume Builder</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Create a compelling resume that highlights your potential
          </p>
        </div>

        <div className="flex justify-center mb-6">
          <Button onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <ResumeForm 
              resumeData={resumeData} 
              onChange={handleResumeChange}
              type="fresher"
            />
          </div>
          
          <div className="lg:sticky lg:top-24 h-fit">
            <ResumePreview resumeData={resumeData} type="fresher" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FresherBuilder;
