import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import ProductTable from "../ProductTable/ProductTable"; // Adjust the path as necessary
import { ProductContext } from "./ProductContext";
const ProductPage = () => {
  const { productList, setProductList } = useContext(ProductContext);
  const initialProducts = [
    { id: 1, frameSize: "4 x 4", manufacturingCost: 40, retailAmount: 100 },
    { id: 2, frameSize: "6 x 4", manufacturingCost: 60, retailAmount: 150 },
    { id: 3, frameSize: "6 x 8", manufacturingCost: 85, retailAmount: 140 },
  ];

  const handleSave = (updatedProducts) => {
    setProductList(updatedProducts);
    console.log("Saved Products:", updatedProducts);
  };

  return (
    <div className="product-page-bg-container">
      <Sidebar />
      <div
        style={{
          width: "80%",
          marginLeft: "20%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
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
          PRODUCT PAGE
        </h1>
        <ProductTable
          productList={productList}
          setProductList={setProductList}
          onSave={handleSave}
        />
      </div>
    </div>
  );
};

export default ProductPage;

// import React from 'react'
// import ProductTable from '../ProductTable/ProductTable'
// import Sidebar from '../Sidebar/Sidebar'

// const productDetails = [{id:1,frameSize:"4 x 4",manufacturingCost:40,retailAmount:100},{id:2,frameSize:"6 x 4",manufacturingCost:60,retailAmount:150},
//     {id:3,frameSize:"6 x 8",manufacturingCost:85,retailAmount:140},{id:4,frameSize:"8 x 10",manufacturingCost:160,retailAmount:250},
//     {id:5,frameSize:"8 x 12",manufacturingCost:180,retailAmount:300},{id:6,frameSize:"10 x 12",manufacturingCost:220,retailAmount:350},
//     ]

// const ProductPage = () => {
//   return (
//    <div className='product-page-bg-container'>
//       <Sidebar />
//       <div style={{width:"80%",marginLeft:"20%",display:"flex",flexDirection:"column",alignItems:"center",marginTop:"20px"}}>
//       <h1 style={{ fontFamily: "Poppins", fontSize: "30px", color: "#000000", fontWeight: "500", textAlign: "center", marginBottom: "50px" }}>PRODUCT PAGE</h1>
//       <ProductTable />
//       </div>
//    </div>
//   )
// }

// export default ProductPage
