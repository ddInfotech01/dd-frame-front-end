import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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

function createData(
  date,
  orderId,
  name,
  memberId,
  offerCode,
  offerAmount,
  quantity,
  team
) {
  return {
    date,
    orderId,
    name,
    memberId,
    offerCode,
    offerAmount,
    quantity,
    team,
  };
}

const rows = [
  createData(
    "11.11.2024",
    "DDOR0001",
    "Kavya",
    "DDTAM001",
    "DDOFF0001",
    1000,
    2,
    "A"
  ),
  createData(
    "11.11.2024",
    "DDOR0002",
    "Karthic",
    "DDTBM003",
    "DDOFF0001",
    1000,
    1,
    "B"
  ),
];

export default function DashboardTable({ allOrders }) {
  console.log(allOrders);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">S.No</StyledTableCell>
            <StyledTableCell align="center">Date</StyledTableCell>
            <StyledTableCell align="center">Order Id</StyledTableCell>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Member Id</StyledTableCell>
            <StyledTableCell align="center">Offer Code</StyledTableCell>
            <StyledTableCell align="center">Offer Amount</StyledTableCell>
            <StyledTableCell align="center">Quantity</StyledTableCell>
            <StyledTableCell align="center">Team</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allOrders.map((allOrders) =>
            allOrders.orders.map((row, index) => (
              <StyledTableRow key={row.ord_Code}>
                <StyledTableCell align="center">{index + 1}</StyledTableCell>
                <StyledTableCell component="th" scope="row" align="center">
                  {row.ord_Date}
                </StyledTableCell>
                <StyledTableCell align="center">{row.ord_Code}</StyledTableCell>
                <StyledTableCell align="center">{row.ord_MamberName}</StyledTableCell>
                <StyledTableCell align="center">{row.ord_MemberCode}</StyledTableCell>
                <StyledTableCell align="center">
                  {allOrders.ofr_Code}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {allOrders.cus_OfferAmount}
                </StyledTableCell>
                <StyledTableCell align="center">{row.ord_Quantity}</StyledTableCell>
                <StyledTableCell align="center">{row.ord_TeamName}</StyledTableCell>
              </StyledTableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
