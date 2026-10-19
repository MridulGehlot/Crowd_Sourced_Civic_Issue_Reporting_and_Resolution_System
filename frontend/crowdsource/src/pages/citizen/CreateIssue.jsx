import CitizenLayout from "../../layouts/CitizenLayout";
import { useState } from "react";
import { createIssue } from "../../api/issueApi";
import { useNavigate } from "react-router-dom";

function CreateIssue() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        title: "",
        category: "road",
        address: "",
        description: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title.trim() || !formData.address.trim() || !formData.description.trim()) {
            setError("Complete the title, category, location, and description before submitting.");
            return;
        }
        try{
            setLoading(true);
            setError("");
            await createIssue(formData);
            navigate("/citizen/my-issues");
        } catch (requestError) {
            setError(requestError.response?.data?.message || "We could not submit this issue. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <CitizenLayout>
            <div className="mx-auto max-w-3xl">
                <div className="mb-8">
                    <p className="text-sm font-semibold uppercase tracking-wide text-terracotta-700">New report</p>
                    <h1 className="mt-2 text-3xl font-bold text-stone-950">Create an issue</h1>
                    <p className="mt-2 text-stone-500">Share enough detail for the right department to act quickly.</p>
                </div>

                <form className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm md:p-8" onSubmit={handleSubmit}>
                    {error && <p role="alert" className="mb-6 rounded-lg bg-red-50 p-3 text-sm text-red-800">{error}</p>}
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="md:col-span-2">
                            <label className="mb-2 block text-sm font-semibold text-stone-800" htmlFor="title">Issue title</label>
                            <input id="title" name="title" value={formData.title} onChange={handleChange} placeholder="For example, street light not working" className="w-full rounded-lg border border-stone-300 px-3 py-3 text-base outline-none focus:border-terracotta-500 focus:ring-2 focus:ring-orange-100" />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-stone-800" htmlFor="category">Category</label>
                            <select id="category" name="category" value={formData.category} onChange={handleChange} className="w-full rounded-lg border border-stone-300 bg-white px-3 py-3 text-base outline-none focus:border-terracotta-500 focus:ring-2 focus:ring-orange-100">
                                <option value="road">Road</option><option value="water">Water</option><option value="electricity">Electricity</option><option value="garbage">Garbage</option><option value="sewage">Sewage</option><option value="street_light">Street light</option><option value="other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-stone-800" htmlFor="address">Location</label>
                            <input id="address" name="address" value={formData.address} onChange={handleChange} placeholder="Address or nearby landmark" className="w-full rounded-lg border border-stone-300 px-3 py-3 text-base outline-none focus:border-terracotta-500 focus:ring-2 focus:ring-orange-100" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="mb-2 block text-sm font-semibold text-stone-800" htmlFor="description">What is happening?</label>
                            <textarea id="description" rows="6" name="description" value={formData.description} onChange={handleChange} placeholder="Describe the problem, its impact, and anything that may help the department find it." className="w-full resize-y rounded-lg border border-stone-300 px-3 py-3 text-base outline-none focus:border-terracotta-500 focus:ring-2 focus:ring-orange-100" />
                        </div>
                    </div>
                    <div className="mt-8 flex justify-end border-t border-stone-200 pt-6">
                        <button type="submit" disabled={loading} className="rounded-lg bg-terracotta-700 px-5 py-3 font-semibold text-white hover:bg-terracotta-500 disabled:cursor-not-allowed disabled:opacity-60">{loading ? "Submitting..." : "Submit issue"}</button>
                    </div>
                </form>
            </div>
        </CitizenLayout>
    );
}

export default CreateIssue;