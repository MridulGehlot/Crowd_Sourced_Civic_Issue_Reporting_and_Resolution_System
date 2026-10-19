import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import StatusBadge from "../../components/ui/StatusBadge";
import Loader from "../../components/common/Loader";
import { getIssueById } from "../../api/issueApi";

function IssueDetails() {
	const { id } = useParams();
	const [issue, setIssue] = useState(null);
	const [activities, setActivities] = useState([]);
	const [error, setError] = useState("");
	useEffect(() => { getIssueById(id).then((response) => { setIssue(response.data?.issue || response.data); setActivities(response.data?.activities || []); }).catch((requestError) => setError(requestError.response?.data?.message || "Issue not found.")); }, [id]);
	return <><Navbar /><main className="mx-auto max-w-4xl px-6 py-12">{!issue && !error && <Loader />}{error && <p className="rounded-lg bg-red-50 p-4 text-red-700">{error}</p>}{issue && <><Link className="text-sm font-semibold text-terracotta-700" to="/issues">Back to issues</Link><div className="mt-4 rounded-xl border border-stone-200 bg-white p-6 shadow-sm"><div className="flex flex-wrap items-center justify-between gap-4"><h1 className="text-3xl font-bold text-stone-950">{issue.title}</h1><StatusBadge status={issue.status} /></div><p className="mt-6 whitespace-pre-wrap text-stone-700">{issue.description}</p><dl className="mt-8 grid gap-4 border-t border-stone-200 pt-6 sm:grid-cols-2"><div><dt className="text-sm text-stone-500">Category</dt><dd className="capitalize">{issue.category.replace("_", " ")}</dd></div><div><dt className="text-sm text-stone-500">Location</dt><dd>{issue.address}</dd></div><div><dt className="text-sm text-stone-500">Reported</dt><dd>{new Date(issue.createdAt).toLocaleString()}</dd></div><div><dt className="text-sm text-stone-500">Assigned authority</dt><dd>{issue.assignedTo?.name || "Awaiting assignment"}</dd></div></dl>{issue.imageURL && <img className="mt-8 max-h-96 w-full rounded-lg object-cover" src={issue.imageURL} alt="Reported issue" />}{activities.length > 0 && <section className="mt-8 border-t border-stone-200 pt-6"><h2 className="text-xl font-semibold">Activity</h2><ol className="mt-4 space-y-4">{activities.map((activity) => <li key={activity._id} className="border-l-2 border-terracotta-500 pl-4"><p className="font-medium">{activity.action}</p><p className="text-sm text-stone-500">{new Date(activity.createdAt).toLocaleString()}{activity.actor?.name ? ` · ${activity.actor.name}` : ""}</p>{activity.remark && <p className="mt-1 text-sm text-stone-700">{activity.remark}</p>}</li>)}</ol></section>}{issue.resolutionRemark && <section className="mt-8 rounded-lg bg-green-50 p-4"><h2 className="font-semibold text-green-900">Resolution update</h2><p className="mt-2 text-green-800">{issue.resolutionRemark}</p>{issue.resolutionImage && <img className="mt-4 max-h-80 rounded-lg" src={issue.resolutionImage} alt="Resolution evidence" />}</section>}</div></>}</main></>;
}

export default IssueDetails;
