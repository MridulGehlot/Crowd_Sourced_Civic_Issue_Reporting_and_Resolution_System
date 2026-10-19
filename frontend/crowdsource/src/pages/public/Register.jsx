import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../api/authApi";

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: ""
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await registerUser(formData);
            navigate("/login");
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                <h1 className="text-3xl font-bold text-center mb-2">Create Account</h1>
                <p className="text-center text-gray-500 mb-8">Register to report civic issues</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-2 font-medium">Name</label>
                        <input name="name" value={formData.name} onChange={handleChange} className="w-full border rounded-lg p-3" />
                    </div>
                    <div>
                        <label className="block mb-2 font-medium">Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border rounded-lg p-3" />
                    </div>
                    <div>
                        <label className="block mb-2 font-medium">Phone</label>
                        <input name="phone" value={formData.phone} onChange={handleChange} className="w-full border rounded-lg p-3" />
                    </div>
                    <div>
                        <label className="block mb-2 font-medium">Password</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full border rounded-lg p-3" />
                    </div>

                    <button disabled={loading} className="w-full bg-terracotta-700 text-white py-3 rounded-lg hover:bg-terracotta-500 transition disabled:opacity-50">
                        {loading ? "Creating account..." : "Register"}
                    </button>
                </form>

                <p className="text-center mt-6">
                    Already have an account? <Link to="/login" className="text-terracotta-700 font-semibold">Login</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;