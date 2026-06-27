import CitizenLayout from "../../layouts/CitizenLayout";
import StatCard from "../../components/dashboard/StatCard";
import { useEffect } from "react";
import { getMyIssues } from "../../api/issueApi";
import useIssueStore from "../../store/issueStore";
import Loader from "../../components/common/Loader";

function CitizenDashboard() {

    const [loading,setLoading] = useState(true);
    const issues = useIssueStore((state)=>state.issues);
    const setIssues = useIssueStore((state)=>state.setIssues);
    useEffect(()=>{
        async function fetchIssues() {
            try
            {
                const response = await getMyIssues();
                console.log(response);
                setIssues(response.data);
            }catch(err){
                console.log(err);
            }
            finally{
                setLoading(false);
            }
        }
        fetchIssues();
    },[]);

    const totalIssues = issues.length;
    const pendingIssues = issues.filter(issues=>issues.status==="pending").length;
    const progressIssues = issues.filter(issues=>issues.status==="in_progress").length;
    const resolvedIssues = issues.filter(issues=>issues.status==="resolved").length;
    const assignedIssues = issues.filter(issues=>issues.status==="assigned").length;

    if(loading)
    {
        return (
            <>
            <CitizenLayout>
                <Loader></Loader>
            </CitizenLayout>
            </>
        );
    }

    return (

        <CitizenLayout>

            <h1 className="text-3xl font-bold mb-8">

                Dashboard

            </h1>

            <div className="grid grid-cols-4 gap-6">

                <StatCard
                    title="Total Issues"
                    value={totalIssues}
                    bgClass="bg-blue-600"
                />

                <StatCard
                    title="Pending"
                    value={pendingIssues}
                    bgClass="bg-yellow-500"
                />

                <StatCard
                    title="In Progress"
                    value={progressIssues}
                    bgClass="bg-orange-500"
                />

                <StatCard
                    title="Resolved"
                    value={resolvedIssues}
                    bgClass="bg-green-600"
                />

                <StatCard 
                title="Assigned"
                value={assignedIssues}
                bgClass="bg-blue-600"
                />

            </div>

        </CitizenLayout>

    );

}

export default CitizenDashboard;