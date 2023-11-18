import React from "react";
import HeaderNav from "../HeaderComponents/Navbars"
import FooterCpn from "../FooterComponents/Footer"
import { Outlet } from "react-router-dom"

const LayoutPage = () =>{
    return(
        <>
            <HeaderNav />
            
            < Outlet />

            <FooterCpn />
        </>
    )
}

export default LayoutPage