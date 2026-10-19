
function StatusBadge({status}){
const classes = {
	pending: "bg-amber-100 text-amber-800",
	assigned: "bg-stone-200 text-stone-700",
	in_progress: "bg-orange-100 text-orange-800",
	resolved: "bg-green-100 text-green-800",
	rejected: "bg-red-100 text-red-700"
}[status] || "bg-gray-100 text-gray-700";

const labels = {
	pending: "Pending",
	assigned: "Assigned",
	in_progress: "In Progress",
	resolved: "Resolved",
	rejected: "Rejected"
};

return(
<span
className={`px-3 py-1 rounded-full text-sm ${classes}`}
>
{labels[status] || status}
</span>
)

}

export default StatusBadge;