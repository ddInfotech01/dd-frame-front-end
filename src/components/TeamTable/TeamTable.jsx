import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function TeamTable({ team }) {
  console.log(team);
  
  const [members, setMembers] = React.useState(team.members);
  const [isEditing, setIsEditing] = React.useState(false);
  const [teamName, setTeamName] = React.useState(team.tea_Name);
  const [teamLeader, setTeamLeader] = React.useState(team.tea_LeaderName);

  // Summing up total orders for the team
  const totalOrders = members.reduce(
    (sum, member) => sum +parseInt(member.mem_TotalOrder),
    0
  );


  // Generate Member ID
  const generateMemberId = (teamId) => {
    console.log(teamId);
    
    const teamPrefix = teamId.slice(-1); // Get the last two characters (e.g., "01" from "Team 01")
    const memberCount =members.filter((m) => m.mem_Code.includes(`DDT${teamPrefix}M`)).length + 1;
    return `DDT${teamPrefix}M${String(memberCount).padStart(3, "0")}`; // Generate ID like DDT01M001
  };

  // Handle coin value updates
  const handleCoinsChange = (id, Name,value) => {
    setMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.mem_Id === id ? { ...member, mem_TotalCoins: value } : member
      )
    );
  };

  // Handle input changes for editable fields
  const handleInputChange = (id, field, value) => {
    setMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.mem_Id === id ? { ...member, [field]: value } : member
      )
    );
  };

  // Toggle edit mode
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  // Delete member
  const handleDeleteMember = (id) => {
    setMembers((prevMembers) =>
      prevMembers.filter((member) => member.mem_Id !== id)
    );
  };

  // Add new member row
  const handleAddNewMember = () => {
    const newMember = {
        mem_Id: members.length+1,
        mem_Name: "",
        mem_Code: generateMemberId(team.tea_Name.trim()),
        mem_Level: 0,
        mem_TotalCoins: 0,
        mem_TotalOrder: 0,
        mem_TotalEarnings: 0,
        mem_PendingAmount: 0
      };
    setMembers([...members, newMember]); 
  };

 

  // Save changes
  const handleSaveChanges = () => {
    // Here you can save the members data to your backend or context
    console.log("Team members updated:", members);
    console.log("Team Leader Name:", team);
    fetch('http://localhost:3000/api/teams/'+team.tea_Id+'/member', { 
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(members),
     }).then(res => res.json()).then((data) => {
      
     
       data.data.map((ele,idx)=>{if(ele.tea_Id==team.tea_Id){setMembers(ele.members);}})
        
        
    }).catch((error) => {
      console.error(error);
    });
    setIsEditing(false);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          {/* Top row displaying team summary */}
          <TableRow>
            <StyledTableCell align="center" colSpan={9}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {isEditing ? (
                  <>
                    <div>
                      <label style={{ marginRight: "10px" }}>Team Name:</label>
                      <input
                        type="text"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        style={{
                          padding: "5px",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ marginRight: "10px" }}>
                        Team Leader:
                      </label>
                      <input
                        type="text"
                        value={teamLeader}
                        onChange={(e) => setTeamLeader(e.target.value)}
                        style={{
                          padding: "5px",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                        }}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <h3>Team Name: {teamName}</h3>
                    <p>Team Leader: {teamLeader}</p>
                  </>
                )}
                <p>Total Orders: {totalOrders}</p>
              </div>
            </StyledTableCell>
          </TableRow>
          {/* Table headers */}
          <TableRow>
            <StyledTableCell align="center">S.No</StyledTableCell>
            <StyledTableCell align="left">Member Id</StyledTableCell>
            <StyledTableCell align="left">Name</StyledTableCell>
            <StyledTableCell align="left">Level</StyledTableCell>
            <StyledTableCell align="left">Coins</StyledTableCell>
            <StyledTableCell align="left">Total Order</StyledTableCell>
            <StyledTableCell align="left">Total Earnings</StyledTableCell>
            <StyledTableCell align="left">Pending Amount</StyledTableCell>
            {isEditing && (
              <StyledTableCell align="center">Action</StyledTableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {members.map((member, index) => (
            <StyledTableRow key={index + 1}>
              <StyledTableCell align="center">{index + 1}</StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {isEditing ? (
                  <input
                    type="text"
                    value={member.mem_Code}
                    readOnly
                    style={{
                      width: "120px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      padding: "4px",
                    }}
                  />
                ) : (
                  member.mem_Code
                )}
              </StyledTableCell>
              <StyledTableCell align="left">
                {isEditing ? (
                  <input
                    type="text"
                    value={member.mem_Name}
                    onChange={(e) =>
                      handleInputChange(member.mem_Id, "mem_Name", e.target.value)
                    }
                    style={{
                      width: "150px",
                      padding: "4px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                  />
                ) : (
                  member.mem_Name
                )}
              </StyledTableCell>
              <StyledTableCell align="left">
                {isEditing ? (
                  <input
                    type="number"
                    value={member.mem_Level}
                    onChange={(e) =>
                      handleInputChange(member.mem_Id, "mem_Level", e.target.value)
                    }
                    style={{
                      width: "60px",
                      padding: "4px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                  />
                ) : (
                  member.mem_Level
                )}
              </StyledTableCell>
              <StyledTableCell align="left">
                {isEditing ? (
                  <input
                    type="number"
                    value={member.mem_TotalCoins}
                    onChange={(e) =>
                      handleCoinsChange(
                        member.mem_Id,
                        "mem_TotalCoins",
                         e.target.value
                      )
                    }
                    style={{
                      width: "60px",
                      padding: "4px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                  />
                ) : (
                  member.mem_TotalCoins
                )}
              </StyledTableCell>
              <StyledTableCell align="left">
                {isEditing ? (
                  <input
                    type="number"
                    value={member.mem_TotalOrder}
                    onChange={(e) =>
                      handleInputChange(
                         member.mem_Id,
                        "mem_TotalOrder",
                         e.target.value
                      )
                    }
                    style={{
                      width: "60px",
                      padding: "4px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                  />
                ) : (
                  member.mem_TotalOrder
                )}
              </StyledTableCell>
              <StyledTableCell align="left">
                {isEditing ? (
                  <input
                    type="number"
                    value={member.mem_TotalEarnings}
                    onChange={(e) =>
                      handleInputChange(
                         member.mem_Id,
                         "mem_TotalEarnings",
                         e.target.value
                      )
                    }
                    style={{
                      width: "80px",
                      padding: "4px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                  />
                ) : (
                  member.mem_TotalEarnings
                )}
              </StyledTableCell>
              <StyledTableCell align="left">
                {isEditing ? (
                  <input
                    type="number"
                    value={member.mem_PendingAmount}
                    onChange={(e) =>
                      handleInputChange(
                         member.mem_Id,
                         "mem_PendingAmount",
                         e.target.value
                      )
                    }
                    style={{
                      width: "80px",
                      padding: "4px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                  />
                ) : (
                  member.mem_PendingAmount
                )}
              </StyledTableCell>
              {isEditing && (
                <StyledTableCell align="center">
                  <IconButton onClick={() => handleDeleteMember(member.mem_Id)}>
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
              )}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      {/* Action Buttons */}
      {isEditing && (
        <div style={{ marginTop: "20px", textAlign: "right" }}>
          <IconButton onClick={handleSaveChanges}>
            <SaveIcon />
          </IconButton>
          <IconButton onClick={handleAddNewMember}>
            <AddIcon />
          </IconButton>
        </div>
      )}
      {!isEditing && (
        <div style={{ marginTop: "20px", textAlign: "right" }}>
          <IconButton onClick={handleEditClick}>
            <EditIcon />
          </IconButton>
        </div>
      )}
    </TableContainer>
  );
}
