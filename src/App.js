import React, { Fragment } from 'react';

// import './App.css';
import {   BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { listRoutes } from './routes';

import HeaderNav from './components/HeaderComponents/Navbars';

import FooterCpn from './components/FooterComponents/Footer';






function App() {


    return(
      <div>
        <Router>
          <Routes>
              {
                listRoutes.map((r)=>{

                  let id = r.id
                  let path = r.path
                  let Page = r.pages; 

                  // page 404 will not show header and footer
                  let Headers = id===404 ? Fragment : HeaderNav;             
                  let Footers = id===404 ? Fragment : FooterCpn;                
                  
                  return(                 
                                    
                    <Route key={id} path={path} element={
                        <>
                            <Headers /> 

                            <Page />

                            <Footers />
                        </>
                      }>                         
                    </Route>
                      
                  )  
                })
              }
          </Routes>            
        </Router>
      </div>
    )
  
 
}

export default App;
