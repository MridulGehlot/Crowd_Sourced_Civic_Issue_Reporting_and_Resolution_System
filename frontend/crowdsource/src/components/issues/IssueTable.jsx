import { Link } from "react-router-dom";
import StatusBadge from "../ui/StatusBadge";

function IssueTable({ issues = [] }) {
	return (
		<div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
			<table className="w-full text-left text-sm">
				<thead className="border-b bg-gray-50 text-gray-600">
					<tr><th className="px-4 py-3">Issue</th><th className="px-4 py-3">Category</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Reported</th><th className="px-4 py-3" /></tr>
				</thead>
				<tbody className="divide-y divide-gray-100">
					{issues.map((issue) => (
						<tr key={issue._id} className="hover:bg-gray-50">
							<td className="px-4 py-4"><div className="font-semibold text-gray-900">{issue.title}</div><div className="text-gray-500">{issue.address}</div></td>
							<td className="px-4 py-4 capitalize">{issue.category.replace("_", " ")}</td>
							<td className="px-4 py-4"><StatusBadge status={issue.status} /></td>
							<td className="px-4 py-4 text-gray-500">{new Date(issue.createdAt).toLocaleDateString()}</td>
							<td className="px-4 py-4 text-right"><Link className="font-semibold text-blue-700 hover:underline" to={`/issues/${issue._id}`}>View</Link></td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default IssueTable;
