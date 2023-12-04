import React from "react";
import HeaderNav from "../HeaderComponents/Navbars"
import FooterCpn from "../FooterComponents/Footer"
import { Outlet } from "react-router-dom"
import { useSelector } from "react-redux";
import FirstLogin from '../FirstLogin/index'

const LayoutPage = () =>{

    let isChangePass = useSelector((state) => state.isChangePass);
    
    if(isChangePass)
    {
        return <FirstLogin />
    }

    return(
        <div className="layout-container">
            <HeaderNav />

            <div className="layout-body">
                <Outlet />
            </div>

            {/* <FooterCpn /> */}
        </div>
    )
}

export default LayoutPage