import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
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

const TeamLeaderTable = ({
  teamLeaderDetail,
  setteamLeaderDetail,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  // const [leaders, teamLeaderDetail] = useState(teamLeaderDetail);
  
  const handleInputChange = (id, field, value) => {
    setteamLeaderDetail((prevLeaders) =>
      prevLeaders.map((leader) =>
        leader.tea_Id === id ? { ...leader, [field]: value } : leader
      )
    );
  };
 useEffect(()=>{

 },[teamLeaderDetail])
  const handleSaveChanges = () => {
    if (onUpdate) {
      onUpdate(teamLeaderDetail);
    }
  
          fetch("http://localhost:7000/api/teams",{
            method:"POST",
            headers:{
              "Content-Type": "application/json",
            },
            body:JSON.stringify(teamLeaderDetail)
          })
    
    
    setIsEditing(false);
  };

  const handleDeleteLeader = (id) => {
  var target; 
  
    teamLeaderDetail.map((ele,idx)=>{
      if(ele.tea_Id==id){
        target=ele;
      }
    })
    
    if(target._id){
    fetch("http://localhost:7000/api/leader",{
      method:"DELETE",
      headers:{
       "Content-Type": "application/json",
      },
      body:JSON.stringify(target)
    }).then(res=>res.json()).then((data)=>{
      console.log(data);
      
       setteamLeaderDetail(data);
    })
  }else{
    setteamLeaderDetail((prevLeaders) =>
      prevLeaders.filter((leader) => leader.tea_Id !== id)
    );
  }

  };

  const handleAddNewLeader = () => {
    var prefixlcode="";
  
    if(teamLeaderDetail.length+1 < 10){
       prefixlcode="00"+(teamLeaderDetail.length+1);
    }else if(teamLeaderDetail.length+1 > 9 && teamLeaderDetail.length+1 < 100 ){
      prefixlcode="0"+(teamLeaderDetail.length+1);
    }else{
      prefixlcode=(teamLeaderDetail.length+1);
    }

    const newLeader = {
      tea_Id: teamLeaderDetail.length + 1,
      tea_Name: `Team ${String.fromCharCode(65+teamLeaderDetail.length) }`,
      tea_LeaderName: "",
      tea_LeaderCode:`DDT${String.fromCharCode(65+teamLeaderDetail.length)}L${prefixlcode}`,
      tea_Level: 0,
      tea_TotalCoins: 0,
      tea_TotalOrder: 0,
      tea_TotalEarnings: 0,
      tea_PendingAmount: 0,
      members: []
      };
    setteamLeaderDetail((prevLeaders) => [...prevLeaders, newLeader]);
    setIsEditing(true); // Switch to editing mode when a new leader is added
  };
 
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="team leader table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">S.No</StyledTableCell>
            <StyledTableCell>TL Id</StyledTableCell>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Team</StyledTableCell>
            <StyledTableCell align="center">Level</StyledTableCell>
            <StyledTableCell align="center">Total Orders</StyledTableCell>
            <StyledTableCell align="center">Total Coins</StyledTableCell>
            <StyledTableCell align="center">Total Earnings</StyledTableCell>
            <StyledTableCell align="center">Pending Amount</StyledTableCell>
            {isEditing && (
              <StyledTableCell align="center">isActive</StyledTableCell>
            )}
          </TableRow>
        </TableHead>

        <TableBody>
          {teamLeaderDetail.map((leader, index) => (
            <StyledTableRow key={index + 1}>
              <StyledTableCell align="center">{index + 1}</StyledTableCell>
              <StyledTableCell>
                {isEditing ? (
                  <TextField
                    size="small"
                    value={leader.tea_LeaderCode}
                    onChange={(e) =>
                      handleInputChange(
                        leader.tea_Id,
                        "tea_LeaderCode",
                        e.target.value
                      )
                    }
                  />
                ) : (
                  leader.tea_LeaderCode
                )}
              </StyledTableCell>
              <StyledTableCell align="center">
                {isEditing ? (
                  <TextField
                    size="small"
                    value={leader.tea_LeaderName}
                    onChange={(e) =>
                      handleInputChange(
                        leader.tea_Id,
                        "tea_LeaderName",
                        e.target.value
                      )
                    }
                  />
                ) : (
                  leader.tea_LeaderName
                )}
              </StyledTableCell>
              <StyledTableCell align="center">
                {isEditing ? (
                  <TextField
                    size="small"
                    value={leader.tea_Name}
                    onChange={(e) =>
                      handleInputChange(
                        leader.tea_Id,
                        "tea_Name",
                        e.target.value
                      )
                    }
                  />
                ) : (
                  leader.tea_Name
                )}
              </StyledTableCell>
              <StyledTableCell align="center">
                {isEditing ? (
                  <TextField
                    size="small"
                    type="number"
                    value={leader.tea_Level}
                    onChange={(e) =>
                      handleInputChange(leader.tea_Id, "tea_Level", e.target.value)
                    }
                  />
                ) : (
                  leader.tea_Level
                )}
              </StyledTableCell>
              <StyledTableCell align="center">
                {isEditing ? (
                  <TextField
                    size="small"
                    type="number"
                    value={leader.tea_TotalOrder}
                    onChange={(e) =>
                      handleInputChange(
                        leader.tea_Id,
                        "tea_TotalOrder",
                        e.target.value
                      )
                    }
                  />
                ) : (
                  leader.tea_TotalOrder
                )}
              </StyledTableCell>
              <StyledTableCell align="center">
                {isEditing ? (
                  <TextField
                    size="small"
                    type="number"
                    value={leader.tea_TotalCoins}
                    onChange={(e) =>
                      handleInputChange(
                        leader.tea_Id,
                        "tea_TotalCoins",
                        e.target.value
                      )
                    }
                  />
                ) : (
                  leader.tea_TotalCoins
                )}
              </StyledTableCell>
              <StyledTableCell align="center">
                {isEditing ? (
                  <TextField
                    size="small"
                    type="number"
                    value={leader.tea_TotalEarnings}
                    onChange={(e) =>
                      handleInputChange(
                        leader.tea_Id,
                        "tea_TotalEarnings",
                        e.target.value
                      )
                    }
                  />
                ) : (
                  leader.tea_TotalEarnings
                )}
              </StyledTableCell>
              <StyledTableCell align="center">
                {isEditing ? (
                  <TextField
                    size="small"
                    type="number"
                    value={leader.tea_PendingAmount}
                    onChange={(e) =>
                      handleInputChange(
                        leader.tea_Id,
                        "tea_PendingAmount",
                        e.target.value
                      )
                    }
                  />
                ) : (
                  leader.tea_PendingAmount
                )}
              </StyledTableCell>
              {isEditing && (
                <StyledTableCell align="center">
                  <IconButton onClick={() => handleDeleteLeader(leader.tea_Id)}>
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
              )}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <div style={{ textAlign: "right", marginTop: "20px" }}>
        {isEditing ? (
          <>
            <IconButton onClick={handleAddNewLeader}>
              <AddIcon />
            </IconButton>
            <IconButton onClick={handleSaveChanges}>
              <SaveIcon />
            </IconButton>
          </>
        ) : (
          <IconButton onClick={() => setIsEditing(true)}>
            <EditIcon />
          </IconButton>
        )}  
      </div>
    </TableContainer>
  );
};

export default TeamLeaderTable;
