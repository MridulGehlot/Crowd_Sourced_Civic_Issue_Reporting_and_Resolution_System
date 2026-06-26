import { Link } from "react-router-dom";
import { useState } from "react";
import { loginUser ,getCurrentUser} from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";

function Login(){

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const setUser = useAuthStore((state)=>state.setUser);
    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const response = await loginUser({email,password});
            const user = await getCurrentUser();
            setUser(user.data);
            alert(user.data.role);
            if(user.data.role==="citizen") navigate("/citizen/dashboard");
            else if(user.data.role==="authority") navigate("/authority/dashboard");
            else navigate("/admin/dashboard");
        }catch(error)
        {
            console.log(error);
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                <h1 className="text-3xl font-bold text-center mb-2">
                    Civic Issue Portal
                </h1>
                <p className="text-center text-gray-500 mb-8">
                    Login to continue
                </p>
                <form onSubmit={handleSubmit}>
                     <div className="mb-5">
            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          <div className="mb-6">

            <label className="block mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          <button
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
                </form>

        <p className="text-center mt-6">

          Don't have an account?

          {" "}

          <Link
            to="/register"
            className="text-blue-600 font-semibold"
          >
            Register
          </Link>

        </p>

            </div>
        </div>
    );
}
export default Login;