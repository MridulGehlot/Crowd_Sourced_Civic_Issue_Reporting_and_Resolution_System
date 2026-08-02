import CitizenLayout from "../../layouts/CitizenLayout";
import { useEffect } from "react";
import { getMyIssues } from "../../api/issueApi";
import useIssueStore from "../../store/issueStore";

function MyIssues()
{
    const issues = useIssueStore((state)=>state.issues);
    const setIssues = useIssueStore((state)=>state.setIssues);
    useEffect(()=>{
        async function fetch()
        {
            try{
                const response = await getMyIssues();
                setIssues(response.data);
            }catch(error)
            {
                console.log(error);
            }
        }
        fetch();
    },[]);

    return (
        <>
        <CitizenLayout>
            <h1 className="text-3xl font-bold mb-8">
                My Issues
            </h1>
        </CitizenLayout>
        </>
    );
}

export default MyIssues;