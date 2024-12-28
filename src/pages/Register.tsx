import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";

// Validation Schemas
const candidateSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
});

const recruiterSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  designation: z.string().min(2, "Designation must be at least 2 characters"),
});

type CandidateForm = z.infer<typeof candidateSchema>;
type RecruiterForm = z.infer<typeof recruiterSchema>;

export default function Register() {
  const [role, setRole] = useState<"candidate" | "recruiter" | null>(null);
  const { signUp } = useAuth(); // Use AuthContext

  // Candidate Form
  const {
    register: registerCandidate,
    handleSubmit: handleCandidateSubmit,
    formState: { errors: candidateErrors, isSubmitting: isSubmittingCandidate },
  } = useForm<CandidateForm>({
    resolver: zodResolver(candidateSchema),
  });

  // Recruiter Form
  const {
    register: registerRecruiter,
    handleSubmit: handleRecruiterSubmit,
    formState: { errors: recruiterErrors, isSubmitting: isSubmittingRecruiter },
  } = useForm<RecruiterForm>({
    resolver: zodResolver(recruiterSchema),
  });

  // Candidate Registration Handler
  const onSubmitCandidate = async (data: CandidateForm) => {
    try {
      await signUp(data.email, data.password, data.fullName, "candidate");
      toast.success("Candidate registration successful! Please log in.");
    } catch (error) {
      toast.error("Error during candidate registration. Please try again.");
    }
  };

  // Recruiter Registration Handler
  const onSubmitRecruiter = async (data: RecruiterForm) => {
    try {
      await signUp(data.email, data.password, data.fullName, "recruiter", {
        companyName: data.companyName,
        designation: data.designation,
      });
      toast.success("Recruiter registration successful! Please log in.");
    } catch (error) {
      toast.error("Error during recruiter registration. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Register</h2>
      <div className="flex space-x-4 mb-8">
        <button
          className={`px-4 py-2 border rounded-md ${
            role === "candidate" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setRole("candidate")}
        >
          Candidate
        </button>
        <button
          className={`px-4 py-2 border rounded-md ${
            role === "recruiter" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setRole("recruiter")}
        >
          Recruiter
        </button>
      </div>

      {role === "candidate" && (
        <form
          className="space-y-6 w-full max-w-md"
          onSubmit={handleCandidateSubmit(onSubmitCandidate)}
        >
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              {...registerCandidate("fullName")}
              type="text"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Full Name"
            />
            {candidateErrors.fullName && (
              <p className="mt-1 text-sm text-red-600">
                {candidateErrors.fullName.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              {...registerCandidate("email")}
              type="email"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Email Address"
            />
            {candidateErrors.email && (
              <p className="mt-1 text-sm text-red-600">
                {candidateErrors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              {...registerCandidate("password")}
              type="password"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Password"
            />
            {candidateErrors.password && (
              <p className="mt-1 text-sm text-red-600">
                {candidateErrors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmittingCandidate}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isSubmittingCandidate ? "Registering..." : "Register as Candidate"}
          </button>
        </form>
      )}

      {role === "recruiter" && (
        <form
          className="space-y-6 w-full max-w-md"
          onSubmit={handleRecruiterSubmit(onSubmitRecruiter)}
        >
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              {...registerRecruiter("fullName")}
              type="text"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Full Name"
            />
            {recruiterErrors.fullName && (
              <p className="mt-1 text-sm text-red-600">
                {recruiterErrors.fullName.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              {...registerRecruiter("email")}
              type="email"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Email Address"
            />
            {recruiterErrors.email && (
              <p className="mt-1 text-sm text-red-600">
                {recruiterErrors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              {...registerRecruiter("password")}
              type="password"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Password"
            />
            {recruiterErrors.password && (
              <p className="mt-1 text-sm text-red-600">
                {recruiterErrors.password.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="companyName"
              className="block text-sm font-medium text-gray-700"
            >
              Company Name
            </label>
            <input
              {...registerRecruiter("companyName")}
              type="text"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Company Name"
            />
            {recruiterErrors.companyName && (
              <p className="mt-1 text-sm text-red-600">
                {recruiterErrors.companyName.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="designation"
              className="block text-sm font-medium text-gray-700"
            >
              Designation
            </label>
            <input
              {...registerRecruiter("designation")}
              type="text"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Designation"
            />
            {recruiterErrors.designation && (
              <p className="mt-1 text-sm text-red-600">
                {recruiterErrors.designation.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmittingRecruiter}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isSubmittingRecruiter ? "Registering..." : "Register as Recruiter"}
          </button>
        </form>
      )}

      <div className="text-sm text-center mt-6">
        <Link
          to="/login"
          className="font-medium text-blue-600 hover:text-blue-500"
        >
          Already have an account? Log in
        </Link>
      </div>
    </div>
  );
}
