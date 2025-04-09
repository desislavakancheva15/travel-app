import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";

const EditDestinationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get(`/destinations/${id}`);
      if (res.data.creatorId !== user.id) {
        alert("You are not authorized to edit this destination.");
        navigate("/");
      } else {
        setTitle(res.data.title);
        setImageUrl(res.data.imageUrl);
        setDescription(res.data.description);
      }
    };

    fetchData();
  }, [id, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/destinations/${id}`, {
        title,
        imageUrl,
        description,
        creatorId: user.id,
      });
      alert("Destination updated!");
      navigate(`/destinations/${id}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Edit Destination</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title: </label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div style={{ marginTop: "1rem" }}>
          <label>Image URL: </label>
          <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
        </div>
        <div style={{ marginTop: "1rem" }}>
          <label>Description: </label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <button type="submit" style={{ marginTop: "1rem" }}>
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditDestinationPage;
