import CitizenLayout from "../../layouts/CitizenLayout";
import {useState} from "react";
import { createIssue } from "../../api/issueApi";
import { useNavigate } from "react-router-dom";

function CreateIssue(){
    
    const [loading,setLoading] = useState(false);
    const [formData,setFormData] = useState({
    title:"",
    category:"",
    address:"",
    description:""
    });

    const handleChange = (e)=>{
        const {name,vale} = e.target;
        setFormData({
            ...formData,
            [name]:value
        });
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(formData.title.trim()==="" || formData.address.trim()==="" || formData.description==="")
        {
            //show error
            
            return;
        }
        //console.log(formData);
        try{
            setLoading(true);
const response= await createIssue(formData);
setFormData({
    title: "",
    category: "road",
    address: "",
    description: "",
});
setLoading(false);
navigate("/citizen/my-issues");
//console.log(response);
}
catch(error){
console.log(error);
}
   }

    return (
        <>
        <CitizenLayout className="text-3xl font-bold">
            <h1>
                Create Issue
            </h1>

            <form className="bg-white p-8 rounded-xl shadow mt-8" onSubmit={handleSubmit}>
            <div className="mb-6">
            <label>Title</label>
            <input name="title" value={formData.title} onChange={handleChange} className="w-full border rounded p-3" />
            <select name="category" value={formData.category} onChange={handleChange} className="w-full border rounded p-3">
            <option value="road"> Road</option>
            <option value="water">Water</option>
            <option value="electricity">Electricity</option>
            <option value="garbage">Garbage</option>
            <option value="sewage">Sewage</option>
            <option value="street_light">Street Light</option>
            <option value="other">Other</option>
            </select>
            
            <input name="address" value={formData.address} onChange={handleChange}/>
            <textarea rows="6" name="description" value={formData.description} onChange={handleChange}/>
            <button disabled={loading}>{loading? "Submitting..." : "Submit Issue"}</button>
            </div>
            </form>

        </CitizenLayout>
        </>
    );
}

export default CreateIssue;