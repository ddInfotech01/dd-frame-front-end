import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./AdminDashboard.css";
import Sidebar from "../Sidebar/Sidebar";
import DashboardTable from "../DashboardTable/DashboardTable";
import { useEffect } from "react";

function AdminDashboard() {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleNavigation = () => {
    navigate("/offerdetails"); // Navigate to the /offerdetails path
  };
  const [latestOffer, setLatestOffer] = React.useState(null);
  const [allOrders, setAllOrders] = React.useState([]);

  useEffect(() => {
    fetch("http://localhost:7000/api/customizeoffer")
      .then((res) => res.json())
      .then((json) => {
        setAllOrders(json);
        const sortedData = json.sort(
          (a, b) => new Date(b.ofer_Date) - new Date(a.ofer_Date)
        );
        const latest = sortedData[0];
        setLatestOffer(latest);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="admin-dashboard-container">
      <Sidebar />
      <div className="main-content">
        <h1
          style={{
            fontFamily: "Poppins",
            fontSize: "30px",
            color: "#000000",
            fontWeight: "500",
            textAlign: "center",
            marginBottom: "50px",
          }}
        >
          ADMIN DASHBOARD
        </h1>
        <div className="main-cards">
          <div className="card">
            <div className="card-inner">
              <h3>Total Order</h3>
            </div>
            <h1>0</h1>
          </div>
          <div className="card">
            <div className="card-inner">
              <h3>Total Order Amount</h3>
            </div>
            <h1>0</h1>
          </div>
          <div className="card">
            <div className="card-inner">
              <h3>T.Manufacturing Amount</h3>
            </div>
            <h1>0</h1>
          </div>
          <div className="card">
            <div className="card-inner">
              <h3>T.Teamleader Amount</h3>
            </div>
            <h1>0</h1>
          </div>
          <div className="card">
            <div className="card-inner">
              <h3>T.Team Member Amount</h3>
            </div>
            <h1>0</h1>
          </div>
          <div className="card">
            <div className="card-inner">
              <h3>Total Profit</h3>
            </div>
            <h1>0</h1>
          </div>
          <div className="card">
            <div className="card-inner">
              <h3>T.Offer Amount</h3>
            </div>
            <h1>0</h1>
          </div>
          <div className="card">
            <div className="card-inner">
              <h3>T.Courier Amount</h3>
            </div>
            <h1>0</h1>
          </div>
        </div>
        <div className="dashboard-table-offer-container">
          <div style={{ width: "75%" }}>
            <h1
              style={{
                fontFamily: "Poppins",
                fontSize: "30px",
                color: "#000000",
                fontWeight: "500",
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              TODAY ORDERS
            </h1>
            <DashboardTable allOrders={allOrders} />
          </div>
          <div className="current-offer-bg">
            <h2
              style={{
                fontFamily: "Poppins",
                fontSize: "30px",
                color: "#000000",
                fontWeight: "500",
                textAlign: "center",
                margin: "20px",
              }}
            >
              CURRENT OFFER
            </h2>
            <div
              style={{
                alignSelf: "flex-start",
                paddingLeft: "40px",
                paddingBottom: "30px",
              }}
            >
              <p>Offer Code: {latestOffer ? latestOffer.ofr_Code : ""}</p>
              <p>
                Offer Amount: {latestOffer ? latestOffer.cus_OfferAmount : ""}
              </p>
              <p>Date: {latestOffer ? latestOffer.ofer_Date : ""}</p>
            </div>
            <div className="btn-container">
              {/* Attach navigation to buttons */}
              <button
                className="btn-style-create-ofr"
                onClick={handleNavigation}
              >
                Create Offer
              </button>
              <button className="btn-style" onClick={handleNavigation}>
                View Offer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
