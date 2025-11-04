import React, { useState, useEffect } from "react";
import { createBatch } from "../../api/batchApi";
import { getCourses } from "../../api/courseApi";
import { getCollege } from "../../api/collegeApi";

const BatchForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    startYear: "",
    endYear: "",
    collegeId: "",
    courseId: "",
  });

  const [courses, setCourses] = useState<any[]>([]);
  const [colleges, setColleges] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [collegeRes, courseRes] = await Promise.all([
          getCollege(),
          getCourses(),
        ]);
        setColleges(collegeRes.data);
        setCourses(courseRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await createBatch({
        ...formData,
        collegeId: Number(formData.collegeId),
        courseId: Number(formData.courseId),
      });
      setMessage(res.data.message || "Batch created successfully!");
      setFormData({
        name: "",
        startYear: "",
        endYear: "",
        collegeId: "",
        courseId: "",
      });
    } catch (error) {
      console.error("Error creating batch:", error);
      setMessage("Failed to create batch");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Create New Batch</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.field}>
          <label>Batch Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.field}>
          <label>Start Year:</label>
          <input
            type="date"
            name="startYear"
            value={formData.startYear}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.field}>
          <label>End Year:</label>
          <input
            type="date"
            name="endYear"
            value={formData.endYear}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

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

        <div style={styles.field}>
          <label>Select Course:</label>
          <select
            name="courseId"
            value={formData.courseId}
            onChange={handleChange}
            required
            style={styles.select}
          >
            <option value="">-- Select Course --</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Creating..." : "Create Batch"}
        </button>

        {message && <p style={{ marginTop: "1rem" }}>{message}</p>}
      </form>
    </div>
  );
};

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
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default BatchForm;
