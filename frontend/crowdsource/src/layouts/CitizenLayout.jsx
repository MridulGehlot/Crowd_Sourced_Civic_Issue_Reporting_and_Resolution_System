import Sidebar from "../components/common/Sidebar";

function CitizenLayout({children}){
    return (
        <>
        <div className="flex min-h-screen">
            <Sidebar/>
            <main className="flex-1 bg-gray-100 p-8">
                {children}
            </main>
        </div>
        </>
    );
}

export default CitizenLayout;