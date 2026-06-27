import api from "./axios";

export const getMyIssues = async()=>{
    const response = await api.get("/issues/my");
    return response.data;
}

export const getAllIssues = async ()=>{
    const response = await api.get("/issues");
    return response.data;
}

/*
createIssue()
deleteIssue()
updateIssue()
getIssueById()
*/