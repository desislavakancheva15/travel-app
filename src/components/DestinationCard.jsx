import { Link } from "react-router-dom";

const DestinationCard = ({ destination }) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "1rem",
        margin: "1rem 0",
        borderRadius: "8px",
      }}
    >
      <h3>{destination.title}</h3>
      <img
        src={destination.imageUrl}
        alt={destination.title}
        style={{ width: "100%", maxWidth: "400px", height: "auto" }}
      />
      <p>{destination.description}</p>
      <Link to={`/destinations/${destination.id}`}>View Details</Link>
    </div>
  );
};

export default DestinationCard;
