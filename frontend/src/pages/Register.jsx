import { useState } from "react";
import api from "../utils/api";

function Register({ onSwitch }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const res = await api.post("/auth/register", form);
      setMessage(res.data.message);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      setMessage("");
    }
  };

  return (
    <div className="auth-card">
      <h2>Create Account</h2>
      <input name="name" placeholder="Full Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <button onClick={handleRegister}>Register</button>
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
      <p>Already have an account? <span onClick={onSwitch}>Login here</span></p>
    </div>
  );
}

export default Register;
