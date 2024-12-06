 import React, { useEffect, useState } from 'react'
import Dashboard from './components/AdminDashboard/AdminDashboard'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import OfferDetails from './components/OfferDetails/OfferDetails';
import OrderEntry from './components/OrderEntry/OrderEntry';
import CreateOffer from './components/CreateOffer/CreateOffer';
import Teams from './components/Teams/Teams';
import TeamDetailPage from './components/TeamDetailPage/TeamDetailPage';
import OrderStatus from './components/OrderStatus/OrderStatus';
import ProductPage from './components/ProductPage/ProductPage';
 import { ProductProvider } from './components/ProductPage/ProductContext';
 const App = () => {
  
  // const [user,setUser]=useState([])

  // const getUser=()=>{
  //   fetch("/api/user")
  //   .then(res=>res.json())
  //   .then(json=>setUser(json))
  // }

  // useEffect(()=>{
  //   getUser()
  // },[])

   return (
    //  <div>
    //   {user.map((data)=>{
    //    return<>
    //    <div style={{border:"1px solid gray",}}>
    //    <h1>Name:{data.name}</h1>
    //    <h1>Username:{data.username}</h1>
    //    <h1>Email:{data.email}</h1>
    //    <h1>Id:{data.id}</h1>
    //    </div>
    //    </>
    //   })}
      
    //   </div>
    <Router>
    {/* <Header OpenSidebar={OpenSidebar}/> */}
    {/* <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/> */}
      <Routes>
        <Route path="/" element={ <AdminDashboard/>} />     
        <Route path="/offerdetails" element={ <ProductProvider><OfferDetails/></ProductProvider>} /> 
        <Route path="/orderentry" element={<OrderEntry />} />
        <Route path='/createoffer' element={<CreateOffer />} />
        <Route path='/teams' element={<Teams />} />
        <Route path="/team/:teamId" element={<TeamDetailPage />} />
        <Route path='/orderstatus' element={<OrderStatus />} />
        <Route path='/productpage' element={ 
           <ProductProvider>
              <ProductPage />
            </ProductProvider>} />
      </Routes>
    </Router>
   )
 }
 
 export default App