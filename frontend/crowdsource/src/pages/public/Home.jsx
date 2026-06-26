import Navbar from "../../components/common/Navbar";

function Home(){
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

          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg">

            Report Issue

          </button>

          <button className="border px-6 py-3 rounded-lg">

            View Issues

          </button>

        </div>

      </section>
      
        </div>
        </>
    );
}

export default Home;