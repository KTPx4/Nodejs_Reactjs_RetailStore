import { Routes, Route, Navigate, Link, Outlet, useNavigate } from "react-router-dom";
import NotFound from '../pages/NotFound/NotFound';
import LayoutPage from "../components/Layout/LayoutPage";
import Home from "../pages/Home/Home"
import ProfilePage from "../pages/Account/Profile"
import AdminPage from "../pages/Account/Admin";

import LoginPage from "../pages/Account/Login";
import RegisterPage from "../pages/Account/RegisterAccount";

const _Token_Auth = 'token-auth'

const AppRoutes  = (props) =>{



    return (
        <>
           
            <Routes>
                <Route path="/" element={<LayoutPage />}>
                    <Route index element={<Home />} />
                    <Route path="home" element={<Home />} />
                </Route>          

                {/* <Route path="/account" element={<LayoutPage />} > */}
                <Route path="/account/login" element={ <LoginPage/> }/>
                <Route path="/account/register" element={ <RegisterPage/> }/>
                <Route path="/account" element={<ProtectedRoute><LayoutPage /></ProtectedRoute>} >
                        <Route index element={ < ProfilePage />} />                        
                        <Route path="employee" element={ <AdminPage/> } />
                        <Route path="admin" element={ <AdminPage/> } />
                    
                </Route>    
               
                <Route path="*"  element={ <NotFound />  } />
            </Routes>

        </>
    )
}

function ProtectedRoute({ children }) {
    const isLoggedIn = localStorage.getItem(_Token_Auth) || ''

    if (!isLoggedIn) {
        return <Navigate to="/account/login" />;
    }

    return children;
}

export default AppRoutes;