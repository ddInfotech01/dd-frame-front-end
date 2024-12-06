import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

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
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(orderId, offerAmount, name, team, advanceAmount, memberId) {
  return {
    orderId,
    offerAmount,
    name,
    team,
    advanceAmount,
    memberId,
    manufacturing: false,
    delivery: false,
    courier: { value: '', isChecked: false },
    manufactureCharge: { value: '', isChecked: false },
    tlCharge: { value: '', isChecked: false },
    memberCharge: { value: '', isChecked: false },
  };
}

const rowsData = [
  createData('DDOR0001', 1000, 'name1', '01', '', 'DDTAM001'),
  createData('DDOR0002', 2000, 'name2', '02', '', 'DDTAM002'),
  createData('DDOR0003', 1500, 'name3', '03', '', 'DDTAM003'),
];

export default function CustomizedTables() {
  const [rows, setRows] = useState(rowsData);

  const handleCheckboxChange = (id, column) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.orderId === id ? { ...row, [column]: !row[column] } : row
      )
    );
  };

  const handleBoxToggle = (id, column) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.orderId === id
          ? { ...row, [column]: { ...row[column], isChecked: !row[column].isChecked } }
          : row
      )
    );
  };

  const handleInputChange = (id, column, value) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.orderId === id ? { ...row, [column]: value } : row
      )
    );
  };

  const isRowCompleted = (row) =>
    row.manufacturing &&
    row.delivery &&
    row.courier.isChecked &&
    row.manufactureCharge.isChecked &&
    row.tlCharge.isChecked &&
    row.memberCharge.isChecked;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">S.No</StyledTableCell>
            <StyledTableCell align="center">Member ID</StyledTableCell>
            <StyledTableCell align="center">Order Id</StyledTableCell>
            <StyledTableCell align="center">Offer Amount</StyledTableCell>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Team</StyledTableCell>
            <StyledTableCell align="center">Advance Amount</StyledTableCell>
            <StyledTableCell align="center">Manufacturing</StyledTableCell>
            <StyledTableCell align="center">Delivery</StyledTableCell>
            <StyledTableCell align="center">Courier Charge</StyledTableCell>
            <StyledTableCell align="center">Manufacture Charge</StyledTableCell>
            <StyledTableCell align="center">TL Charge</StyledTableCell>
            <StyledTableCell align="center">Member Charge</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <StyledTableRow key={row.orderId}>
              <StyledTableCell align="center">{index + 1}</StyledTableCell>
              <StyledTableCell align="center">{row.memberId}</StyledTableCell>
              <StyledTableCell align="center">{row.orderId}</StyledTableCell>
              <StyledTableCell align="center">{row.offerAmount}</StyledTableCell>
              <StyledTableCell align="center">{row.name}</StyledTableCell>
              <StyledTableCell align="center">{row.team}</StyledTableCell>
              <StyledTableCell align="center">
                <input
                  type="number"
                  value={row.advanceAmount}
                  onChange={(e) =>
                    handleInputChange(row.orderId, 'advanceAmount', e.target.value)
                  }
                  style={{
                    width: '70px',
                    height: '28px',
                    padding: '4px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                  }}
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                <input
                  type="checkbox"
                  style={{ width: '24px', height: '24px' }}
                  checked={row.manufacturing}
                  onChange={() => handleCheckboxChange(row.orderId, 'manufacturing')}
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                <input
                  type="checkbox"
                  style={{ width: '24px', height: '24px' }}
                  checked={row.delivery}
                  onChange={() => handleCheckboxChange(row.orderId, 'delivery')}
                />
              </StyledTableCell>
              {['courier', 'manufactureCharge', 'tlCharge', 'memberCharge'].map(
                (column) => (
                  <StyledTableCell align="center" key={column}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="text"
                        value={row[column].value}
                        onChange={(e) =>
                          handleInputChange(row.orderId, column, e.target.value)
                        }
                        style={{
                          width: '50px',
                          height: '28px',
                          padding: '4px',
                          border: '1px solid #ccc',
                          borderRadius: '4px',
                        }}
                      />
                      <div
                        style={{
                          width: '28px',
                          height: '28px',
                          border: '1px solid #ccc',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          cursor: 'pointer',
                          backgroundColor: row[column].isChecked ? 'green' : 'white',
                        }}
                        onClick={() => handleBoxToggle(row.orderId, column)}
                      >
                        {row[column].isChecked && (
                          <CheckCircleIcon style={{ color: 'white', fontSize: '20px' }} />
                        )}
                      </div>
                    </div>
                  </StyledTableCell>
                )
              )}
              <StyledTableCell align="center">
                {isRowCompleted(row) ? (
                  <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'green' }}>
                    <CheckCircleIcon style={{ marginRight: '5px' }} /> Completed
                  </span>
                ) : (
                  <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'orange' }}>
                    <HourglassEmptyIcon style={{ marginRight: '5px' }} /> Processing
                  </span>
                )}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
