
function StatusBadge({status}){
let classes="";
switch(status){
case "pending":
classes="bg-yellow-100 text-yellow-700";
break;
case "assigned":
classes="bg-blue-100 text-blue-700";
break;
case "in_progress":
classes="bg-orange-100 text-orange-700";
break;
case "resolved":
classes="bg-green-100 text-green-700";
break;
default:
classes="bg-gray-100";
}

return(
<span
className={`px-3 py-1 rounded-full text-sm ${classes}`}
>
{status}
</span>
)

}

export default StatusBadge;