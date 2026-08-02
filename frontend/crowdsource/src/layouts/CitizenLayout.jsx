import Sidebar from "../components/common/Sidebar";
import Topbar from "../components/common/Topbar";
import StatusBadge from "../components/ui/StatusBadge";

function CitizenLayout({children}){
    return (
        <>
        <div className="flex min-h-screen">
            <Sidebar/>
            <main className="flex-1 bg-gray-100 p-8">
                <Topbar />
                {children}
            </main>
            <div className="overflow-x-auto">
                <table className="w-full bg-white shadow rounded-lg">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-4">Title</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Address</th>
                            <th>Reported</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        issues.map((issue)=>(
                        <tr key={issue._id}>
                            <td className="p-4">{issue.title}</td>
                            <td>{issue.category}</td>
                            <td><StatusBadge status={issue.status}/></td>
                            <td>{issue.address}</td>
                            <td>{new Date(issue.createdAt).toLocaleDateString()}</td>
                            <td><button>View</button></td>
                        </tr>))
                        }
                    </tbody>
                </table>
            </div>
        </div>
        </>
    );
}

export default CitizenLayout;