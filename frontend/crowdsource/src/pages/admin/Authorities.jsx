import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { createAuthority, getAuthorities } from "../../api/adminApi";
import { getDepartments } from "../../api/departmentApi";

const initialForm = { name: "", email: "", password: "", phone: "", department: "" };

function Authorities() {
	const [authorities, setAuthorities] = useState([]);
	const [departments, setDepartments] = useState([]);
	const [form, setForm] = useState(initialForm);
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");
	const load = async () => { const [authorityResponse, departmentResponse] = await Promise.all([getAuthorities(), getDepartments()]); setAuthorities(authorityResponse.data || []); setDepartments(departmentResponse.data || []); };
	useEffect(() => {
		Promise.all([getAuthorities(), getDepartments()])
			.then(([authorityResponse, departmentResponse]) => { setAuthorities(authorityResponse.data || []); setDepartments(departmentResponse.data || []); })
			.catch((requestError) => setError(requestError.response?.data?.message || "Could not load authority data."));
	}, []);
	const submit = async (event) => { event.preventDefault(); setError(""); setMessage(""); try { await createAuthority(form); setForm(initialForm); setMessage("Authority account created."); await load(); } catch (requestError) { setError(requestError.response?.data?.message || "Could not create authority."); } };
	return <AdminLayout><h1 className="text-3xl font-bold text-stone-950">Authorities</h1><p className="mt-2 text-stone-500">Create accounts for staff who process reports.</p>{message && <p className="mt-5 rounded-lg bg-green-50 p-3 text-green-800">{message}</p>}{error && <p className="mt-5 rounded-lg bg-red-50 p-3 text-red-800">{error}</p>}<form onSubmit={submit} className="mt-8 grid gap-3 rounded-xl border border-stone-200 bg-white p-5 md:grid-cols-5"><input required className="rounded-lg border p-3" placeholder="Name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /><input required type="email" className="rounded-lg border p-3" placeholder="Email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /><input required minLength="8" type="password" className="rounded-lg border p-3" placeholder="Temporary password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} /><input required className="rounded-lg border p-3" placeholder="Phone" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} /><select required className="rounded-lg border p-3" value={form.department} onChange={(event) => setForm({ ...form, department: event.target.value })}><option value="">Department</option>{departments.map((department) => <option key={department._id} value={department.category}>{department.name}</option>)}</select><button className="rounded-lg bg-stone-900 px-4 py-3 font-semibold text-white md:col-span-5">Create authority</button></form><div className="mt-8 overflow-x-auto rounded-xl border border-stone-200 bg-white"><table className="w-full text-left text-sm"><thead className="border-b bg-stone-50"><tr><th className="p-4">Name</th><th className="p-4">Email</th><th className="p-4">Department</th><th className="p-4">Status</th></tr></thead><tbody className="divide-y">{authorities.map((authority) => <tr key={authority._id}><td className="p-4 font-semibold">{authority.name}</td><td className="p-4">{authority.email}</td><td className="p-4">{authority.department?.name || "Unassigned"}</td><td className="p-4">{authority.isActive ? "Active" : "Inactive"}</td></tr>)}</tbody></table></div></AdminLayout>;
}

export default Authorities;
