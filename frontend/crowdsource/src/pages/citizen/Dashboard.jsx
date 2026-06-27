import CitizenLayout from "../../layouts/CitizenLayout";
import StatCard from "../../components/dashboard/StatCard";

function CitizenDashboard() {

    return (

        <CitizenLayout>

            <h1 className="text-3xl font-bold mb-8">

                Dashboard

            </h1>

            <div className="grid grid-cols-4 gap-6">

                <StatCard
                    title="Total Issues"
                    value="10"
                    bgClass="bg-blue-600"
                />

                <StatCard
                    title="Pending"
                    value="4"
                    bgClass="bg-yellow-500"
                />

                <StatCard
                    title="In Progress"
                    value="2"
                    bgClass="bg-orange-500"
                />

                <StatCard
                    title="Resolved"
                    value="4"
                    bgClass="bg-green-600"
                />

            </div>

        </CitizenLayout>

    );

}

export default CitizenDashboard;