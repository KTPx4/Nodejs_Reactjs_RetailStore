import { Route } from "react-router-dom"
import React from "react";
import { useEffect } from "react"
import LayoutPage from "../components/Layout/LayoutPage";
import ProfilePage from "../pages/Account/Profile"
import AdminPage from "../pages/Account/Admin";


const PrivateRoutes = (props) =>{
    useEffect(()=>{

    }, [])

    return (      
       
           
        <Route path="/account" element={<LayoutPage />}>                  
                        
                <Route index element={ProfilePage} />
                <Route path="/" element={ProfilePage} />
                <Route path="/employee" element={AdminPage} />
                <Route path="/admin" element={AdminPage} />
            
        </Route>    
       
    )
}


export default PrivateRoutes    