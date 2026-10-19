import { Link } from "react-router-dom";
import useAuthStore from "../store/authStore";

function AdminLayout({ children }) {
	const user = useAuthStore((state) => state.user);
	const signOut = useAuthStore((state) => state.signOut);
	return <div className="flex min-h-screen bg-stone-100"><aside className="hidden w-64 bg-stone-950 p-6 text-stone-100 md:block"><h1 className="text-xl font-bold">Civic Portal</h1><p className="mt-2 text-sm text-stone-400">Administration</p><nav className="mt-10 flex flex-col gap-4"><Link to="/admin/dashboard">Overview</Link><Link to="/admin/departments">Departments</Link><Link to="/admin/authorities">Authorities</Link></nav></aside><main className="min-w-0 flex-1 p-5 md:p-8"><header className="mb-8 flex items-center justify-between rounded-xl border border-stone-200 bg-white p-4"><div><p className="text-sm text-stone-500">Signed in as</p><p className="font-semibold text-stone-900">{user?.name}</p></div><button className="font-semibold text-terracotta-700" onClick={signOut}>Log out</button></header>{children}</main></div>;
}

export default AdminLayout;
