import Navbar from "../components/common/Navbar";

function MainLayout({children}){
    return (
        <>
        <div>
            <Navbar />
            {Children}
        </div>
        </>
    );
}

export default MainLayout;