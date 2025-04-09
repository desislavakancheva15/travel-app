import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";

const DestinationDetails = () => {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const [error, setError] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const res = await api.get(`/destinations/${id}`);
        setDestination(res.data);
      } catch (err) {
        setError("Destination not found.");
      }
    };

    fetchDestination();
  }, [id]);

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this?");
    if (!confirm) return;

    try {
      await api.delete(`/destinations/${id}`);
      alert("Deleted!");
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Failed to delete destination.");
    }
  };

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!destination) return <p>Loading...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>{destination.title}</h2>
      <img
        src={destination.imageUrl}
        alt={destination.title}
        style={{ width: "100%", maxWidth: "600px", height: "auto" }}
      />
      <p>{destination.description}</p>

      {user && user.id === destination.creatorId && (
  <div style={{ marginTop: "1rem" }}>
    <button onClick={handleDelete} style={{ marginRight: "1rem" }}>
      Delete
    </button>
    <button onClick={() => navigate(`/edit/${destination.id}`)}>
      Edit
    </button>
  </div>
)}


    </div>
  );
};

export default DestinationDetails;
