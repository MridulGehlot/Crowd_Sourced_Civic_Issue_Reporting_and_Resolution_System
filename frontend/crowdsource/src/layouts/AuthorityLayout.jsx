import { Link } from "react-router-dom";
import useAuthStore from "../store/authStore";

function AuthorityLayout({ children }) {
	const user = useAuthStore((state) => state.user);
	const signOut = useAuthStore((state) => state.signOut);
	return <div className="flex min-h-screen bg-gray-100"><aside className="hidden w-64 bg-slate-900 p-6 text-white md:block"><h1 className="text-xl font-bold">Civic Portal</h1><p className="mt-2 text-sm text-slate-300">Authority workspace</p><nav className="mt-10 flex flex-col gap-4"><Link to="/authority/dashboard">Dashboard</Link><Link to="/authority/assigned">Assigned issues</Link></nav></aside><main className="min-w-0 flex-1 p-5 md:p-8"><header className="mb-8 flex items-center justify-between rounded-xl bg-white p-4 shadow-sm"><div><p className="text-sm text-gray-500">Signed in as</p><p className="font-semibold">{user?.name}</p></div><button className="font-semibold text-blue-700" onClick={signOut}>Log out</button></header>{children}</main></div>;
}

export default AuthorityLayout;
