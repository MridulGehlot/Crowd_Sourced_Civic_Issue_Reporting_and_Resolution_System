import api from "./axios";

export const getMyIssues = async()=>{
    const response = await api.get("/issues/my");
    return response.data;
}

export const getAllIssues = async (params = {})=>{
    const response = await api.get("/issues", { params });
    return response.data;
}

export const createIssue = async (data)=>{
    const response = await api.post("/issues",data);
    return response.data;
}

export const getIssueById = async (id)=>{
    const response = await api.get(`/issues/${id}`);
    return response.data;
};

export const getAssignedIssues = async (params = {})=>{
    const response = await api.get("/issues/assigned", { params });
    return response.data;
};

export const updateIssueStatus = async (id, data)=>{
    const response = await api.patch(`/issues/${id}/status`, data);
    return response.data;
};