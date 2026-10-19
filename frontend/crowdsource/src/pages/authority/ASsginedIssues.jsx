import { useEffect, useState } from "react";
import AuthorityLayout from "../../layouts/AuthorityLayout";
import { getAssignedIssues, updateIssueStatus } from "../../api/issueApi";
import StatusBadge from "../../components/ui/StatusBadge";
import Loader from "../../components/common/Loader";

function AssignedIssues() {
	const [issues, setIssues] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");
	const [remark, setRemark] = useState({});

	const loadIssues = async () => {
		try { const response = await getAssignedIssues(); setIssues(response.data || []); setError(""); }
		catch (requestError) { setError(requestError.response?.data?.message || "We could not load assigned issues."); }
		finally { setLoading(false); }
	};
	useEffect(() => {
		let active = true;
		getAssignedIssues()
			.then((response) => { if (active) setIssues(response.data || []); })
			.catch((requestError) => { if (active) setError(requestError.response?.data?.message || "We could not load assigned issues."); })
			.finally(() => { if (active) setLoading(false); });
		return () => { active = false; };
	}, []);

	const changeStatus = async (issue, status) => {
		const resolutionRemark = remark[issue._id] || "";
		if (status === "resolved" && !resolutionRemark.trim()) { setError("A resolution remark is required before resolving an issue."); return; }
		try { await updateIssueStatus(issue._id, { status, ...(resolutionRemark ? { resolutionRemark } : {}) }); setMessage("Issue status updated."); setError(""); await loadIssues(); }
		catch (requestError) { setError(requestError.response?.data?.message || "Status update failed."); }
	};

	return <AuthorityLayout><h1 className="text-3xl font-bold text-gray-900">Assigned issues</h1><p className="mt-2 text-gray-500">Review reports assigned to your department and keep citizens informed.</p>{message && <p className="mt-5 rounded-lg bg-green-50 p-3 text-green-700">{message}</p>}{error && <p className="mt-5 rounded-lg bg-red-50 p-3 text-red-700">{error}</p>}{loading && <Loader />}{!loading && issues.length === 0 && <p className="mt-8 rounded-xl bg-white p-8 text-gray-500">There are no issues assigned to you.</p>}<div className="mt-8 space-y-4">{issues.map((issue) => <article key={issue._id} className="rounded-xl border bg-white p-5 shadow-sm"><div className="flex flex-wrap items-start justify-between gap-3"><div><h2 className="text-lg font-semibold">{issue.title}</h2><p className="mt-1 text-sm text-gray-500">{issue.address} · {new Date(issue.createdAt).toLocaleDateString()}</p></div><StatusBadge status={issue.status} /></div><p className="mt-4 text-gray-700">{issue.description}</p><div className="mt-5 flex flex-wrap items-center gap-3">{issue.status === "assigned" && <button className="rounded-lg bg-blue-700 px-4 py-2 font-semibold text-white" onClick={() => changeStatus(issue, "in_progress")}>Start work</button>}{issue.status === "in_progress" && <><textarea aria-label={`Resolution remark for ${issue.title}`} className="min-w-64 flex-1 rounded-lg border p-2" placeholder="Resolution remark" value={remark[issue._id] || ""} onChange={(event) => setRemark({ ...remark, [issue._id]: event.target.value })} /><button className="rounded-lg bg-green-700 px-4 py-2 font-semibold text-white" onClick={() => changeStatus(issue, "resolved")}>Resolve issue</button></>}{["assigned", "in_progress"].includes(issue.status) && <button className="rounded-lg border border-red-200 px-4 py-2 font-semibold text-red-700" onClick={() => changeStatus(issue, "rejected")}>Reject</button>}</div></article>)}</div></AuthorityLayout>;
}

export default AssignedIssues;
