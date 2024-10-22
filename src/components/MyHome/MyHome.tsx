import "./MyHome.scss";
import { useState, useEffect } from "react";
import InitialIconByHabitant from "../InitialIconByHabitant/InitialIconByHabitant";
import AddPeople from "../AddPeople/AddPeople";
import DeletePeople from "../DeletePeople/DeletePeople";
import { fetchHomeData } from "../../utils/axios";

interface MyHomeProps {
  homeName: string;
}

interface Home {
  _id: string;
  homeName: string;
  habitants: string[];
  admins: string[];
}

export default function MyHome({ homeName }: MyHomeProps) {
  const [isAddPeopleOpen, setIsAddPeopleOpen] = useState(false);
  const [isDeletePeopleOpen, setIsDeletePeopleOpen] = useState(false);
  const [homeData, setHomeData] = useState<Home | null>(null);
  const [error, setError] = useState(null);

  // Fetch current home data (to get inhabitants)
  useEffect(() => {
    const getHomeData = async () => {
      const data = await fetchHomeData(homeName, setError);
      setHomeData(data);
    };
    getHomeData();
  }, [homeName]);

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

  // Show DeletePeople overlay
  const handleDeletePeople = () => {
    setIsDeletePeopleOpen(true);
  };

  // Close DeletePeople overlay
  const handleCloseDeletePeople = () => {
    setIsDeletePeopleOpen(false);
  };

  return (
    <div className="my-home-all">
      <div className="my-home-content">
        <h3 className="my-home-content__h3">Habitants</h3>
        <div className="my-home-content__people-container">
          {homeData.habitants.map((habitant, index) => (
            <div key={index} className="my-home-content__person">
              <InitialIconByHabitant habitant={habitant} />
              <p className="my-home-content__person-name">{habitant}</p>
            </div>
          ))}
        </div>
        <div className="my-home-content__button-container">
          <button
            className="my-home-content__button"
            onClick={handleDeletePeople}
          >
            DELETE PEOPLE
          </button>
          <button className="my-home-content__button" onClick={handleAddPeople}>
            ADD PEOPLE
          </button>
        </div>
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
