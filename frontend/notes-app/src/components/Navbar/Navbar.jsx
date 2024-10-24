import React, { useState, useEffect } from "react";
import ProfileInfo from "../Cards/ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import '../../index.css';  // Import the CSS file

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    const navigate = useNavigate();

    // Logout function
    const onLogout = () => {
        localStorage.clear(); // Clear local storage (assuming it holds user data)
        navigate("/login"); // Navigate to the login page
    };

    // Search function
    const handleSearch = () => {
        if (searchQuery) {
            onSearchNote(searchQuery); // Call the parent component's search function
        }
    };

    // Clear search function
    const onClearSearch = () => {
        setSearchQuery("");
        handleClearSearch(); // Call the parent component's clear search function
    };

    // Toggle dark mode function
    const toggleDarkMode = () => {
        setIsDarkTheme(!isDarkTheme); // Toggle the dark mode state
    };

    // Effect to toggle body classes based on dark mode state
    useEffect(() => {
        if (isDarkTheme) {
            document.body.classList.add('dark-theme');
            document.body.classList.remove('light-theme');
        } else {
            document.body.classList.add('light-theme');
            document.body.classList.remove('dark-theme');
        }
    }, [isDarkTheme]);

    return (
        <div className="bg-[#ece5dd] flex items-center justify-between px-6 py-2 drop-shadow">
            <h2 className="text-xl font-medium text-black py-2">Notes</h2>

            <div style={{ minWidth: '200px' }}>
                <SearchBar
                    value={searchQuery}
                    onChange={({ target }) => setSearchQuery(target.value)}
                    handleSearch={handleSearch}
                    onClearSearch={onClearSearch}
                />
            </div>

            <div className="flex items-center">
                <button
                    onClick={toggleDarkMode}
                    className="text-gray-500 mr-5 dark:text-gray-200 focus:outline-none"
                    aria-label="Toggle Dark Mode"
                    style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <FontAwesomeIcon
                        icon={isDarkTheme ? faSun : faMoon}
                        size="lg"
                        style={{ color: isDarkTheme ? "white" : "black" }}
                    />
                </button>

                <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
            </div>
        </div>
    );
};

export default Navbar;
