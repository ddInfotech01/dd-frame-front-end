import React from "react";
import "./FrameSizeCard.css";

const FrameSizeCard = (props) => {
  const { frameDetail } = props;
  const { pro_Size } = frameDetail;
  function handleFrameCount(element, currentObj) {
    props.setquantity((prev) => {
      const updatedArray = prev.map((item) =>
        item.target === currentObj._id
          ? {
              ...item,
              qty: element.target.value,
              manufacturingCost:
                currentObj.pro_ManufacturingCost * element.target.value,
              retailamount: currentObj.pro_RetailAmount * element.target.value,
            }
          : item
      );
      if (!updatedArray.some((item) => item.target === currentObj._id)) {
        updatedArray.push({
          target: currentObj._id,
          qty: element.target.value,
          frameSize: currentObj.pro_Size,
          manufacturingCost:
            currentObj.pro_ManufacturingCost * element.target.value,
          retailamount: currentObj.pro_RetailAmount * element.target.value,
        });
      }
      return updatedArray;
    });
  }
  return (
    <li className="frame-size-container">
      <label className="frame-sizes">{pro_Size}</label>
      <select
        className="frame-size-counts"
        onChange={(e) => handleFrameCount(e, frameDetail)}
      >
        <option>0</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
        <option>7</option>
        <option>8</option>
        <option>9</option>
        <option>10</option>
      </select>
    </li>
  );
};

export default FrameSizeCard;
