import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../../contexts/AuthContext";

export default function Jobs() {
  const { user } = useAuth(); // Get the current user's role
  const [jobs, setJobs] = useState([]); // List of jobs
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    skillsRequired: "",
  }); // Job creation form state

  // Fetch all jobs for the recruiter
  const fetchRecruiterJobs = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/jobs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(response.data);
    } catch (error) {
      toast.error("Failed to fetch jobs.");
      console.error("Error fetching jobs:", error);
    }
  };

  // Fetch all jobs for candidates
  const fetchCandidateJobs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/jobs/all");
      setJobs(response.data);
    } catch (error) {
      toast.error("Failed to fetch jobs.");
      console.error("Error fetching jobs:", error);
    }
  };

  // Handle job creation
  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/jobs",
        {
          title: formData.title,
          description: formData.description,
          skillsRequired: formData.skillsRequired
            .split(",")
            .map((skill) => skill.trim()),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(response.data.message);
      setFormData({ title: "", description: "", skillsRequired: "" }); // Clear the form
      fetchRecruiterJobs(); // Refresh the job list
    } catch (error) {
      toast.error("Failed to create job.");
      console.error("Error creating job:", error);
    }
  };

  // Fetch jobs on component mount
  useEffect(() => {
    if (user?.role === "recruiter") {
      fetchRecruiterJobs();
    } else if (user?.role === "candidate") {
      fetchCandidateJobs();
    }
  }, [user?.role]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">
        {user?.role === "recruiter" ? "Manage Jobs" : "Available Jobs"}
      </h2>

      {/* Recruiter Job Creation Form */}
      {user?.role === "recruiter" && (
        <form onSubmit={handleCreateJob} className="mb-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Job Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              rows={4}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Skills Required
            </label>
            <input
              type="text"
              value={formData.skillsRequired}
              onChange={(e) =>
                setFormData({ ...formData, skillsRequired: e.target.value })
              }
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Comma-separated skills (e.g., React, Node.js)"
              required
            />
          </div>

          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Create Job
          </button>
        </form>
      )}

      {/* Display Job Listings */}
      <div>
        {jobs.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {jobs.map((job) => (
              <li key={job._id} className="py-4">
                <h3 className="text-lg font-bold">{job.title}</h3>
                <p className="text-sm text-gray-600">{job.description}</p>
                <p className="text-sm text-gray-500">
                  <strong>Skills Required:</strong>{" "}
                  {job.skillsRequired.join(", ")}
                </p>
                {user?.role === "candidate" && (
                  <p className="text-sm text-gray-500">
                    <strong>Recruiter:</strong>{" "}
                    {job.recruiter?.fullName || "Unknown"}
                  </p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No jobs available.</p>
        )}
      </div>
    </div>
  );
}
