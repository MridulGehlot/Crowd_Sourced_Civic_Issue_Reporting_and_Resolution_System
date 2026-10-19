import { create } from "zustand";
import { logoutUser } from "../api/authApi";

const useAuthStore = create((set)=>({
    user:null,
    isAuthenticated:false,
    setUser : (user)=>{
        set({user,isAuthenticated:true});
    },
    clearUser: () => set({ user: null, isAuthenticated: false }),
    logout : ()=>{
        set({user:null,isAuthenticated:false});
    },
    signOut: async ()=>{
        try {
            await logoutUser();
        } finally {
            set({user:null,isAuthenticated:false});
        }
    }
}));

export default useAuthStore;