import React, { useCallback, useState } from "react";
import { Upload } from "lucide-react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import ResumeDetails from "./ResumeDetails";

export default function ResumeUpload() {
  const [resumeData, setResumeData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: string | any[]) => {
    if (acceptedFiles.length === 0) {
      toast.error(
        "No valid file selected. Please upload a PDF, DOC, or DOCX file."
      );
      return;
    }

    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append("resume", file);

    setLoading(true);
    const loadingToast = toast.loading("Uploading and processing resume...");

    try {
      const response = await fetch("http://172.20.3.115:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Failed to upload resume");
      }

      const result = await response.json();

      if (result.success) {
        toast.success("Resume uploaded and processed successfully!");
        setResumeData(result.data);
      } else {
        throw new Error(result.message || "Error processing resume");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(error?.message || "Failed to upload resume");
    } finally {
      setLoading(false);
      toast.dismiss(loadingToast);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    maxFiles: 1,
  });

  return (
    <div>
      <div className="max-w-4xl mx-auto px-4">
        {/* Drag and Drop Section */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors mb-8
          ${
            isDragActive
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-blue-400"
          }`}
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

        {/* Resume Details Section */}
      </div>
      {resumeData && <ResumeDetails data={resumeData} />}
    </div>
  );
}
