import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import StatusBadge from "../../components/ui/StatusBadge";
import Loader from "../../components/common/Loader";
import { getAllIssues } from "../../api/issueApi";

function Issues() {
	const [issues, setIssues] = useState([]);
	const [filters, setFilters] = useState({ search: "", category: "", status: "" });
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const load = async () => {
			setLoading(true);
			try {
				const response = await getAllIssues({ ...filters, page: 1, limit: 30 });
				setIssues(response.data?.items || []);
				setError("");
			} catch (requestError) {
				setError(requestError.response?.data?.message || "We could not load public issues.");
			} finally { setLoading(false); }
		};
		load();
	}, [filters]);

	return <><Navbar /><main className="mx-auto max-w-7xl px-6 py-12">
		<h1 className="text-4xl font-bold text-gray-900">Public issues</h1>
		<p className="mt-2 text-gray-500">See what your community is reporting and how it is progressing.</p>
		<div className="my-8 grid gap-3 md:grid-cols-3">
			<input aria-label="Search issues" className="rounded-lg border p-3" placeholder="Search issues or locations" value={filters.search} onChange={(event) => setFilters({ ...filters, search: event.target.value })} />
			<select aria-label="Filter by category" className="rounded-lg border p-3" value={filters.category} onChange={(event) => setFilters({ ...filters, category: event.target.value })}><option value="">All categories</option><option value="road">Road</option><option value="water">Water</option><option value="electricity">Electricity</option><option value="garbage">Garbage</option><option value="sewage">Sewage</option><option value="street_light">Street light</option><option value="other">Other</option></select>
			<select aria-label="Filter by status" className="rounded-lg border p-3" value={filters.status} onChange={(event) => setFilters({ ...filters, status: event.target.value })}><option value="">All statuses</option><option value="pending">Pending</option><option value="assigned">Assigned</option><option value="in_progress">In progress</option><option value="resolved">Resolved</option><option value="rejected">Rejected</option></select>
		</div>
		{loading && <Loader />}{error && <p className="rounded-lg bg-red-50 p-4 text-red-700">{error}</p>}
		{!loading && !error && issues.length === 0 && <p className="rounded-lg bg-gray-50 p-8 text-gray-500">No issues match these filters.</p>}
		<div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{issues.map((issue) => <article key={issue._id} className="rounded-xl border bg-white p-5 shadow-sm"><div className="flex items-start justify-between gap-3"><h2 className="font-semibold text-gray-900">{issue.title}</h2><StatusBadge status={issue.status} /></div><p className="mt-3 line-clamp-3 text-sm text-gray-600">{issue.description}</p><p className="mt-4 text-sm text-gray-500">{issue.address}</p><Link className="mt-5 inline-block font-semibold text-blue-700 hover:underline" to={`/issues/${issue._id}`}>View details</Link></article>)}</div>
	</main></>;
}

export default Issues;
