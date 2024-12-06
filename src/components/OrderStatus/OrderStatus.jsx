import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import OrderStatusTable from "../OrderStatusTable/OrderStatusTable"
import "./OrderStatus.css"

const OrderStatus = () => {
  return (
    <div className='order-status-bg'>
        <Sidebar />
        <div style={{ marginLeft:"15%",width: "90%", height:"100vh", display: "flex", flexDirection:"column",alignItems:"center",padding:"50px 50px" }}>
          <h1 style={{marginBottom:"50px"}}>ORDER STATUS</h1>
          <OrderStatusTable />
        </div>
    </div>
  )
}

export default OrderStatus