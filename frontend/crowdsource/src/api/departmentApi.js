import api from "./axios";

export const getDepartments = async () => (await api.get("/departments")).data;
export const createDepartment = async (data) => (await api.post("/departments", data)).data;
