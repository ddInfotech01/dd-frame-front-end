import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { BsGrid1X2Fill, BsPeopleFill, BsGiftFill, BsListUl, BsFillPenFill,BsBoxSeamFill } from 'react-icons/bs';
import { BiSolidOffer } from "react-icons/bi";
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation(); // Get current path

  return (
    <div className='sidebar-main-bg'>
      <ul className='sidebar-ul'>
        <Link to="/" className={`remove-line ${location.pathname === "/" ? "active-link" : ""}`}>
          <li>
            <BsGrid1X2Fill />
            <h1>Dashboard</h1>
          </li>
        </Link>
        <Link to="/offerdetails" className={`remove-line ${location.pathname === "/offerdetails" ? "active-link" : ""}`}>
          <li>
            <BiSolidOffer />
            <h1>Offer Details</h1>
          </li>
        </Link>
        <Link to="/teams" className={`remove-line ${location.pathname === "/teams" ? "active-link" : ""}`}>
          <li>
            <BsPeopleFill />
            <h1>Teams</h1>
          </li>
        </Link>
        <Link to="/orderentry" className={`remove-line ${location.pathname === "/orderentry" ? "active-link" : ""}`}>
          <li>
            <BsFillPenFill />
            <h1>Order Entry</h1>
          </li>
        </Link>
        <Link to="/orderstatus" className={`remove-line ${location.pathname === "/orderstatus" ? "active-link" : ""}`}>
          <li>
            <BsListUl />
            <h1>Order Status</h1>
          </li>
        </Link>
        <Link to="/productpage" className={`remove-line ${location.pathname === "/productpage" ? "active-link" : ""}`}>
          <li>
            <BsBoxSeamFill />
            <h1>Product Page</h1>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
