import "./MyHome.scss";
import { useState, useEffect } from "react";
import axios from "axios";

export default function MyHome({ homeName }) {
  const [homeData, setHomeData] = useState(null);
  const [error, setError] = useState(null);

  // Fetch current home data (to get inhabitants)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/homes/get-current", {
          params: { homeName },
        });
        setHomeData(response.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "An error occurred");
      }
    };

    fetchData();
  }, [homeName]); // Ensure it runs when homeName changes

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Show loading message while loading homeData
  if (!homeData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="my-home-all">
      <div className="my-home-content">
        <h3 className="my-home-content__h3">People</h3>
        <div className="my-home-content__people-container">
          {homeData.habitants.map((habitant, index) => (
            <div key={index} className="my-home-content__person">
              <img
                src={`/image.jpg`}
                alt={`avatar`}
                className="my-home-content__person-image"
              />
              <p className="my-home-content__person-name">{habitant}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
