import CitizenLayout from "../../layouts/CitizenLayout";
import { useEffect, useState } from "react";
import { getMyIssues } from "../../api/issueApi";
import useIssueStore from "../../store/issueStore";
import IssueTable from "../../components/issues/IssueTable";
import Loader from "../../components/common/Loader";

function MyIssues()
{
    const issues = useIssueStore((state)=>state.issues);
    const setIssues = useIssueStore((state)=>state.setIssues);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    useEffect(()=>{
        async function fetch()
        {
            try{
                const response = await getMyIssues();
                setIssues(response.data);
            }catch(error)
            {
                setError(error.response?.data?.message || "We could not load your issues.");
            } finally {
                setLoading(false);
            }
        }
        fetch();
    },[setIssues]);

    return (
        <>
        <CitizenLayout>
            <h1 className="text-3xl font-bold mb-2">My Issues</h1>
            <p className="mb-8 text-gray-500">Track reports you have submitted and their latest progress.</p>
            {loading && <Loader />}
            {error && <p className="rounded-lg bg-red-50 p-4 text-red-700">{error}</p>}
            {!loading && !error && issues.length === 0 && <p className="rounded-lg bg-white p-8 text-gray-500">You have not reported any issues yet.</p>}
            {!loading && !error && issues.length > 0 && <IssueTable issues={issues} />}
        </CitizenLayout>
        </>
    );
}

export default MyIssues;