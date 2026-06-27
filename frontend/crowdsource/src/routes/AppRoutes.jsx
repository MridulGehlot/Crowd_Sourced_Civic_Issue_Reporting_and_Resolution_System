import {BrowserRouter,Route,Routes} from "react-router-dom";
import Login from "../pages/public/Login";
import Register from "../pages/public/Register";
import Home from "../pages/public/Home";
import CitizenDashboard from "../pages/citizen/Dashboard";
import AdminDashboard from "../pages/admin/Dashboard";
import AuthorityDashboard from "../pages/authority/Dashboard";
import ProtectedRoute from "../components/common/ProtectedRoute";

function AppRoutes(){
    return (
        <>
        <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register/>}></Route>
            <Route path="/" element={<Home/>}></Route>
            
            <Route path="/citizen/dashboard" element={
                <ProtectedRoute allowedRoles={["citizen"]}>
                <CitizenDashboard/>
                </ProtectedRoute>
                }></Route>
            
            <Route path="/admin/dashboard" element={
                <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard/>
                </ProtectedRoute>
                }></Route>

            <Route path="/authority/dashboard" element={
                <ProtectedRoute allowedRoles={["authority"]}>
                <AuthorityDashboard/>
                </ProtectedRoute>
                }></Route>
        </Routes>
        </BrowserRouter>
        </>
    );
}

export default AppRoutes;