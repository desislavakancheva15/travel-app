import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("All fields are required.");
      return;
    }

    try {
      // Проверка дали потребителят вече съществува
      const res = await api.get(`/users?email=${email}`);
      if (res.data.length > 0) {
        setError("User already exists.");
        return;
      }

      // Добавяне на нов потребител
      await api.post("/users", { email, password });

      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      setError("Something went wrong.");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div style={{ marginTop: "1rem" }}>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" style={{ marginTop: "1rem" }}>
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
