import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import TeamLeaderTable from "../TeamLeaderTable/TeamLeaderTable"; // Import the table component
import "./Teams.css";

// const initialTeamsDetail = [
//   {
//     id: 1,
//     team: "Team 01",
//     teamLeader: "Divya",
//     members: [
//       {
//         id: "DDT01M001",
//         name: "Kavya",
//         level: 2,
//         totalOrder: 2,
//         totalCoins: 50,
//         totalEarnings: 2000,
//         pendingAmount: 1000,
//       },
//       {
//         id: "DDT01M002",
//         name: "Kaviko",
//         level: 2,
//         totalOrder: 3,
//         totalCoins: 100,
//         totalEarnings: 2000,
//         pendingAmount: 1000,
//       },
//       {
//         id: "DDT01M003",
//         name: "Vignesh",
//         level: 2,
//         totalOrder: 5,
//         totalCoins: 90,
//         totalEarnings: 2000,
//         pendingAmount: 1000,
//       },
//       {
//         id: "DDT01M004",
//         name: "Shamila",
//         level: 2,
//         totalOrder: 1,
//         totalCoins: 150,
//         totalEarnings: 2000,
//         pendingAmount: 1000,
//       },
//     ],
//   },
//   {
//     id: 2,
//     team: "Team 02",
//     teamLeader: "Divya",
//     members: [
//       {
//         id: "DDT02M001",
//         name: "Kavya",
//         level: 2,
//         totalOrder: 2,
//         totalCoins: 50,
//         totalEarnings: 2000,
//         pendingAmount: 1000,
//       },
//       {
//         id: "DDT02M002",
//         name: "Kaviko",
//         level: 2,
//         totalOrder: 3,
//         totalCoins: 100,
//         totalEarnings: 2000,
//         pendingAmount: 1000,
//       },
//       {
//         id: "DDT02M003",
//         name: "Vignesh",
//         level: 2,
//         totalOrder: 5,
//         totalCoins: 90,
//         totalEarnings: 2000,
//         pendingAmount: 1000,
//       },
//       {
//         id: "DDT02M004",
//         name: "Shamila",
//         level: 2,
//         totalOrder: 1,
//         totalCoins: 150,
//         totalEarnings: 2000,
//         pendingAmount: 1000,
//       },
//     ],
//   },
//   {
//     id: 3,
//     team: "Team 03",
//     teamLeader: "Divya",
//     members: [
//       {
//         id: "DDT03M001",
//         name: "Kavya",
//         level: 2,
//         totalOrder: 2,
//         totalCoins: 50,
//         totalEarnings: 2000,
//         pendingAmount: 1000,
//       },
//       {
//         id: "DDT03M002",
//         name: "Kaviko",
//         level: 2,
//         totalOrder: 3,
//         totalCoins: 100,
//         totalEarnings: 2000,
//         pendingAmount: 1000,
//       },
//       {
//         id: "DDT03M003",
//         name: "Vignesh",
//         level: 2,
//         totalOrder: 5,
//         totalCoins: 90,
//         totalEarnings: 2000,
//         pendingAmount: 1000,
//       },
//       {
//         id: "DDT03M004",
//         name: "Shamila",
//         level: 2,
//         totalOrder: 1,
//         totalCoins: 150,
//         totalEarnings: 2000,
//         pendingAmount: 1000,
//       },
//     ],
//   },
// ];

// const TeamLeaderDetail = [
//   {
//     id: "DDT01L001",
//     name: "tlname1",
//     team: "Team 01",
//     level: 2,
//     totalOrder: 2,
//     totalCoins: 50,
//     totalEarnings: 2000,
//     pendingAmount: 1000,
//   },
//   {
//     id: "DDT02L002",
//     name: "tlname2",
//     team: "Team 02",
//     level: 2,
//     totalOrder: 2,
//     totalCoins: 50,
//     totalEarnings: 2000,
//     pendingAmount: 1000,
//   },
//   {
//     id: "DDT03L003",
//     name: "tlname3",
//     team: "Team 03",
//     level: 2,
//     totalOrder: 2,
//     totalCoins: 50,
//     totalEarnings: 2000,
//     pendingAmount: 1000,
//   },
// ];

const Teams = () => {
  const navigate = useNavigate();
  const [teamsDetail, setTeamsDetail] = useState([]);
  useEffect(() => {
    fetch("http://localhost:7000/api/teams", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
      
        setTeamsDetail(data);
      })
      .catch((error) => {
        console.error("Error fetching teams:", error);
      });
  }, []);


  const handleTeamClick = (team) => {
    navigate(`/team/${team.tea_Id}`, { state: { team } });
  };

  const handleAddTeam = () => {

    var prefixlcode="";
  
    if(teamsDetail.length+1 < 10){
       prefixlcode="00"+(teamsDetail.length+1);
    }else if(teamsDetail.length+1 > 9 && teamsDetail.length+1 < 100 ){
      prefixlcode="0"+(teamsDetail.length+1);
    }else{
      prefixlcode=(teamsDetail.length+1);
    }

    const newLeader = {
      tea_Id: teamsDetail.length + 1,
      tea_Name: `Team ${String.fromCharCode(65+teamsDetail.length) }`,
      tea_LeaderName: "",
      tea_LeaderCode:`DDT${String.fromCharCode(65+teamsDetail.length)}L${prefixlcode}`,
      tea_Level: 0,
      tea_TotalCoins: 0,
      tea_TotalOrder: 0,
      tea_TotalEarnings: 0,
      tea_PendingAmount: 0,
      members: []
      };
    setTeamsDetail([...teamsDetail, newLeader]); // Add new team to the state
    console.log(teamsDetail);
    
  };

  return (
    <div className="teams-bg-container">
      <Sidebar />
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginLeft: "20%",
          marginBottom: "50px",
        }}
      >
        <div className="teams-chart-container">
          <div className="dd-group-container">
            <h1 className="head-chart-container">DD GROUPS</h1>
          </div>
          <ul className="sub-trees-ul-container">
            {teamsDetail.map((eachItem, index) => (
              <li
                key={index + 1}
                className="chart-container"
                onClick={() => handleTeamClick(eachItem)}
                style={{ cursor: "pointer" }}
              >
                <h1>{eachItem.tea_Name}</h1>
              </li>
            ))}
          </ul>
        </div>

        {/* Add Team Button */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <button
            onClick={handleAddTeam}
            style={{
              padding: "10px 20px",
              backgroundColor: "#24a0ed",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Add New Team
          </button>
        </div>

        <div style={{ marginTop: "20px" }}>
          <h2
            style={{
              fontFamily: "Poppins",
              fontSize: "28px",
              color: "#000000",
              fontWeight: "500",
              textAlign: "center",
              marginBottom: "50px",
            }}
          >
            TEAM LEADER DETAILS
          </h2>
          <TeamLeaderTable teamLeaderDetail={teamsDetail}  setteamLeaderDetail={setTeamsDetail}/>
        </div>
      </div>
    </div>
  );
};

export default Teams;
