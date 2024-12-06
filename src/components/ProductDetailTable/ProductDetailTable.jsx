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
    fontSize: 16, // Smaller font size
    padding: "10px 16px", // Smaller padding
    minWidth: 50, // Smaller minimum width
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16, // Smaller font size
    padding: "14px 16px", // Smaller padding
    minWidth: 50, // Smaller minimum width
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

// function createData(frameSize,quantity) {
//   return {frameSize,quantity};
// }

// const rows = [
//   createData("6 x 4",2),
//   createData("12 x 8",1),
//   createData("8 x 10",3),
// ];

export default function CustomizedTables(props) {
  return (
    <TableContainer component={Paper} sx={{ maxWidth: 400 }}>
      {/* Smaller max width */}
      <Table sx={{ minWidth: 100 }} aria-label="customized table">
        {/* Smaller min width */}
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Frame size</StyledTableCell>
            <StyledTableCell align="center">Quantity</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.frameDetail
            .filter((item) => item.qty > 0)
            .map((row, index) => (
              <StyledTableRow key={index + 1}>
                <StyledTableCell component="th" scope="row" align="center">
                  {row.frameSize}
                </StyledTableCell>
                <StyledTableCell align="center">{row.qty}</StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
