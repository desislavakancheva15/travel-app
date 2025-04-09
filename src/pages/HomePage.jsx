import { useEffect, useState } from "react";
import api from "../api/api";
import DestinationCard from "../components/DestinationCard";

const HomePage = () => {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get("/destinations");
      setDestinations(res.data);
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">All Travel Destinations</h2>

      {destinations.length === 0 ? (
        <p>No destinations added yet.</p>
      ) : (
        <div className="row g-4">
          {destinations.map((d) => (
            <div className="col-sm-12 col-md-6 col-lg-4" key={d.id}>
              <DestinationCard destination={d} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
