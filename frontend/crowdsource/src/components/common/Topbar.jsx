import useAuthStore from "../../store/authStore";

function Topbar() {
    const user = useAuthStore((state) => state.user);
    const signOut = useAuthStore((state) => state.signOut);
    return <div className="mb-6 flex items-center justify-between rounded-lg border border-stone-200 bg-white p-4 shadow-sm"><span className="text-sm text-stone-600">Welcome, <strong className="text-stone-900">{user?.name}</strong></span><button className="font-semibold text-terracotta-700 hover:underline" onClick={signOut}>Log out</button></div>;
}

export default Topbar;