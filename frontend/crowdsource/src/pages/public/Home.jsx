import Navbar from "../../components/common/Navbar";
import { Link } from "react-router-dom";
import useAuthStore from "../../store/authStore";

function Home(){
  const user = useAuthStore((state) => state.user);
  const reportPath = user?.role === "citizen" ? "/citizen/create-issue" : "/login";

    return (
        <>
        <div>
            <Navbar/>

            <section className="min-h-[90vh] flex flex-col justify-center items-center bg-gray-100">

        <h1 className="text-5xl font-bold mb-6">

          Report Civic Issues

        </h1>

        <p className="text-gray-600 text-lg mb-8">

          Help make your city cleaner, safer and smarter.

        </p>

        <div className="flex gap-4">

          <Link to={reportPath} className="rounded-lg bg-terracotta-700 px-6 py-3 text-white hover:bg-terracotta-500">

            Report Issue

          </Link>

          <Link to="/issues" className="rounded-lg border border-stone-300 px-6 py-3 hover:bg-white">

            View Issues

          </Link>

        </div>

      </section>
      
        </div>
        </>
    );
}

export default Home;