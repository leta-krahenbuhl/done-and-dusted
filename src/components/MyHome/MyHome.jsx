import "./MyHome.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import InitialIconByHabitant from "../InitialIconByHabitant/InitialIconByHabitant";
import AddPeople from "../AddPeople/AddPeople";
import DeletePeople from "../DeletePeople/DeletePeople";

export default function MyHome({ homeName }) {
  const [isAddPeopleOpen, setIsAddPeopleOpen] = useState(false);
  const [isDeletePeopleOpen, setIsDeletePeopleOpen] = useState(false);

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

  // Error handling
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Show loading message while loading homeData
  if (!homeData) {
    return <div>Loading...</div>;
  }

  // Show AddPeople overlay
  const handleAddPeople = () => {
    setIsAddPeopleOpen(true);
  };

  // Close AddPeople overlay
  const handleCloseAddPeople = () => {
    setIsAddPeopleOpen(false);
  };

  // Show AddPeople overlay
  const handleDeletePeople = () => {
    setIsDeletePeopleOpen(true);
  };

  // Close AddPeople overlay
  const handleCloseDeletePeople = () => {
    setIsDeletePeopleOpen(false);
  };

  return (
    <div className="my-home-all">
      <div className="my-home-content">
        <h3 className="my-home-content__h3">People</h3>
        <div className="my-home-content__people-container">
          {homeData.habitants.map((habitant, index) => (
            <div key={index} className="my-home-content__person">
              <InitialIconByHabitant habitant={habitant} />
              <p className="my-home-content__person-name">{habitant}</p>
            </div>
          ))}
        </div>
        <button
          className="my-home-content__button"
          onClick={handleDeletePeople}
        >
          DELETE PEOPLE
        </button>
        <button className="my-home-content__button" onClick={handleAddPeople}>
          ADD PEOPLE
        </button>

        <DeletePeople
          homeName={homeName}
          isDeletePeopleOpen={isDeletePeopleOpen}
          setIsDeletePeopleOpen={setIsDeletePeopleOpen}
          handleCloseDeletePeople={handleCloseDeletePeople}
        />
        <AddPeople
          homeName={homeName}
          isAddPeopleOpen={isAddPeopleOpen}
          setIsAddPeopleOpen={setIsAddPeopleOpen}
          handleCloseAddPeople={handleCloseAddPeople}
        />
      </div>
    </div>
  );
}
