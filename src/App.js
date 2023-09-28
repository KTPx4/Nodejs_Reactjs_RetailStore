import React from 'react';

import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { listRoutes } from './routes';






function App() {


    return(
      <div>
       
        <Router>
          <Routes>                    
          {
            listRoutes.map((r)=>{

              let id = r.id
              let path = r.path
              let Page = r.pages

              return(
                <Route key={id} path={path} element={<Page />} >
                  
                  
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
