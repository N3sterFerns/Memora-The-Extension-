import axios from "axios"


const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    // withCredentials: true
})

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});



export const getSavedItems = async ()=>{
    const res = await axiosInstance.get("/api/save/all")
    return res.data;
}


export const getRelatedItems = async (id)=>{
    const res = await axiosInstance.get(`/api/save/${id}`)
    return res.data;
}


export const getSmartResurfaceItems = async ()=>{
    const res = await axiosInstance.get("/api/save/smart-resurface")
    return res.data;
}

export const getGraphAnalytics = async ()=>{
    const res = await axiosInstance.get("/api/save/graph")
    return res.data;
}


export const deleteItems = async (id)=>{
    const res = await axiosInstance.delete(`/api/save/delete/${id}`)
    return res.data
}