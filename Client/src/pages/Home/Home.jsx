import { useState, useContext, createContext, useEffect} from 'react';

import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";


import FirtLogin from '../../components/FirstLogin/index';
const _Root_IMG = __dirname + "img/home";

const HomePage = (props) =>{

  

    let isChangePass = useSelector((state) => state.isChangePass);

    console.log("Page Home :", isChangePass );
    useEffect(() =>{
        
        
        document.title= "Trang Chủ";     
           
        // Change icon
        const link = document.createElement('link');
        link.rel = 'icon';
        link.href = `${_Root_IMG}/home.png`; 
        document.head.appendChild(link);
    }, [])

    

    let ModalChangePass = <></>
    if(isChangePass)
    {
        return <FirtLogin />
    }
    else
    {
        return(
            <HelmetProvider>
                 <Helmet>
                    {/* <link rel="stylesheet" type="text/css" href="/css/login.css" /> */}
                </Helmet>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>
    
                {ModalChangePass}
    
                
            </HelmetProvider>
        )

    }
}
export default HomePage;
 
