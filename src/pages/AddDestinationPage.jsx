import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";

const AddDestinationPage = () => {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !imageUrl || !description) {
      setError("All fields are required.");
      return;
    }

    try {
      await api.post("/destinations", {
        title,
        imageUrl,
        description,
        creatorId: user.id,
      });

      alert("Destination added!");
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Failed to add destination.");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Add New Destination</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title: </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div style={{ marginTop: "1rem" }}>
          <label>Image URL: </label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </div>

        <div style={{ marginTop: "1rem" }}>
          <label>Description: </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <button type="submit" style={{ marginTop: "1rem" }}>
          Add Destination
        </button>
      </form>
    </div>
  );
};

export default AddDestinationPage;
