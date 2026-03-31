import { getMe, login, register } from "../services/auth.service";
import {useDispatch} from "react-redux"
import {toast} from "react-toastify"
import {setLoading, setUser, setError} from "../auth.slice"

export const useAuth = ()=>{

    const dispatch = useDispatch()

    const handleRegister = async (userDetails)=>{
        try {
            const res = await register(userDetails)
            dispatch(setUser(res.user));
            toast.success("Account Created Successfully.")
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.msg || "Registration Failed")
            dispatch(setError(error.response?.data?.msg || "Registration Failed"))
        }finally{
            dispatch(setLoading(false))
        }
    }

    const handleLogin = async (userDetails)=>{
        try {
            const res = await login(userDetails)

            localStorage.setItem("token", res.token);

            dispatch(setUser(res.user));

            const token = res.token;

            if(window.chrome){
                window.postMessage({type: "SET_TOKEN", token}, "*")
            }

            toast.success("Logged In Successfully.")
        } catch (error) {
            dispatch(setError(error.response?.data?.msg || "Login Failed"))
        }finally{
            dispatch(setLoading(false))
        }
    }

    const getUser = async ()=>{
        try {
            const res = await getMe()
            dispatch(setUser(res.user))
            
            const token = localStorage.getItem("token");

            if(window.chrome && token){
                console.log(token, "inside")
                window.postMessage({type: "SET_TOKEN", token}, "*")
            }

        } catch (error) {
            dispatch(setError(error.response?.data?.msg || "Fetcheing User Failed"))
        }finally{
            dispatch(setLoading(false))
        }
    }

    return {handleRegister, handleLogin, getUser}
}