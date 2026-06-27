import Sidebar from "../components/common/Sidebar";
import Topbar from "../components/common/Topbar";

function CitizenLayout({children}){
    return (
        <>
        <div className="flex min-h-screen">
            <Sidebar/>
            <main className="flex-1 bg-gray-100 p-8">
                <Topbar />
                {children}
            </main>
        </div>
        </>
    );
}

export default CitizenLayout;