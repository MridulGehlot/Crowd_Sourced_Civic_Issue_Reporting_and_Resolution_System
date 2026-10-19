import { create } from "zustand";

const useIssueStore = create((set) => ({
    issues: [],
    setIssues: (issues) => set({ issues })
}));

export default useIssueStore;