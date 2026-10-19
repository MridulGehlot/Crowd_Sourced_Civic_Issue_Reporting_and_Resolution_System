import api from "./axios";

export const getAuthorities = async () => (await api.get("/admin/authorities")).data;
export const createAuthority = async (data) => (await api.post("/admin/authorities", data)).data;
