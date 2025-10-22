import {create} from "zustand";
import {axiosInstance} from '../lib/axios.js';
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "/"

export const useAuthStore = create((set,get) => ({
    authUser : null,
    isCheckingAuth : true,
    isSigningUp : false,
    isLoggingIn : false,
    isUpdatingProfileImg: false,
    socket : null,
    onlineUsers : [],
    
    checkAuth : async () => { // for page refresh
        try {
            const res = await axiosInstance.get("/auth/check");
            set({authUser : res.data});
            get().connectSocket();
        } catch (error) {
            console.log("Error in authCheck: ", error);
            set({authUser : null})
        }finally{
            set({isCheckingAuth : false}); 
        }
    },

    login : async (data) => {
        set({isLoggingIn : true})
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({authUser : res.data});

            // toast 
            toast.success("Logged In successfully")

            get().connectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isLoggingIn : false})
        }
    },

    signUp : async (data) => {
        set({isSigningUp : true})
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({authUser : res.data});

            // toast 
            toast.success("Account Created successfully!")
            get().connectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isSigningUp : false})
        }
    },

    logout: async() => {
        try {
            await axiosInstance.post("/auth/logout");
            set({authUser : null})
            toast.success("Logged out successfully")
            get().disconnectSocket();
        } catch (error) {
            toast.error("Error logging out"); 
            console.log("Logout error: ", error);
        }
    },

    updateProfile : async (data) => {
        set({isUpdatingProfileImg : true})
        try {
            const res = await axiosInstance.put("/auth/update-profile", data);
            set({authUser : res.data});
            toast.success("Profile updated successfully")
        } catch (error) {
            console.log('Error in updating profile', error);
            toast.error(error.response.data.message);
        }finally{
            set({isUpdatingProfileImg : false})
        }
    },

    connectSocket : () => {
        // check if user is authenticated or not
        const {authUser} = get();
        if(!authUser || get().socket?.connected ) return

        // if authenticated establish socket server 
        const socket = io(BASE_URL, {
            withCredentials : true, // this sends cookies are sent with the connections 
        });

        // connect a socket server
        socket.connect();
        
        //update the state of socket
        set({socket})

        // listen for online users
        socket.on("getOnlineUsers", (userIds) => {
            set({onlineUsers : userIds});
        })
    },

    disconnectSocket : () => {
        if(get().socket?.connected) get().socket?.disconnect();
    }
}))