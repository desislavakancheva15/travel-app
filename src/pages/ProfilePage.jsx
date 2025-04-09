import { useEffect, useState } from "react";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";
import DestinationCard from "../components/DestinationCard";

const ProfilePage = () => {
  const { user } = useAuth();
  const [myDestinations, setMyDestinations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/destinations?creatorId=${user.id}`);
        setMyDestinations(res.data);
      } catch (err) {
        console.error("Failed to load destinations");
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">{user.email}'s Destinations</h2>
      {myDestinations.length === 0 ? (
        <p>You haven't added any destinations yet.</p>
      ) : (
        <div className="row g-4">
          {myDestinations.map((d) => (
            <div className="col-sm-12 col-md-6 col-lg-4" key={d.id}>
              <DestinationCard destination={d} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
