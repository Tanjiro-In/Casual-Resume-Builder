
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FresherResumeData } from "@/pages/FresherBuilder";
import { ExperiencedResumeData } from "@/pages/ExperiencedBuilder";
import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

interface ResumePreviewProps {
  resumeData: FresherResumeData | ExperiencedResumeData;
  type: "fresher" | "experienced";
}

export function ResumePreview({ resumeData, type }: ResumePreviewProps) {
  const isFresher = type === "fresher";
  const fresherData = resumeData as FresherResumeData;
  const experiencedData = resumeData as ExperiencedResumeData;

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-8 bg-white dark:bg-gray-900" id="resume-preview">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {resumeData.personalInfo.fullName || "Your Name"}
          </h1>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 dark:text-gray-300">
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

        {/* Objective/Summary */}
        {((isFresher && fresherData.objective) || (!isFresher && experiencedData.summary)) && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">
              {isFresher ? "Career Objective" : "Professional Summary"}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {isFresher ? fresherData.objective : experiencedData.summary}
            </p>
            <Separator className="mt-4" />
          </div>
        )}

        {/* Experience (for experienced professionals) */}
        {!isFresher && experiencedData.experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">Work Experience</h2>
            <div className="space-y-4">
              {experiencedData.experience.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{exp.position}</h3>
                      <p className="text-blue-600 dark:text-blue-400">{exp.company}</p>
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
        )}

        {/* Education */}
        {resumeData.education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">Education</h2>
            <div className="space-y-3">
              {resumeData.education.map((edu, index) => (
                <div key={index} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{edu.degree}</h3>
                    <p className="text-gray-700 dark:text-gray-300">{edu.institution}</p>
                    {edu.gpa && <p className="text-sm text-gray-600 dark:text-gray-400">GPA: {edu.gpa}</p>}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{edu.year}</p>
                </div>
              ))}
            </div>
            <Separator className="mt-4" />
          </div>
        )}

        {/* Skills */}
        {(resumeData.skills.technical.length > 0 || resumeData.skills.soft.length > 0) && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">Skills</h2>
            {resumeData.skills.technical.length > 0 && (
              <div className="mb-3">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Technical Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.technical.map((skill, index) => (
                    <Badge key={index} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </div>
            )}
            {resumeData.skills.soft.length > 0 && (
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Soft Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.soft.map((skill, index) => (
                    <Badge key={index} variant="outline">{skill}</Badge>
                  ))}
                </div>
              </div>
            )}
            <Separator className="mt-4" />
          </div>
        )}

        {/* Projects (for freshers) */}
        {isFresher && fresherData.projects.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">Projects</h2>
            <div className="space-y-4">
              {fresherData.projects.map((project, index) => (
                <div key={index}>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{project.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Technologies: {project.technologies}</p>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">{project.description}</p>
                  {project.link && (
                    <p className="text-blue-600 dark:text-blue-400 text-sm">Link: {project.link}</p>
                  )}
                </div>
              ))}
            </div>
            <Separator className="mt-4" />
          </div>
        )}

        {/* Internships (for freshers) */}
        {isFresher && fresherData.internships.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">Internships</h2>
            <div className="space-y-4">
              {fresherData.internships.map((internship, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{internship.position}</h3>
                      <p className="text-blue-600 dark:text-blue-400">{internship.company}</p>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{internship.duration}</p>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">{internship.description}</p>
                </div>
              ))}
            </div>
            <Separator className="mt-4" />
          </div>
        )}

        {/* Achievements (for experienced) */}
        {!isFresher && experiencedData.achievements.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">Key Achievements</h2>
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
        )}

        {/* Certifications */}
        {resumeData.certifications.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">Certifications</h2>
            <div className="space-y-2">
              {resumeData.certifications.map((cert, index) => (
                <div key={index} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{cert.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{cert.issuer}</p>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{cert.date}</p>
                </div>
              ))}
            </div>
            <Separator className="mt-4" />
          </div>
        )}

        {/* Awards (for experienced) */}
        {!isFresher && experiencedData.awards.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">Awards & Recognition</h2>
            <ul className="space-y-1">
              {experiencedData.awards.map((award, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300 text-sm">• {award}</li>
              ))}
            </ul>
            <Separator className="mt-4" />
          </div>
        )}

        {/* Publications (for experienced) */}
        {!isFresher && experiencedData.publications.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">Publications</h2>
            <ul className="space-y-1">
              {experiencedData.publications.map((publication, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300 text-sm">• {publication}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
