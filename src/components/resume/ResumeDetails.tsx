import React from 'react';
import { ResumeData } from '../../types/resume';
import { Briefcase, GraduationCap, Wrench } from 'lucide-react';

interface ResumeDetailsProps {
  resumeData: ResumeData;
}

export default function ResumeDetails({ resumeData }: ResumeDetailsProps) {
  return (
    <div className="space-y-8">
      {/* Basic Info */}
      <div>
        <h3 className="text-lg font-medium text-gray-900">{resumeData.full_name}</h3>
        <div className="mt-1 text-sm text-gray-500">
          <p>{resumeData.email}</p>
          <p>{resumeData.phone}</p>
        </div>
      </div>

      {/* Summary */}
      <div>
        <h4 className="text-md font-medium text-gray-900">Summary</h4>
        <p className="mt-1 text-sm text-gray-600">{resumeData.summary}</p>
      </div>

      {/* Skills */}
      <div>
        <div className="flex items-center">
          <Wrench className="h-5 w-5 text-gray-400 mr-2" />
          <h4 className="text-md font-medium text-gray-900">Skills</h4>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {resumeData.skills.map((skill, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Education */}
      <div>
        <div className="flex items-center">
          <GraduationCap className="h-5 w-5 text-gray-400 mr-2" />
          <h4 className="text-md font-medium text-gray-900">Education</h4>
        </div>
        <div className="mt-2 space-y-4">
          {resumeData.education.map((edu, index) => (
            <div key={index} className="border-l-2 border-gray-200 pl-4">
              <h5 className="text-sm font-medium text-gray-900">{edu.institution}</h5>
              <p className="text-sm text-gray-600">{edu.degree} in {edu.field}</p>
              <p className="text-xs text-gray-500">
                {edu.start_date} - {edu.end_date || 'Present'}
                {edu.gpa && ` • GPA: ${edu.gpa}`}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div>
        <div className="flex items-center">
          <Briefcase className="h-5 w-5 text-gray-400 mr-2" />
          <h4 className="text-md font-medium text-gray-900">Experience</h4>
        </div>
        <div className="mt-2 space-y-4">
          {resumeData.experience.map((exp, index) => (
            <div key={index} className="border-l-2 border-gray-200 pl-4">
              <h5 className="text-sm font-medium text-gray-900">{exp.company}</h5>
              <p className="text-sm font-medium text-gray-700">{exp.position}</p>
              <p className="text-xs text-gray-500">
                {exp.start_date} - {exp.end_date || 'Present'}
              </p>
              <ul className="mt-2 list-disc list-inside text-sm text-gray-600">
                {exp.description.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}