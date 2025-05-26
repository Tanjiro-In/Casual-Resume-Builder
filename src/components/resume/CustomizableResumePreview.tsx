import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FresherResumeData } from "@/pages/FresherBuilder";
import { ExperiencedResumeData } from "@/pages/ExperiencedBuilder";
import { TemplateCustomization } from "./TemplateCustomizer";
import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

interface CustomizableResumePreviewProps {
  resumeData: FresherResumeData | ExperiencedResumeData;
  type: "fresher" | "experienced";
  customization: TemplateCustomization;
}

export function CustomizableResumePreview({ 
  resumeData, 
  type, 
  customization 
}: CustomizableResumePreviewProps) {
  const isFresher = type === "fresher";
  const fresherData = resumeData as FresherResumeData;
  const experiencedData = resumeData as ExperiencedResumeData;

  // Font class mapping
  const fontClasses = {
    calibri: "font-calibri",
    arial: "font-arial",
    times: "font-times",
    cambria: "font-cambria",
  };

  // Style configurations
  const styleConfig = {
    modern: {
      headerBg: "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700",
      cardClass: "shadow-lg border-0",
      sectionSpacing: "mb-8",
    },
    classic: {
      headerBg: "bg-white dark:bg-gray-900 border-b-2",
      cardClass: "shadow-md border-2",
      sectionSpacing: "mb-6",
    },
    minimal: {
      headerBg: "bg-gray-50 dark:bg-gray-800",
      cardClass: "shadow-sm border-0",
      sectionSpacing: "mb-7",
    },
    creative: {
      headerBg: "bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-800 dark:to-purple-900",
      cardClass: "shadow-xl border-0 rounded-xl",
      sectionSpacing: "mb-8",
    },
    elegant: {
      headerBg: "bg-gradient-to-r from-gray-50 to-slate-100 dark:from-gray-800 dark:to-slate-800",
      cardClass: "shadow-lg border border-gray-200 dark:border-gray-700",
      sectionSpacing: "mb-8",
    },
    professional: {
      headerBg: "bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700",
      cardClass: "shadow-md border border-gray-300 dark:border-gray-600",
      sectionSpacing: "mb-6",
    },
    bold: {
      headerBg: "bg-gradient-to-r from-slate-900 to-gray-800 text-white",
      cardClass: "shadow-xl border-2 border-gray-800",
      sectionSpacing: "mb-8",
    },
    compact: {
      headerBg: "bg-gray-100 dark:bg-gray-800",
      cardClass: "shadow-sm border",
      sectionSpacing: "mb-4",
    },
  };

  const currentStyle = styleConfig[customization.style];
  const fontClass = fontClasses[customization.font];

  const renderSection = (sectionKey: string) => {
    switch (sectionKey) {
      case "personalInfo":
        return (
          <div className={`text-center ${currentStyle.sectionSpacing}`}>
            <div className={`p-6 rounded-lg ${currentStyle.headerBg} ${customization.style === 'bold' ? 'text-white' : ''}`}>
              <h1 className={`text-3xl font-bold mb-2 ${fontClass}`} style={{ color: customization.style === 'bold' ? 'white' : customization.accentColor }}>
                {resumeData.personalInfo.fullName || "Your Name"}
              </h1>
              <div className={`flex flex-wrap justify-center gap-4 text-sm ${customization.style === 'bold' ? 'text-gray-200' : 'text-gray-600 dark:text-gray-300'}`}>
                {resumeData.personalInfo.email && (
                  <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    {resumeData.personalInfo.email}
                  </div>
                )}
                {resumeData.personalInfo.phone && (
                  <div className="flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    {resumeData.personalInfo.phone}
                  </div>
                )}
                {resumeData.personalInfo.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {resumeData.personalInfo.location}
                  </div>
                )}
                {resumeData.personalInfo.linkedin && (
                  <div className="flex items-center gap-1">
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </div>
                )}
                {resumeData.personalInfo.portfolio && (
                  <div className="flex items-center gap-1">
                    <Globe className="h-4 w-4" />
                    Portfolio
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case "summary":
        if ((isFresher && fresherData.summary) || (!isFresher && experiencedData.summary)) {
          const summaryText = isFresher ? fresherData.summary : experiencedData.summary;
          return (
            <div className={currentStyle.sectionSpacing}>
              <h2 className={`text-xl font-semibold mb-3 ${fontClass}`} style={{ color: customization.accentColor }}>
                Professional Summary
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {summaryText}
              </p>
              <Separator className="mt-4" />
            </div>
          );
        }
        return null;

      case "objective":
        if (isFresher && fresherData.objective) {
          return (
            <div className={currentStyle.sectionSpacing}>
              <h2 className={`text-xl font-semibold mb-3 ${fontClass}`} style={{ color: customization.accentColor }}>
                Career Objective
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {fresherData.objective}
              </p>
              <Separator className="mt-4" />
            </div>
          );
        }
        return null;

      case "education":
        if (resumeData.education.length > 0) {
          return (
            <div className={currentStyle.sectionSpacing}>
              <h2 className={`text-xl font-semibold mb-3 ${fontClass}`} style={{ color: customization.accentColor }}>
                Education
              </h2>
              <div className="space-y-3">
                {resumeData.education.map((edu, index) => (
                  <div key={index} className="flex justify-between items-start">
                    <div>
                      <h3 className={`font-semibold text-gray-900 dark:text-white ${fontClass}`}>{edu.degree}</h3>
                      <p className="text-gray-700 dark:text-gray-300">{edu.institution}</p>
                      {edu.gpa && <p className="text-sm text-gray-600 dark:text-gray-400">GPA: {edu.gpa}</p>}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{edu.year}</p>
                  </div>
                ))}
              </div>
              <Separator className="mt-4" />
            </div>
          );
        }
        return null;

      case "experience":
        if (!isFresher && experiencedData.experience.length > 0) {
          return (
            <div className={currentStyle.sectionSpacing}>
              <h2 className={`text-xl font-semibold mb-3 ${fontClass}`} style={{ color: customization.accentColor }}>
                Work Experience
              </h2>
              <div className="space-y-4">
                {experiencedData.experience.map((exp, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className={`font-semibold text-gray-900 dark:text-white ${fontClass}`}>{exp.position}</h3>
                        <p style={{ color: customization.accentColor }}>{exp.company}</p>
                      </div>
                      <div className="text-right text-sm text-gray-600 dark:text-gray-300">
                        <p>{exp.duration}</p>
                        <p>{exp.location}</p>
                      </div>
                    </div>
                    <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      {exp.description.map((desc, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <Separator className="mt-4" />
            </div>
          );
        }
        return null;

      case "projects":
        if (isFresher && fresherData.projects.length > 0) {
          return (
            <div className={currentStyle.sectionSpacing}>
              <h2 className={`text-xl font-semibold mb-3 ${fontClass}`} style={{ color: customization.accentColor }}>
                Projects
              </h2>
              <div className="space-y-4">
                {fresherData.projects.map((project, index) => (
                  <div key={index}>
                    <h3 className={`font-semibold text-gray-900 dark:text-white ${fontClass}`}>{project.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Technologies: {project.technologies}</p>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">{project.description}</p>
                    {project.link && (
                      <p className="text-sm" style={{ color: customization.accentColor }}>Link: {project.link}</p>
                    )}
                  </div>
                ))}
              </div>
              <Separator className="mt-4" />
            </div>
          );
        }
        return null;

      case "internships":
        if (isFresher && fresherData.internships.length > 0) {
          return (
            <div className={currentStyle.sectionSpacing}>
              <h2 className={`text-xl font-semibold mb-3 ${fontClass}`} style={{ color: customization.accentColor }}>
                Internships
              </h2>
              <div className="space-y-4">
                {fresherData.internships.map((internship, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className={`font-semibold text-gray-900 dark:text-white ${fontClass}`}>{internship.position}</h3>
                        <p style={{ color: customization.accentColor }}>{internship.company}</p>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{internship.duration}</p>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">{internship.description}</p>
                  </div>
                ))}
              </div>
              <Separator className="mt-4" />
            </div>
          );
        }
        return null;

      case "skills":
        if (resumeData.skills.technical.length > 0 || resumeData.skills.soft.length > 0) {
          return (
            <div className={currentStyle.sectionSpacing}>
              <h2 className={`text-xl font-semibold mb-3 ${fontClass}`} style={{ color: customization.accentColor }}>
                Skills
              </h2>
              {resumeData.skills.technical.length > 0 && (
                <div className="mb-3">
                  <h3 className={`font-medium text-gray-900 dark:text-white mb-2 ${fontClass}`}>Technical Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {resumeData.skills.technical.map((skill, index) => (
                      <Badge key={index} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </div>
              )}
              {resumeData.skills.soft.length > 0 && (
                <div>
                  <h3 className={`font-medium text-gray-900 dark:text-white mb-2 ${fontClass}`}>Soft Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {resumeData.skills.soft.map((skill, index) => (
                      <Badge key={index} variant="outline">{skill}</Badge>
                    ))}
                  </div>
                </div>
              )}
              <Separator className="mt-4" />
            </div>
          );
        }
        return null;

      case "certifications":
        if (resumeData.certifications.length > 0) {
          return (
            <div className={currentStyle.sectionSpacing}>
              <h2 className={`text-xl font-semibold mb-3 ${fontClass}`} style={{ color: customization.accentColor }}>
                Certifications
              </h2>
              <div className="space-y-2">
                {resumeData.certifications.map((cert, index) => (
                  <div key={index} className="flex justify-between items-start">
                    <div>
                      <h3 className={`font-medium text-gray-900 dark:text-white ${fontClass}`}>{cert.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{cert.issuer}</p>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{cert.date}</p>
                  </div>
                ))}
              </div>
              <Separator className="mt-4" />
            </div>
          );
        }
        return null;

      case "achievements":
        if (!isFresher && experiencedData.achievements.length > 0) {
          return (
            <div className={currentStyle.sectionSpacing}>
              <h2 className={`text-xl font-semibold mb-3 ${fontClass}`} style={{ color: customization.accentColor }}>
                Key Achievements
              </h2>
              <ul className="space-y-2">
                {experiencedData.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start text-gray-700 dark:text-gray-300">
                    <span className="mr-2">•</span>
                    <span className="text-sm">{achievement}</span>
                  </li>
                ))}
              </ul>
              <Separator className="mt-4" />
            </div>
          );
        }
        return null;

      case "awards":
        if (!isFresher && experiencedData.awards.length > 0) {
          return (
            <div className={currentStyle.sectionSpacing}>
              <h2 className={`text-xl font-semibold mb-3 ${fontClass}`} style={{ color: customization.accentColor }}>
                Awards & Recognition
              </h2>
              <ul className="space-y-1">
                {experiencedData.awards.map((award, index) => (
                  <li key={index} className="text-gray-700 dark:text-gray-300 text-sm">• {award}</li>
                ))}
              </ul>
              <Separator className="mt-4" />
            </div>
          );
        }
        return null;

      case "publications":
        if (!isFresher && experiencedData.publications.length > 0) {
          return (
            <div className={currentStyle.sectionSpacing}>
              <h2 className={`text-xl font-semibold mb-3 ${fontClass}`} style={{ color: customization.accentColor }}>
                Publications
              </h2>
              <ul className="space-y-1">
                {experiencedData.publications.map((publication, index) => (
                  <li key={index} className="text-gray-700 dark:text-gray-300 text-sm">• {publication}</li>
                ))}
              </ul>
            </div>
          );
        }
        return null;

      default:
        return null;
    }
  };

  return (
    <Card className={`w-full max-w-4xl mx-auto ${currentStyle.cardClass}`}>
      <CardContent className={`p-8 bg-white dark:bg-gray-900 ${fontClass}`} id="resume-preview">
        {customization.sectionOrder.map((sectionKey) => (
          <div key={sectionKey}>
            {renderSection(sectionKey)}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
