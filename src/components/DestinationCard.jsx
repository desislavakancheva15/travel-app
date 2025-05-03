import { Link } from "react-router-dom";

const DestinationCard = ({ destination }) => {
  return (
    <div className="card mb-4 shadow-sm" style={{ maxWidth: "600px" }}>
      {destination.imageUrl && (
        <img
          src={destination.imageUrl}
          className="card-img-top"
          alt={destination.title}
          style={{ height: "300px", objectFit: "cover" }}
        />
      )}
      <div className="card-body">
        <h5 className="card-title">{destination.title}</h5>
        <p className="card-text">{destination.description}</p>
        <Link to={`/destinations/${destination.id}`} className="btn btn-primary">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default DestinationCard;
