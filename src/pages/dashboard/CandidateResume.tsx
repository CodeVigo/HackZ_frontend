import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import ResumeUpload from '../../components/resume/ResumeUpload';
import ResumeDetails from '../../components/resume/ResumeDetails';
import { FileText, Loader } from 'lucide-react';
import type { Resume, ResumeData } from '../../types/resume';

export default function CandidateResume() {
  const { user } = useAuth();
  const [resume, setResume] = useState<Resume | null>(null);
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResume() {
      if (!user) return;

      try {
        // Fetch latest resume
        const { data: resumeData, error: resumeError } = await supabase
          .from('resumes')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (resumeError && resumeError.code !== 'PGRST116') throw resumeError;

        if (resumeData) {
          setResume(resumeData);
          
          // Fetch parsed resume data
          const { data: parsedData, error: parsedError } = await supabase
            .from('resume_data')
            .select('*')
            .eq('resume_id', resumeData.id)
            .single();

          if (parsedError) throw parsedError;
          setResumeData(parsedData);
        }
      } catch (error) {
        console.error('Error fetching resume:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchResume();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">My Resume</h1>
        </div>
        
        <div className="mt-8 max-w-3xl">
          {!resume ? (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-500" />
                  Upload Your Resume
                </h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>Upload your resume to let employers find you.</p>
                </div>
                <div className="mt-5">
                  <ResumeUpload />
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                {resume.status === 'pending' ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader className="h-8 w-8 animate-spin text-blue-500 mr-3" />
                    <p className="text-gray-600">Processing your resume...</p>
                  </div>
                ) : resume.status === 'failed' ? (
                  <div className="text-center py-8">
                    <p className="text-red-600">Failed to process resume. Please try uploading again.</p>
                    <div className="mt-4">
                      <ResumeUpload />
                    </div>
                  </div>
                ) : resumeData ? (
                  <ResumeDetails resumeData={resumeData} />
                ) : null}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}