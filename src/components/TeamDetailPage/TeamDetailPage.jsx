import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import Sidebar from '../Sidebar/Sidebar';
import "./TeamDetailPage.css";
import TeamTable from "../TeamTable/TeamTable";

const TeamDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Hook for navigation
  const { team } = location.state || {}; // Access the passed team data

  if (!team) {
    return <p>No team data available</p>; // Fallback if no data is passed
  }

  const handleBackClick = () => {
    navigate('/teams'); // Navigate to the /teams page
  };

  return (
    <div style={{ display: "flex",backgroundColor: "#f5f5f5"}}>
      <Sidebar />
      <div style={{ marginLeft:"20%",width: "80%", height: "100vh", backgroundColor: "#f5f5f5", padding: "100px" }}>
        <TeamTable team={team} />
        <div style={{ textAlign: "center", margin: "40px" }}>
          <button className="btn-style-team-page" onClick={handleBackClick}>
            Back To Team Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamDetailPage;
