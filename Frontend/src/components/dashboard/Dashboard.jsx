/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";

const Dashboard = () => {
    const [repositories, setRepositories] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestedRepositories, setSuggestedRepositories] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            console.error("User ID not found in localStorage.");
            return;
        }

        const fetchRepositories = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3000/api/v1/fetchRepo/67719745b224e27f3c20210a`
                );
                if (!response.ok) {
                    console.error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                console.log(data)
                setRepositories(data.repositories);
            } catch (error) {
                console.error("Error while fetching repositories: ", error);
            }
        };

        fetchRepositories();

        const fetchSuggestedRepositories = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3000/api/v1/repo/getAllRepo/${userId}`
                );
                const data = await response.json();
                console.log(data);
                setSuggestedRepositories(data.repositories);
            } catch (error) {
                console.error("Error while fetching repositories: ", error);
            }
        };

        // fetchSuggestedRepositories();
    }, []);

    return (
        <div className="w-full h-screen bg-black text-white flex justify-center items-center">
            <h1 className="text-center font-extrabold">WELCOME TO DASHBOARD</h1>
        </div>
    );
};

export default Dashboard;
