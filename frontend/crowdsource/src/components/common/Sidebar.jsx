import {Link} from "react-router-dom";

function Sidebar(){
    return (
        <>
         <div className="w-64 bg-blue-700 text-white p-6">
            <h1 className="text-2xl font-bold mb-8">
                Civic Portal
            </h1>
            <nav className="flex flex-col gap-4">
                <Link to="/citizen/dashboard">
                    Dashboard
                </Link>
                <Link to="/citizen/create-issue">
                    Create Issue
                </Link>
                <Link to="/citizen/my-issues">
                    My Issues
                </Link>
            </nav>
        </div>
        </>
    );
}

export default Sidebar;