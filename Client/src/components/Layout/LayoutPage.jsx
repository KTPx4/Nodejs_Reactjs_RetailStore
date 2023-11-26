import React from "react";
import HeaderNav from "../HeaderComponents/Navbars"
import FooterCpn from "../FooterComponents/Footer"
import { Outlet } from "react-router-dom"

const LayoutPage = () =>{
    return(
        <div className="layout-container">
            <HeaderNav />

            <div className="layout-body">
                <Outlet />
            </div>

            <FooterCpn />
        </div>
    )
}

export default LayoutPage