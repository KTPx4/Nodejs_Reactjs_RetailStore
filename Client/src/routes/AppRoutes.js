import {
  Routes,
  Route,
  
} from "react-router-dom";

import React, { useEffect } from "react";

// Authen - Author
import AdminRouter from "../routes/AdminRouter";
import UserRouter from "../routes/UserRouter";

//Layout -> navbar + body + footer
import LayoutPage from "../components/Layout/LayoutPage";

//Page
import NotFound from "../pages/NotFound/NotFound";
import Home from "../pages/Home/Home";
import AdminPage from "../pages/Account/Admin";
import LoginPage from "../pages/Account/User/Login";
import ErrorPage from "../pages/Error";
import ActivePage from "../pages/Account/User/Active";
import ProductPage from "../pages/Product/Manage";

//testing component
import TestPage from "../pages/TestPage";

// Check Login and Role before load page
import { useVerifyLogin } from "../hook/HookLogin";

const AppRoutes = (props) => {
  useVerifyLogin() // xác thực token xem còn hạn/ hết hạn. đồng thời kiểm tra role

  useEffect(() => {

  }, []);
  
  return (
    <>
      <Routes>
        {/* <Route path="/error" element={<ErrorPage />} /> */}
        <Route path="/" element={<UserRouter><LayoutPage /></UserRouter>}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
        </Route>
        <Route path="/error" element={<ErrorPage/>}/>
        <Route path="/TestPage" element={<LayoutPage />}>
          <Route index element={<TestPage/>}></Route>
        </Route>

        <Route path="/account/login" element={<LoginPage />} />
        <Route path="/account/active" element={<ActivePage />} />
       
     
        <Route path="/account" element={<AdminRouter><LayoutPage /></AdminRouter>}>
          <Route index element={<AdminPage />} />   
          <Route path="admin" element={<AdminPage/>}/>
        </Route>

        <Route path="/product" element={<UserRouter><LayoutPage /></UserRouter>}>
          <Route index element={<ProductPage />} />   
          <Route path="views" element={<ProductPage/>}/>
          <Route path="sales" element={<><p className="text-light">Sales Page</p> </>}/>
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};



export default AppRoutes;
