import Navbar from "../components/common/Navbar";

function MainLayout({children}){
    return (
        <>
        <div>
            <Navbar />
            {children}
        </div>
        </>
    );
}

export default MainLayout;