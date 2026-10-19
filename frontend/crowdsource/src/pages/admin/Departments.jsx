import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { createDepartment, getDepartments } from "../../api/departmentApi";

const categories = ["road", "water", "electricity", "garbage", "sewage", "street_light", "other"];
function Departments() {
	const [departments, setDepartments] = useState([]); const [form, setForm] = useState({ name: "", category: "road", description: "" }); const [error, setError] = useState("");
	const load = async () => setDepartments((await getDepartments()).data || []);
	useEffect(() => {
		getDepartments()
			.then((response) => setDepartments(response.data || []))
			.catch((requestError) => setError(requestError.response?.data?.message || "Could not load departments."));
	}, []);
	const submit = async (event) => { event.preventDefault(); try { await createDepartment(form); setForm({ name: "", category: "road", description: "" }); setError(""); await load(); } catch (requestError) { setError(requestError.response?.data?.message || "Could not create department."); } };
	return <AdminLayout><h1 className="text-3xl font-bold text-stone-950">Departments</h1><p className="mt-2 text-stone-500">Map civic issue categories to the teams responsible for them.</p>{error && <p className="mt-5 rounded-lg bg-red-50 p-3 text-red-800">{error}</p>}<form onSubmit={submit} className="mt-8 grid gap-3 rounded-xl border border-stone-200 bg-white p-5 md:grid-cols-3"><input required className="rounded-lg border p-3" placeholder="Department name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /><select className="rounded-lg border p-3" value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })}>{categories.map((category) => <option key={category} value={category}>{category.replace("_", " ")}</option>)}</select><input className="rounded-lg border p-3" placeholder="Short description" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} /><button className="rounded-lg bg-stone-900 px-4 py-3 font-semibold text-white md:col-span-3">Add department</button></form><div className="mt-8 grid gap-4 md:grid-cols-2">{departments.map((department) => <article key={department._id} className="rounded-xl border border-stone-200 bg-white p-5"><div className="flex justify-between gap-4"><h2 className="font-semibold">{department.name}</h2><span className="rounded-full bg-stone-100 px-3 py-1 text-xs capitalize">{department.category.replace("_", " ")}</span></div><p className="mt-3 text-sm text-stone-500">{department.description || "No description provided."}</p><p className="mt-4 text-sm font-semibold">{department.isActive ? "Active" : "Inactive"}</p></article>)}</div></AdminLayout>;
}

export default Departments;
