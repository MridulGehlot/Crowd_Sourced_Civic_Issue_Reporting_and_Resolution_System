import {BrowserRouter,Route,Routes} from "react-router-dom";
import Login from "../pages/public/Login";
import Register from "../pages/public/Register";
import Home from "../pages/public/Home";
import CitizenDashboard from "../pages/citizen/Dashboard";
import AdminDashboard from "../pages/admin/Dashboard";
import AuthorityDashboard from "../pages/authority/Dashboard";

function AppRoutes(){
    return (
        <>
        <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register/>}></Route>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/citizen/dashboard" element={<CitizenDashboard/>}></Route>
            <Route path="/admin/dashboard" element={<AdminDashboard/>}></Route>
            <Route path="/authority/dashboard" element={<AuthorityDashboard/>}></Route>
        </Routes>
        </BrowserRouter>
        </>
    );
}

export default AppRoutes;