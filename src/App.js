import React, { useState } from "react";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwQIOddls1QXvnqKuVWBw04uX9QqcKQ7Ocgt0XussrwEj-YxL7YEOfHy1fus_1GdhSV/exec";

function App() {
  const [formData, setFormData] = useState({
    email: "",
    zipCode: "",
    interests: "",
    source: "GitHubPages",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");

    try {
      console.log("Submitting form data:", formData);

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // Needed for Google Apps Script
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // no-cors won’t return a visible response, but this confirms network success
      console.log("Form submitted (response hidden due to no-cors):", response);
      setStatus("✅ Submitted successfully!");
      setFormData({
        email: "",
        zipCode: "",
        interests: "",
        source: "GitHubPages",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("❌ Failed to submit. Check console for details.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Nayber Signup</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="text"
          name="zipCode"
          placeholder="ZIP Code"
          value={formData.zipCode}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="text"
          name="interests"
          placeholder="Interests"
          value={formData.interests}
          onChange={handleChange}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Submit
        </button>
      </form>

      <p style={styles.status}>{status}</p>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "420px",
    margin: "40px auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    background: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 0 8px rgba(0,0,0,0.1)",
  },
  title: {
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    background: "#007BFF",
    color: "#fff",
    border: "none",
    padding: "10px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  status: {
    marginTop: "15px",
    fontWeight: "bold",
  },
};

export default App;
