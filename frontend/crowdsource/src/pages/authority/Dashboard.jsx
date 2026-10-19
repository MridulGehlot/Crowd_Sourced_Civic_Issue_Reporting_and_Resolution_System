import { Link } from "react-router-dom";
import AuthorityLayout from "../../layouts/AuthorityLayout";

function AuthorityDashboard(){
    return <AuthorityLayout><h1 className="text-3xl font-bold text-gray-900">Authority dashboard</h1><p className="mt-2 text-gray-500">Keep assigned civic reports moving toward resolution.</p><div className="mt-8 rounded-xl bg-white p-8 shadow-sm"><h2 className="text-xl font-semibold">Your work queue</h2><p className="mt-2 text-gray-600">Open assigned issues to begin work, provide a resolution remark, or reject an invalid report.</p><Link className="mt-5 inline-block rounded-lg bg-blue-700 px-4 py-2 font-semibold text-white" to="/authority/assigned">View assigned issues</Link></div></AuthorityLayout>;

}

export default AuthorityDashboard;