import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function Students() {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/students", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(response.data);
    } catch (error) {
      toast.error("Failed to fetch students.");
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Students</h2>
      {students.length > 0 ? (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Skills</th>
              <th className="py-2 px-4 border-b">Education</th>
              <th className="py-2 px-4 border-b">Work Experience</th>
              <th className="py-2 px-4 border-b">Projects</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td className="py-2 px-4 border-b">{student.fullName}</td>
                <td className="py-2 px-4 border-b">{student.email}</td>
                <td className="py-2 px-4 border-b">
                  {student.resume?.skills?.join(", ") || "N/A"}
                </td>
                <td className="py-2 px-4 border-b">
                  {student.resume?.education
                    ?.map(
                      (edu) =>
                        `${edu.institution}, ${edu.degree} (${
                          edu.startDate || "N/A"
                        } - ${edu.endDate || "N/A"})`
                    )
                    .join("; ") || "N/A"}
                </td>
                <td className="py-2 px-4 border-b">
                  {student.resume?.workExperience
                    ?.map(
                      (work) =>
                        `${work.company}, ${work.role} (${
                          work.startDate || "N/A"
                        } - ${work.endDate || "N/A"}): ${work.description}`
                    )
                    .join("; ") || "N/A"}
                </td>
                <td className="py-2 px-4 border-b">
                  {student.resume?.projects
                    ?.map(
                      (proj) =>
                        `${proj.title}: ${proj.description} (${proj.links.join(
                          ", "
                        )})`
                    )
                    .join("; ") || "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600">No students found.</p>
      )}
    </div>
  );
}
