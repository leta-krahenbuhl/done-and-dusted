import "./Home.scss";
import cleaningWoman from "../../assets/images/cleaning-woman.svg";
import { useState } from "react";
import AddHome from "../../components/AddHome/AddHome";

export default function Home() {
<<<<<<< Updated upstream
  return <div className="home"></div>;
=======
  const [isAddHomeOpen, setIsAddHomeOpen] = useState(false);

  const handleAddHome = () => {
    setIsAddHomeOpen(true);
  };

  const handleCloseAddHome = () => {
    setIsAddHomeOpen(false);
  };

  return (
    <div className="home-all">
      <Header />
      <article className="home">
        <img src={cleaningWoman} alt="logo" className="home__image" />
        <div className="home__text-container">
          <h1 className="home__header">Welcome to Done&Dusted.</h1>
          <p className="home__text-big">
            You're not part of a home yet. Ask a home admin to add you on their
            home, or set up your own home to get started.
          </p>
          <button className="home__button" onClick={handleAddHome}>
            ADD A HOME
          </button>
        </div>
      </article>
      <AddHome
        isAddHomeOpen={isAddHomeOpen}
        handleCloseAddHome={handleCloseAddHome}
      />
    </div>
  );
>>>>>>> Stashed changes
}
