import React from "react";
import Button from "@mui/material/Button";
import "./OrderEntry.css";
import Sidebar from "../Sidebar/Sidebar";
import { useState, useEffect } from "react";

const OrderEntry = () => {
  const [orderCode, setOrderCode] = useState("DDORR001");
  const [teamdetails, setTeamdetails] = useState();
  const [member, setMember] = useState();
  const [membercode, setMemberCode] = useState();
  const [offerdetails, setOfferDetails] = useState();
  useEffect(() => {
    fetch("http://localhost:7000/api/teams")
      .then((res) => res.json())
      .then((json) => setTeamdetails(json))
      .catch((err) => console.log(err));

    fetch("http://localhost:7000/api/customizeoffer")
      .then((res) => res.json())
      .then((json) => {
        const sortedData = json.sort((a, b) => {
          return new Date(b.ofer_Date) - new Date(a.ofer_Date);
        });
        setOfferDetails(sortedData);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleMemberChange = (e) => {
    setMember(parseInt(e.target.value)); // Parse as integer
  };

  function handleOrderSubmit(e) {
    e.preventDefault();
console.log(e);

    const newOrder = {
      ord_TeamName: e.target[1].options[e.target[1].selectedIndex].text,
      ord_Date: e.target[6].value,
      ord_MamberName: e.target[2].options[e.target[2].selectedIndex].text,
      ord_MemberCode: e.target[3].value,
      ord_Code: e.target[0].value,
      ord_ManufactureCost: 0,
      ord_MemberAmount: 0,
      ord_TeamLeaderAmount: 0,
      ord_CourierAmount: 0,
      ord_Cost: 0,
      ord_Profit: 0,
      ord_Quantity: e.target[5].value,
    };
    fetch("http://localhost:7000/api/customizeoffer/" + e.target[4].value + "/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newOrder),
    })
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch((err) => console.log(err));
  }

  return (
    <div className="order-main-bg">
      <Sidebar />
      <div
        style={{
          marginLeft: "20%",
          width: "80%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="order-bg-container">
          <h1
            style={{
              fontFamily: "Poppins",
              fontSize: "30px",
              color: "black",
              fontWeight: "500",
              textAlign: "center",
            }}
          >
            ORDER ENTRY
          </h1>
          <form onSubmit={(e) => handleOrderSubmit(e)}>
            <div className="input-card">
              <label>Order Id</label>
              <input
                type="text"
                placeholder="Enter Order Id"
                value={"DDORR001"}
                disabled
              />
            </div>
            <div>
              <div className="input-card">
                <label>Team</label>
                <select name="" id="" onChange={handleMemberChange}>
                  <option value="">Plese Select</option>
                  {teamdetails && teamdetails.length > 0 ? (
                    teamdetails.map((item, index) => (
                      <option
                        key={index}
                        value={item.tea_Id}
                        defaultValue={item.tea_Name}
                      >
                        {item.tea_Name} - {item.tea_LeaderName}
                      </option>
                    ))
                  ) : (
                    <option>No teams available</option>
                  )}
                </select>
              </div>

              <div className="input-card">
                <label>Name</label>
                <select
                  name=""
                  id=""
                  onChange={(e) => setMemberCode(e.target.value)}
                >
                  <option value="">Plese Select</option>
                  {teamdetails && member !== null ? (
                    // Filter the teamdetails by the selected team ID and map through its members
                    teamdetails
                      .filter((item) => item.tea_Id === member) // Ensure member is used as an integer
                      .flatMap((item) =>
                        item.members
                          ? item.members.map((mem, index) => (
                              <option key={index} value={mem.mem_Code}>
                                {mem.mem_Name}
                              </option>
                            ))
                          : []
                      )
                  ) : (
                    <option>No members available</option>
                  )}
                </select>
              </div>
            </div>
            <div className="input-card">
              <label>Member Id</label>
              <input
                type="text"
                placeholder="Enter Id"
                value={membercode ? membercode : ""}
                disabled
              />
            </div>

            <div className="input-card">
              <label>Offer Code</label>
              <select name="" id="">
                {offerdetails && offerdetails.length > 0 ? (
                  offerdetails.map((item, index) => (
                    <option key={index} value={item.ofr_Code}>
                      {item.ofr_Code}
                    </option>
                  ))
                ) : (
                  <option>No offers available</option>
                )}
              </select>
            </div>
            <div className="input-card">
              <label>Quantity</label>
              <input type="text" placeholder="Enter Quantity" />
            </div>
            <div className="input-card">
              <label>Date</label>
              <input type="date" />
            </div>

            <div
              style={{
                marginBottom: "30px",
                alignSelf: "flex-end",
                paddingRight: "70px",
              }}
            >
              <Button variant="contained" type="submit">
                Order Placed
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderEntry;
