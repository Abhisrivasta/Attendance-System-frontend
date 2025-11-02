import React, { useState, useEffect } from "react";
import { createCourse } from "../../api/courseApi";
import { getColleg } from "../../api/collegeApi";

const CourseForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    collegeId: "",
  });

  const [colleges, setColleges] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Fetch colleges for dropdown
  useEffect(() => {
    const fetchColleges = async () => {
      setLoading(true);
      try {
        const res = await getColleg();
        setColleges(res.data);
      } catch (error) {
        console.error("Error fetching colleges:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchColleges();
  }, []);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");

    try {
      const res = await createCourse({
        ...formData,
        collegeId: Number(formData.collegeId),
      });
      setMessage(res.data.message || "✅ Course created successfully!");
      setFormData({ name: "", code: "", collegeId: "" });
    } catch (error) {
      console.error("Error creating course:", error);
      setMessage("❌ Failed to create course. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Create New Course</h2>

      {loading ? (
        <p>Loading colleges...</p>
      ) : (
        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Course Name */}
          <div style={styles.field}>
            <label>Course Name:</label>
            <input
              type="text"
              name="name"
              placeholder="Enter course name"
              value={formData.name}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          {/* Course Code */}
          <div style={styles.field}>
            <label>Course Code:</label>
            <input
              type="text"
              name="code"
              placeholder="Enter course code"
              value={formData.code}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          {/* College Dropdown */}
          <div style={styles.field}>
            <label>Select College:</label>
            <select
              name="collegeId"
              value={formData.collegeId}
              onChange={handleChange}
              required
              style={styles.select}
            >
              <option value="">-- Select College --</option>
              {colleges.map((college) => (
                <option key={college.id} value={college.id}>
                  {college.name}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button type="submit" style={styles.button} disabled={submitting}>
            {submitting ? "Creating..." : "Create Course"}
          </button>

          {/* Message */}
          {message && (
            <p
              style={{
                marginTop: "1rem",
                color: message.includes("✅") ? "green" : "red",
              }}
            >
              {message}
            </p>
          )}
        </form>
      )}
    </div>
  );
};

// Inline styles (optional)
const styles = {
  container: {
    maxWidth: "500px",
    margin: "2rem auto",
    padding: "2rem",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#fafafa",
  },
  form: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "1rem",
  },
  field: {
    display: "flex",
    flexDirection: "column" as const,
  },
  input: {
    padding: "0.5rem",
    fontSize: "1rem",
  },
  select: {
    padding: "0.5rem",
    fontSize: "1rem",
  },
  button: {
    padding: "0.7rem",
    fontSize: "1rem",
    cursor: "pointer",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
  },
};

export default CourseForm;
