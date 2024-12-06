import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import "reactjs-popup/dist/index.css";
import OfTable from "../OfTable/OfTable";
import "./OfferDetails.css";
import CreateOffer from "../CreateOffer/CreateOffer";
import { Button } from "react-bootstrap";
import CenteredModal from "../CenteredModal/CenteredModal";
import { IoSearchOutline } from "react-icons/io5";

const OfferDetails = () => {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <div className="offer-details-bg">
      <Sidebar />
      <div
        style={{
          width: "100%",
          padding: "30px 50px",
          marginLeft: "20%",
          width: "80%",
        }}
      >
        <h1
          style={{
            fontFamily: "Poppins",
            fontSize: "30px",
            color: "#000000",
            fontWeight: "500",
            textAlign: "center",
            paddingBottom: "20px",
          }}
        >
          OFFER DETAILS
        </h1>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "20px",
          }}
        >
          <div className="offer-detail-search-icon">
            <IoSearchOutline style={{ fontSize: "25px", margin: "10px" }} />
            <input type="search" />
          </div>
        </div>
        <OfTable />
        <div style={{ textAlign: "center", margin: "30px" }}>
          <Button className="btn-style" onClick={() => setModalShow(true)}>
            Create Offer
          </Button>
          <CenteredModal show={modalShow} onHide={() => setModalShow(false)} setModalShow={setModalShow} />
        </div>
      </div>
    </div>
  );
};

export default OfferDetails;
