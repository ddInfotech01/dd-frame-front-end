import React, { useState, useEffect } from "react";
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
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

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

const ProductTable = ({ productList, setProductList, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);

  // Function to toggle edit mode
  const handleEditToggle = () => setIsEditing(!isEditing);

  // Function to handle deleting a product
  const handleDelete = (id) => {

    if(productList[id]._id) {
      fetch(`http://localhost:7000/api/products/${id}`, {  // Pass the ID in the URL
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message) {
            // Successfully deleted, update the product list
            console.log(data.message);
             // Filter out the deleted product
          }
        })
        .catch((error) => {
          console.error('Error deleting product:', error);
        });
    }
    setProductList(productList.filter((product,index) => index !== id)); 
};


  // Function to handle adding a new product
  const handleAddProduct = () => {
    const newProduct = {
      pro_Size: "",
      pro_ManufacturingCost: 0,
      pro_RetailAmount: 0,
    };
    setProductList([...productList, newProduct]);
  };

  // Function to handle input changes
  const handleInputChange = (index, field, value) => {
    const updatedList = productList.map((product,i) =>
      parseInt(i) === parseInt(index) ? { ...product, [field]: value } : product
    );
    
    setProductList(updatedList);
  };

  // Function to save changes and exit edit mode
  // const handleSave = () => {
  //   setIsEditing(false);
  //   onSave(productList); // Pass the updated list back to the parent component
  // };
  const handleSave = async () => {
    setIsEditing(false); // Stop editing
    try {
 
        const response = await fetch("http://localhost:7000/api/products", {
          method: "POST", // Use POST for both insert or update
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productList),
        })
        .then(response => response.json())  // Parse the response as JSON
        .then(data => {
          console.log('Products saved successfully:', data);
          // Handle success, e.g., show a success message
        });

    } catch (error) {
      console.error("Error saving products:", error);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">S.No</StyledTableCell>
              <StyledTableCell align="center">Frame Size</StyledTableCell>
              <StyledTableCell align="center">
                Manufacturing Cost
              </StyledTableCell>
              <StyledTableCell align="center">Retail Amount</StyledTableCell>
              {isEditing && (
                <StyledTableCell align="center">Actions</StyledTableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {productList.map((product, index) => (
              <StyledTableRow key={index + 1}>
                <StyledTableCell align="center">{index + 1}</StyledTableCell>
                <StyledTableCell align="center">
                  {isEditing ? (
                    <TextField
                      value={product.pro_Size}
                      onChange={(e) =>
                        handleInputChange(
                           index,
                          "pro_Size",
                          e.target.value
                        )
                      }
                      size="small"
                      fullWidth
                    />
                  ) : (
                    product.pro_Size
                  )}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {isEditing ? (
                    <TextField
                      type="number"
                      value={product.pro_ManufacturingCost}
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "pro_ManufacturingCost",
                          e.target.value
                        )
                      }
                      size="small"
                      fullWidth
                    />
                  ) : (
                    product.pro_ManufacturingCost
                  )}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {isEditing ? (
                    <TextField
                      type="number"
                      value={product.pro_RetailAmount}
                      onChange={(e) =>
                        handleInputChange(
                           index,
                          "pro_RetailAmount",
                          e.target.value
                        )
                      }
                      size="small"
                      fullWidth
                    />
                  ) : (
                    product.pro_RetailAmount
                  )}
                </StyledTableCell>
                {isEditing && (
                  <StyledTableCell align="center">
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </StyledTableCell>
                )}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
        <Button variant="contained" color="primary" onClick={handleEditToggle}>
          {isEditing ? "Cancel" : "Edit"}
        </Button>
        {isEditing && (
          <>
            <Button variant="contained" color="success" onClick={handleSave}>
              Save
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleAddProduct}
            >
              Add Product
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default ProductTable;

// import React, { useState } from 'react';
// import { styled } from '@mui/material/styles';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell, { tableCellClasses } from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import IconButton from '@mui/material/IconButton';
// import DeleteIcon from '@mui/icons-material/Delete';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Box from '@mui/material/Box';

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   '&:nth-of-type(odd)': {
//     backgroundColor: theme.palette.action.hover,
//   },
//   '&:last-child td, &:last-child th': {
//     border: 0,
//   },
// }));

// const productDetails = [
//   { id: 1, frameSize: '4 x 4', manufacturingCost: 40 },
//   { id: 2, frameSize: '6 x 4', manufacturingCost: 60 },
//   { id: 3, frameSize: '6 x 8', manufacturingCost: 85 },
// ];

// const ProductTable = () => {
//   const [products, setProducts] = useState(productDetails);
//   const [isEditing, setIsEditing] = useState(false);

//   const handleEdit = () => setIsEditing(!isEditing);

//   const handleDelete = (id) => {
//     setProducts(products.filter((product) => product.id !== id));
//   };

//   const handleAddProduct = () => {
//     const newProduct = { id: products.length + 1, frameSize: '', manufacturingCost: '' };
//     setProducts([...products, newProduct]);
//   };

//   const handleInputChange = (id, field, value) => {
//     const updatedProducts = products.map((product) =>
//       product.id === id ? { ...product, [field]: value } : product
//     );
//     setProducts(updatedProducts);
//   };

//   const handleSave = () => {
//     setIsEditing(false);
//     console.log('Updated Products:', products);
//   };

//   return (
//     <Box sx={{ p: 2 }}>
//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 700 }} aria-label="customized table">
//           <TableHead>
//             <TableRow>
//               <StyledTableCell align="center">Serial No.</StyledTableCell>
//               <StyledTableCell align="center">Frame Size</StyledTableCell>
//               <StyledTableCell align="center">Manufacturing Cost</StyledTableCell>
//               {isEditing && <StyledTableCell align="center">Actions</StyledTableCell>}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {products.map((product, index) => (
//               <StyledTableRow key={product.id}>
//                 <StyledTableCell align="center">{index + 1}</StyledTableCell>
//                 <StyledTableCell align="center">
//                   {isEditing ? (
//                     <TextField
//                       value={product.frameSize}
//                       onChange={(e) =>
//                         handleInputChange(product.id, 'frameSize', e.target.value)
//                       }
//                       size="small"
//                       fullWidth
//                     />
//                   ) : (
//                     product.frameSize
//                   )}
//                 </StyledTableCell>
//                 <StyledTableCell align="center">
//                   {isEditing ? (
//                     <TextField
//                       value={product.manufacturingCost}
//                       onChange={(e) =>
//                         handleInputChange(product.id, 'manufacturingCost', e.target.value)
//                       }
//                       size="small"
//                       fullWidth
//                     />
//                   ) : (
//                     product.manufacturingCost
//                   )}
//                 </StyledTableCell>
//                 {isEditing && (
//                   <StyledTableCell align="center">
//                     <IconButton color="error" onClick={() => handleDelete(product.id)}>
//                       <DeleteIcon />
//                     </IconButton>
//                   </StyledTableCell>
//                 )}
//               </StyledTableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
//         <Button variant="contained" color="primary" onClick={handleEdit}>
//           {isEditing ? 'Cancel' : 'Edit'}
//         </Button>
//         {isEditing && (
//           <>
//             <Button variant="contained" color="success" onClick={handleSave}>
//               Save
//             </Button>
//             <Button variant="contained" color="secondary" onClick={handleAddProduct}>
//               Add Product
//             </Button>
//           </>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default ProductTable;
