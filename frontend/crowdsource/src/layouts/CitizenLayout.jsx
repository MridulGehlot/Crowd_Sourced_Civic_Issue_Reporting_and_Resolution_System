import Sidebar from "../components/common/Sidebar";
import Topbar from "../components/common/Topbar";

function CitizenLayout({ children, className = "" }) {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <main className={`flex-1 p-8 ${className}`.trim()}>
                <Topbar />
                {children}
            </main>
        </div>
    );
}

export default CitizenLayout;