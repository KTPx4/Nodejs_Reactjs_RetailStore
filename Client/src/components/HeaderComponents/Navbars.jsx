import React from "react";
import { Link, Navigate } from "react-router-dom";

const HeaderNav =  () =>{
    return(
        <>
             <nav>
                <ul>
                    <li>
                        <Link to="/"><p>Home</p></Link>
                    </li>
                    <li>
                        <Link to="/account">Account</Link>
                    </li>
               
                </ul>
            </nav>           
        </>
       
    )
}

export default HeaderNav;