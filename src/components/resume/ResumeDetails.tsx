import React from "react";
import {
  Mail,
  Phone,
  BookOpen,
  Briefcase,
  Layers,
  Link,
  User,
} from "lucide-react";

export default function ResumeDetails({ data }: { data: any }) {
  return (
    <div className="w-full bg-white shadow-lg rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Resume Details
      </h2>

      {/* Personal Info */}
      <div className="flex items-center gap-4 mb-4">
        <User className="text-blue-500 w-6 h-6" />
        <p className="text-lg font-medium">{data.name}</p>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <Mail className="text-blue-500 w-6 h-6" />
        <p className="text-lg">{data.email}</p>
      </div>
      <div className="flex items-center gap-4 mb-6">
        <Phone className="text-blue-500 w-6 h-6" />
        <p className="text-lg">{data.phone}</p>
      </div>

      {/* Skills */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill: string, index: number) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-lg"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Education</h3>
        {data.education.map((edu: any, index: number) => (
          <div key={index} className="mb-4">
            <BookOpen className="text-blue-500 w-6 h-6 inline mr-2" />
            <span className="text-lg font-medium">{edu.degree}</span> at{" "}
            <span className="text-lg">{edu.institution}</span>
            <p className="text-gray-600 text-sm">
              {edu.startDate} - {edu.endDate}
            </p>
          </div>
        ))}
      </div>

      {/* Work Experience */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Work Experience
        </h3>
        {data.workExperience.map((exp: any, index: number) => (
          <div key={index} className="mb-4">
            <Briefcase className="text-blue-500 w-6 h-6 inline mr-2" />
            <span className="text-lg font-medium">{exp.role}</span> at{" "}
            <span className="text-lg">{exp.company}</span>
            <p className="text-gray-600 text-sm">
              {exp.startDate} - {exp.endDate}
            </p>
            <p className="text-gray-700 mt-2">{exp.description}</p>
          </div>
        ))}
      </div>

      {/* Projects */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Projects</h3>
        {data.projects.map((project: any, index: number) => (
          <div key={index} className="mb-4">
            <Layers className="text-blue-500 w-6 h-6 inline mr-2" />
            <span className="text-lg font-medium">{project.title}</span>
            <p className="text-gray-700 mt-2">{project.description}</p>
            <p className="text-sm text-blue-500 mt-1">
              {project.links.map((link: string, linkIndex: number) => (
                <a
                  key={linkIndex}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline mr-2"
                >
                  {link}
                </a>
              ))}
            </p>
          </div>
        ))}
      </div>

      {/* Links */}
      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Links</h3>
        {data.links.map((link: string, index: number) => (
          <p key={index} className="mb-2">
            <Link className="text-blue-500 w-6 h-6 inline mr-2" />
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {link}
            </a>
          </p>
        ))}
      </div>
    </div>
  );
}
