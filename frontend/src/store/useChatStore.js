import { create } from 'zustand'
import { axiosInstance } from '../lib/axios.js'
import toast from 'react-hot-toast';

export const useChatStore = create((set,get) => ({ // returns an object
    allContacts : [],
    chats : [],
    messages : [],
    activeTab : "chats", // initially the chats tab should be selected i.e on refreshing the page 
    selectedUser : null,
    isUsersLoading : false,
    isMessagesLoading : false,
    isSoundEnabled : JSON.parse(localStorage.getItem("isSoundEnabled")) === true, // refreshing the page doesn't turn on or off the sound
    toggleSound : () => {
        localStorage.setItem("isSoundEnabled", !get().isSoundEnabled ) // update localStorage
        set({isSoundEnabled : !get().isSoundEnabled }) // update state
    },

    setActiveTab : (tab) => set({activeTab : tab}),
    setSelectedUser : (selectedUser) => set({selectedUser}),

    getAllContacts : async() => {
        set({isUsersLoading : true});
        try {
            const res = await axiosInstance.get("/messages/contacts");
            set({allContacts : res.data});
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Something went wrong!');
        }finally{
            set({isUsersLoading : false});
        }
    },

    getMyChatPartners : async() => {
        set({isUsersLoading : true});
        try {
            const res = await axiosInstance.get("/messages/chats");
            set({chats : res.data});
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Something went wrong!');
        }finally{
            set({isUsersLoading : false});
        }
    },

    getMessageByUserId : async (userId) => {
        set({isMessagesLoading : true});
        try {
            const res = axiosInstance.get(`messages/${userId}`);
            set({messages : res.data})
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong!');
        } finally{
            set({isMessagesLoading : false});
        }
    }
}))