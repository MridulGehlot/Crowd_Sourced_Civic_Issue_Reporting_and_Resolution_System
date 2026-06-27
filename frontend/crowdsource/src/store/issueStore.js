import {create} from "zustand";

const useIssueStore = create((status)=>({
    issues : [],
    setIssues : function(issues){
        set({issues});
    }
}));

export default useIssueStore;