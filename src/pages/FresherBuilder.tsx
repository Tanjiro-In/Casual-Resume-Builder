
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { ResumeForm } from "@/components/resume/ResumeForm";
import { CustomizableResumePreview } from "@/components/resume/CustomizableResumePreview";
import { TemplateCustomizer, TemplateCustomization } from "@/components/resume/TemplateCustomizer";
import { Button } from "@/components/ui/button";
import { Download, ArrowRight, Palette } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generatePDF } from "@/utils/pdfGenerator";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface FresherResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    portfolio: string;
  };
  summary: string;
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
  const navigate = useNavigate();
  
  const [resumeData, setResumeData] = useState<FresherResumeData>({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      portfolio: "",
    },
    summary: "",
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

  const [customization, setCustomization] = useState<TemplateCustomization>({
    style: "modern",
    font: "calibri",
    sectionOrder: ["personalInfo", "summary", "objective", "education", "projects", "internships", "skills", "certifications"],
    accentColor: "#2563eb",
  });

  const availableSections = ["personalInfo", "summary", "objective", "education", "projects", "internships", "skills", "certifications"];

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

  const switchToProfessional = () => {
    navigate("/experienced");
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

        <div className="flex justify-center mb-6 space-x-4 flex-wrap gap-2">
          <Button onClick={switchToProfessional} variant="outline">
            <ArrowRight className="mr-2 h-4 w-4" />
            Switch to Professional
          </Button>
          <Button onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <Tabs defaultValue="content" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="design">
                  <Palette className="w-4 h-4 mr-1" />
                  Design
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="content" className="space-y-6">
                <ResumeForm 
                  resumeData={resumeData} 
                  onChange={handleResumeChange}
                  type="fresher"
                />
              </TabsContent>
              
              <TabsContent value="design">
                <TemplateCustomizer
                  customization={customization}
                  onChange={setCustomization}
                  availableSections={availableSections}
                />
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="lg:col-span-2 lg:sticky lg:top-24 h-fit">
            <CustomizableResumePreview 
              resumeData={resumeData} 
              type="fresher" 
              customization={customization}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FresherBuilder;
