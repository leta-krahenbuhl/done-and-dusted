import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import "./MyHome.scss";
import { useState, useEffect } from "react";
import InitialIconByHabitant from "../InitialIconByHabitant/InitialIconByHabitant";
import AddPeople from "../AddPeople/AddPeople";
import DeletePeople from "../DeletePeople/DeletePeople";
import { fetchHomeData } from "../../utils/axiosCalls";
export default function MyHome({ homeName }) {
    const [isAddPeopleOpen, setIsAddPeopleOpen] = useState(false);
    const [isDeletePeopleOpen, setIsDeletePeopleOpen] = useState(false);
    const [homeData, setHomeData] = useState(null);
    const [error, setError] = useState(null);
    // Fetch current home data (to get inhabitants)
    useEffect(() => {
        const getHomeData = async () => {
            try {
                const data = await fetchHomeData(homeName);
                setHomeData(data);
            }
            catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                }
                else {
                    setError("An unknown error occurred.");
                }
            }
        };
        getHomeData();
    }, [homeName]);
    // Error handling
    if (error) {
        return _jsxs("div", { children: ["Error: ", error] });
    }
    // Show loading message while loading homeData
    if (!homeData) {
        return _jsx("div", { children: "Loading..." });
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
    return (_jsx("div", { className: "my-home-all", children: _jsxs("div", { className: "my-home-content", children: [_jsx("h3", { className: "my-home-content__h3", children: "Habitants" }), _jsx("div", { className: "my-home-content__people-container", children: homeData.habitants.map((habitant, index) => (_jsxs("div", { className: "my-home-content__person", children: [_jsx(InitialIconByHabitant, { habitant: habitant }), _jsx("p", { className: "my-home-content__person-name", children: habitant })] }, index))) }), _jsxs("div", { className: "my-home-content__button-container", children: [_jsx("button", { className: "my-home-content__button", onClick: handleDeletePeople, children: "DELETE PEOPLE" }), _jsx("button", { className: "my-home-content__button", onClick: handleAddPeople, children: "ADD PEOPLE" })] }), _jsx(DeletePeople, { homeName: homeName, isDeletePeopleOpen: isDeletePeopleOpen, setIsDeletePeopleOpen: setIsDeletePeopleOpen, handleCloseDeletePeople: handleCloseDeletePeople }), _jsx(AddPeople, { homeName: homeName, isAddPeopleOpen: isAddPeopleOpen, setIsAddPeopleOpen: setIsAddPeopleOpen, handleCloseAddPeople: handleCloseAddPeople })] }) }));
}
