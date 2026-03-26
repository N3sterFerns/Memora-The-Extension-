import { useDispatch } from "react-redux"
import { setError, setLoading, setSaves } from "../save.slice"
import { getSavedItems } from "../services/save.service"


export const useSave = ()=>{
    const dispatch = useDispatch()

    const getAllSavedItems = async ()=>{
        try {
           dispatch(setLoading(true))
           const res = await getSavedItems()
           dispatch(setSaves(res.items))
           
        } catch (error) {
            dispatch(setError(error))
        }finally{
            dispatch(setLoading(false))
        }
    }


    return {getAllSavedItems}
}