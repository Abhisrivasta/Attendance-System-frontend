import React, { useEffect, useState } from "react";
import { getUniversities } from "../../api/universityApi";
import { createCollege } from "../../api/collegeApi";

const CollegeForm: React.FC = () => {
  const [universities, setUniversities] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    type: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    email: "",
    phone: "",
    establishedYear: "",
    universityId: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // 🔹 Fetch universities for dropdown
  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await getUniversities();
        setUniversities(response.data.universities);   
    } catch (err) {
        console.error("Error fetching universities:", err);
      }
    };
    fetchUniversities();
  }, []);

  // 🔹 Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const payload = {
        ...formData,
        universityId: Number(formData.universityId),
        establishedYear: formData.establishedYear ? Number(formData.establishedYear) : null,
      };

      const res = await createCollege(payload);
      setMessage(res.data.message || "✅ College created successfully!");
      setFormData({
        name: "",
        code: "",
        type: "",
        address: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
        email: "",
        phone: "",
        establishedYear: "",
        universityId: "",
      });
    } catch (err) {
      console.error("Error creating college:", err);
      setMessage("❌ Failed to create college.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", padding: "2rem", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>Create College</h2>
      {message && <p style={{ color: message.includes("❌") ? "red" : "green" }}>{message}</p>}

      <form onSubmit={handleSubmit}>
        {/* College Name */}
        <div style={{ marginBottom: "10px" }}>
          <label>College Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        {/* Code */}
        <div style={{ marginBottom: "10px" }}>
          <label>Code</label>
          <input type="text" name="code" value={formData.code} onChange={handleChange} style={{ width: "100%", padding: "8px" }} />
        </div>

        {/* Type */}
        <div style={{ marginBottom: "10px" }}>
          <label>Type</label>
          <select name="type" value={formData.type} onChange={handleChange} style={{ width: "100%", padding: "8px" }}>
            <option value="">Select type</option>
            <option value="GOVERNMENT">Government</option>
            <option value="PRIVATE">Private</option>
            <option value="AUTONOMOUS">Autonomous</option>
          </select>
        </div>

        {/* Address */}
        <div style={{ marginBottom: "10px" }}>
          <label>Address *</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        {/* City / State */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} style={{ flex: 1, padding: "8px" }} />
          <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} style={{ flex: 1, padding: "8px" }} />
        </div>

        {/* Country / Postal Code */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} style={{ flex: 1, padding: "8px" }} />
          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            value={formData.postalCode}
            onChange={handleChange}
            style={{ flex: 1, padding: "8px" }}
          />
        </div>

        {/* Email */}
        <div style={{ marginBottom: "10px" }}>
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} style={{ width: "100%", padding: "8px" }} />
        </div>

        {/* Phone */}
        <div style={{ marginBottom: "10px" }}>
          <label>Phone</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} style={{ width: "100%", padding: "8px" }} />
        </div>

        {/* Established Year */}
        <div style={{ marginBottom: "10px" }}>
          <label>Established Year</label>
          <input
            type="number"
            name="establishedYear"
            value={formData.establishedYear}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        {/* 🔽 University Dropdown */}
        <div style={{ marginBottom: "10px" }}>
          <label>Select University *</label>
          <select
            name="universityId"
            value={formData.universityId}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          >
            <option value="">Select University</option>
            {universities.map((uni) => (
              <option key={uni.id} value={uni.id}>
                {uni.name}
              </option>
            ))}
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            padding: "10px 15px",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Creating..." : "Create College"}
        </button>
      </form>
    </div>
  );
};

export default CollegeForm;
