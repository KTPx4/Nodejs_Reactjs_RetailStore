import React, { Fragment } from 'react';

// import './App.css';
import {  BrowserRouter as Router } from 'react-router-dom';

// import { listRoutes } from './routes';

// import HeaderNav from './components/HeaderComponents/Navbars';

// import FooterCpn from './components/FooterComponents/Footer';

import AppRoutes from './routes/AppRoutes';


console.log("app 1 times");

function App() {

  
    return(
      <div>
        <Router>
             <AppRoutes />
        </Router>
      </div>
    )
  
 
}

export default App;
