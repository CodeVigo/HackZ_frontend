import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function Applications() {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/jobs/all");
      setJobs(response.data);
    } catch (error) {
      toast.error("Failed to fetch jobs.");
      console.error("Error fetching jobs:", error);
    }
  };

  const applyForJob = async (jobId: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(`http://localhost:5000/jobs/apply/${jobId}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Successfully applied for the job!");
    } catch (error) {
      toast.error("Failed to apply for the job.");
      console.error("Error applying for the job:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Available Jobs</h2>
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
              <button
                onClick={() => applyForJob(job._id)}
                className="mt-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Apply
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No jobs available.</p>
      )}
    </div>
  );
}
