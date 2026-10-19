import {BrowserRouter,Route,Routes} from "react-router-dom";
import Login from "../pages/public/Login";
import Register from "../pages/public/Register";
import Home from "../pages/public/Home";
import CitizenDashboard from "../pages/citizen/Dashboard";
import AdminDashboard from "../pages/admin/Dashboard";
import AuthorityDashboard from "../pages/authority/Dashboard";
import ProtectedRoute from "../components/common/ProtectedRoute";
import CreateIssue from "../pages/citizen/CreateIssue";
import MyIssues from "../pages/citizen/MyIssues";
import Issues from "../pages/public/Issues";
import IssueDetails from "../pages/public/IssueDetails";
import AssignedIssues from "../pages/authority/ASsginedIssues";
import Authorities from "../pages/admin/Authorities";
import Departments from "../pages/admin/Departments";

function AppRoutes(){
    return (
        <>
        <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register/>}></Route>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/issues" element={<Issues/>}></Route>
            <Route path="/issues/:id" element={<IssueDetails/>}></Route>
            
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
            <Route path="/admin/authorities" element={<ProtectedRoute allowedRoles={["admin"]}><Authorities /></ProtectedRoute>} />
            <Route path="/admin/departments" element={<ProtectedRoute allowedRoles={["admin"]}><Departments /></ProtectedRoute>} />

            <Route path="/authority/dashboard" element={
                <ProtectedRoute allowedRoles={["authority"]}>
                <AuthorityDashboard/>
                </ProtectedRoute>
                }></Route>
            <Route path="/authority/assigned" element={<ProtectedRoute allowedRoles={["authority"]}><AssignedIssues /></ProtectedRoute>} />

            <Route path="/citizen/create-issue" element={
                <ProtectedRoute allowedRoles={["citizen"]}>
                    <CreateIssue></CreateIssue>
                </ProtectedRoute>
                }/>

            <Route path="/citizen/my-issues" element={
                <ProtectedRoute allowedRoles={["citizen"]}>
                    <MyIssues />
                </ProtectedRoute>
                }/>

        </Routes>
        </BrowserRouter>
        </>
    );
}

export default AppRoutes;