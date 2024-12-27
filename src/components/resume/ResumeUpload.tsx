import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { parseResume } from '../../utils/resumeParser';
import toast from 'react-hot-toast';

export default function ResumeUpload() {
  const { user } = useAuth();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file || !user) return;

    try {
      // Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Create resume record in database
      const { data: resumeData, error: dbError } = await supabase
        .from('resumes')
        .insert({
          user_id: user.id,
          file_name: fileName,
          status: 'pending',
          original_name: file.name
        })
        .select()
        .single();

      if (dbError) throw dbError;

      // Parse resume
      const parsedData = await parseResume(file);
      
      // Save parsed data
      const { error: parseError } = await supabase
        .from('resume_data')
        .insert({
          resume_id: resumeData.id,
          ...parsedData
        });

      if (parseError) throw parseError;

      // Update resume status
      await supabase
        .from('resumes')
        .update({ status: 'processed' })
        .eq('id', resumeData.id);

      toast.success('Resume uploaded and processed successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload resume');
    }
  }, [user]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
    >
      <input {...getInputProps()} />
      <Upload className="mx-auto h-12 w-12 text-gray-400" />
      <p className="mt-2 text-sm text-gray-600">
        {isDragActive
          ? "Drop your resume here..."
          : "Drag 'n' drop your resume, or click to select"}
      </p>
      <p className="mt-1 text-xs text-gray-500">
        Supported formats: PDF, DOC, DOCX
      </p>
    </div>
  );
}