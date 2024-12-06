import React, { useState, useContext, useEffect } from "react";
import { IoCaretDownOutline } from "react-icons/io5";
import "./CreateOffer.css";
import FrameSizeCard from "../FrameSizeCard/FrameSizeCard";
import ProductDetailTable from "../ProductDetailTable/ProductDetailTable";
import { ProductContext } from "../ProductPage/ProductContext";

const CreateOffer = (props) => {
 
  const { productList, setProductList } = useContext(ProductContext);
  const [quantity, setquantity] = useState([]);
  const [offerdetails, setofferdetails] = useState([]);
  const [offamnt, setOffAmnt] = useState(0);
  const totalMc = quantity
    .map((eachItem) => eachItem.manufacturingCost)
    .reduce((a, b) => a + b, 0);
  const totalRt = quantity
    .map((eachItem) => eachItem.retailamount)
    .reduce((a, b) => a + b, 0);
    const generateCode = (index) => {
      const prefix = 'DDOFF';
      // Zero-pads the index to be 4 digits (e.g., 0001, 0002, ...)
      const paddedIndex = (index).toString().padStart(4, '0');
      return `${prefix}${paddedIndex}`;
    };
    console.log(quantity);
    useEffect(() => {
      fetch("http://localhost:7000/api/customizeoffer").then(res=>res.json()).then((data)=>{
        setofferdetails(data);
        console.log(offerdetails);
        
      }).catch((error) => {
        console.error(error);
      })
    },[])
   function createOffer() {
    const today = new Date();
   


    if(totalMc && totalRt){
      fetch("http://localhost:7000/api/customizeoffer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify( {
          "cus_Id": offerdetails.length+1,
          "ofr_Code": generateCode(offerdetails.length+1),
          "cus_OfferAmount": offamnt,
          "cus_ManufacturingAmount":totalMc,
          "cus_ProfitAmount": totalRt-totalMc,
          "cus_RetailAmount":totalRt,
          "ofer_Date": today,
          "cus_Quantity": quantity
          .map((eachItem) => parseInt(eachItem.qty))
          .filter((qty) => !isNaN(qty))  
          .reduce((a, b) => a + b, 0),
          "orders": [
           
          ]
        }),
      })
    }
    props.hidemodel(false);
    }
  return (
    <div className="frame-sizes-bg">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: "60%", borderRight: "2px solid #999" }}>
          <ul
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {productList.map((eachItem, index) => (
              <FrameSizeCard
                frameDetail={eachItem}
                key={index + 1}
                setquantity={setquantity}
                quantity={quantity}
              />
            ))}
          </ul>
          <div style={{ textAlign: "center" }}>
            <button className="btn-style-popup" onClick={() =>createOffer()} >Confirm</button>
          </div>
        </div>
        <div style={{ paddingLeft: "40px" }}>
          <div style={{ marginBottom: "30px" }}>
            <h5 style={{ marginBottom: "20px" }}>Manufacturing Amount</h5>
            <p className="product-quantity">{totalMc}</p>
          </div>
          <div style={{ marginBottom: "30px" }}>
            <h5 style={{ marginBottom: "20px" }}>Retail Amount</h5>
            <p className="product-quantity">{totalRt}</p>
          </div>
          <div style={{ marginBottom: "30px" }}>
            <h5 style={{ marginBottom: "20px" }}>Profit Amount</h5>
            <p className="product-quantity">{totalRt - totalMc}</p>
          </div>
          <div style={{ marginBottom: "30px" }}>
            <h5 style={{ marginBottom: "20px" }}>Offer Amount</h5>
            <input className="price-input" type="number" value={offamnt} onChange={(e)=>setOffAmnt(e.target.value)} />
          </div>
          <div style={{ marginBottom: "30px" }}>
            <h5 style={{ marginBottom: "20px" }}>Product details</h5>
            <div style={{ width: "300px" }}>
              <ProductDetailTable frameDetail={quantity} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOffer;