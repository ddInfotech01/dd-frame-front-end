import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState, useEffect } from "react";

function createData(
  date,
  offerCode,
  offerAmount,
  manufacturingCost,
  memberAmount,
  teamLeaderAmount,
  courierAmount,
  totalCost,
  totalProfit,
  totalOrderCount
) {
  return {
    date,
    offerCode,
    offerAmount,
    manufacturingCost,
    memberAmount,
    teamLeaderAmount,
    courierAmount,
    totalCost,
    totalProfit,
    totalOrderCount,
    history: [
      {
        name: "name1",
        memberId: "MT010001",
        orderId: "DDORR001",
        manufactureCost: 500,
        memberAmount: 50,
        teamLeaderAmount: 25,
        courierAmount: 100,
        cost: 2000,
        profit: 1000,
      },
      {
        name: "name2",
        memberId: "MT020002",
        orderId: "DDORR002",
        manufactureCost: 500,
        memberAmount: 40,
        teamLeaderAmount: 25,
        courierAmount: 150,
        cost: 1500,
        profit: 500,
      },
    ],
  };
}

function Row(props) {
  const { row, index } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>{index + 1}</TableCell>
        <TableCell>{row.ofer_Date}</TableCell>
        <TableCell align="right">{row.ofr_Code}</TableCell>
        <TableCell align="right">{row.cus_OfferAmount}</TableCell>
        <TableCell align="right">{row.cus_ManufacturingAmount}</TableCell>
        <TableCell align="right">{row.cus_MemberAmount}</TableCell>
        <TableCell align="right">{row.cus_TeamLeaderAmount}</TableCell>
        <TableCell align="right">{row.cus_CourierAmount}</TableCell>
        <TableCell align="right">{row.cus_RetailAmount}</TableCell>
        <TableCell align="right">{row.cus_ProfitAmount}</TableCell>
        <TableCell align="right">{row.cus_TotalOrderCount}</TableCell>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              {/* <Typography variant="h6" gutterBottom component="div">
                Particular Detail
              </Typography> */}
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow sx={{ backgroundColor: "black" }}>
                    <TableCell style={{ color: "white", fontWeight: "500" }}>
                      Name
                    </TableCell>
                    <TableCell style={{ color: "white", fontWeight: "500" }}>
                      Member Id
                    </TableCell>
                    <TableCell style={{ color: "white", fontWeight: "500" }}>
                      Order Id
                    </TableCell>
                    <TableCell style={{ color: "white", fontWeight: "500" }}>
                      Manufacturing Cost
                    </TableCell>
                    <TableCell style={{ color: "white", fontWeight: "500" }}>
                      Member Amount
                    </TableCell>
                    <TableCell style={{ color: "white", fontWeight: "500" }}>
                      Team Leader Amount
                    </TableCell>
                    <TableCell style={{ color: "white", fontWeight: "500" }}>
                      Courier Amount
                    </TableCell>
                    <TableCell style={{ color: "white", fontWeight: "500" }}>
                      Cost Amount
                    </TableCell>
                    <TableCell style={{ color: "white", fontWeight: "500" }}>
                      Profit Amount
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.orders.map((historyRow, historyIndex) => (
                    <TableRow key={historyIndex}>
                      <TableCell>{historyRow.ord_MamberName}</TableCell>
                      <TableCell>{historyRow.ord_MemberCode}</TableCell>
                      <TableCell>{historyRow.ord_Code}</TableCell>
                      <TableCell>{historyRow.ord_ManufactureCost}</TableCell>
                      <TableCell>{historyRow.ord_MemberAmount}</TableCell>
                      <TableCell>{historyRow.ord_TeamLeaderAmount}</TableCell>
                      <TableCell>{historyRow.ord_CourierAmount}</TableCell>
                      <TableCell>{historyRow.ord_Cost}</TableCell>
                      <TableCell>{historyRow.ord_Profit}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    date: PropTypes.string.isRequired,
    offerCode: PropTypes.string.isRequired,
    offerAmount: PropTypes.number.isRequired,
    manufacturingCost: PropTypes.number.isRequired,
    memberAmount: PropTypes.number.isRequired,
    teamLeaderAmount: PropTypes.number.isRequired,
    courierAmount: PropTypes.number.isRequired,
    totalCost: PropTypes.number.isRequired,
    totalProfit: PropTypes.number.isRequired,
    totalOrderCount: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        memberId: PropTypes.string.isRequired,
        orderId: PropTypes.string.isRequired,
        manufactureCost: PropTypes.number.isRequired,
        memberAmount: PropTypes.number.isRequired,
        teamLeaderAmount: PropTypes.number.isRequired,
        courierAmount: PropTypes.number.isRequired,
        cost: PropTypes.number.isRequired,
        profit: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

const rows = [
  createData(
    "11.11.2024",
    "DDOFF0001",
    2000,
    4000,
    3000,
    500,
    200,
    8000,
    4000,
    5
  ),
  createData(
    "12.11.2024",
    "DDOFF0002",
    1500,
    5000,
    2500,
    600,
    150,
    9000,
    5000,
    6
  ),
];

export default function CollapsibleTable() {
  const [customerdata, setCustomerData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:7000/api/customizeoffer")
      .then((res) => res.json())
      .then((data) => setCustomerData(data))
      .catch((error) => {
        console.log(error);
      });
  },[]);
  
  
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow sx={{ backgroundColor: "black" }}>
            <TableCell style={{ color: "white", fontWeight: "500" }}>
              S.No
            </TableCell>
            <TableCell style={{ color: "white", fontWeight: "500" }}>
              Date
            </TableCell>
            <TableCell
              style={{ color: "white", fontWeight: "500" }}
              align="right"
            >
              Offer Code
            </TableCell>
            <TableCell
              style={{ color: "white", fontWeight: "500" }}
              align="right"
            >
              Offer Amount
            </TableCell>
            <TableCell
              style={{ color: "white", fontWeight: "500" }}
              align="right"
            >
              T.Manufacture Cost
            </TableCell>
            <TableCell
              style={{ color: "white", fontWeight: "500" }}
              align="right"
            >
              T.Member Amount
            </TableCell>
            <TableCell
              style={{ color: "white", fontWeight: "500" }}
              align="right"
            >
              T.Team Leader Amount
            </TableCell>
            <TableCell
              style={{ color: "white", fontWeight: "500" }}
              align="right"
            >
              T.Courier Amount
            </TableCell>
            <TableCell
              style={{ color: "white", fontWeight: "500" }}
              align="right"
            >
              Total Cost
            </TableCell>
            <TableCell
              style={{ color: "white", fontWeight: "500" }}
              align="right"
            >
              Total Profit
            </TableCell>
            <TableCell
              style={{ color: "white", fontWeight: "500" }}
              align="right"
            >
              T.Order Count
            </TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {customerdata
            ? customerdata.map((row, index) => (
                <Row key={index} row={row} index={index} />
              ))
            : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
