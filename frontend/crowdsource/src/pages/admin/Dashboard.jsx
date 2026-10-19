import AdminLayout from "../../layouts/AdminLayout";
import { Link } from "react-router-dom";

function AdminDashboard(){
    return <AdminLayout><h1 className="text-3xl font-bold text-stone-950">Administration overview</h1><p className="mt-2 text-stone-500">Keep the reporting network organized and accountable.</p><div className="mt-8 grid gap-4 md:grid-cols-2"><Link className="rounded-xl border border-stone-200 bg-white p-6 hover:border-terracotta-500" to="/admin/departments"><h2 className="font-semibold">Manage departments</h2><p className="mt-2 text-sm text-stone-500">Configure category ownership for automatic assignment.</p></Link><Link className="rounded-xl border border-stone-200 bg-white p-6 hover:border-terracotta-500" to="/admin/authorities"><h2 className="font-semibold">Manage authorities</h2><p className="mt-2 text-sm text-stone-500">Create and review staff accounts by department.</p></Link></div></AdminLayout>;

}

export default AdminDashboard;