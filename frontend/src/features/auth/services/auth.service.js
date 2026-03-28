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



export const register = async (data)=>{
    const res = await axiosInstance.post("/api/auth/register", data)
    return res.data;
}

export const login = async (data)=>{
    const res = await axiosInstance.post("/api/auth/login", data)
    return res.data;
}


export const getMe = async ()=>{
    const res = await axiosInstance.get("/api/auth/me")
    return res.data;
}