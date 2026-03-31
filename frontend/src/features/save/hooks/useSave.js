import { useDispatch } from "react-redux"
import { clearRelatedItem, setError, setLoading, setRelatedItem, setSaves, setSmartResurface } from "../save.slice"
import { deleteItems, getRelatedItems, getSavedItems, getSmartResurfaceItems } from "../services/save.service"


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
    
    const getAllRelatedItems = async (itemId)=>{
        try {
           dispatch(clearRelatedItem())
           dispatch(setLoading(true))
           const res = await getRelatedItems(itemId)
           dispatch(setRelatedItem(res.relatedItems))
           
        } catch (error) {
            dispatch(setError(error))
        }finally{
            dispatch(setLoading(false))
        }
    }


    const getSmartResurface = async ()=>{
        try {
            dispatch(setLoading(true))
            const res = await getSmartResurfaceItems();
            dispatch(setSmartResurface(res.items))
        } catch (error) {
            dispatch(setError(error))
        }finally{
            dispatch(setLoading(false))
        }
    }

    const deleteItem = async (id)=>{
        try {
            dispatch(setLoading(true))
            await deleteItems(id);
        } catch (error) {
            dispatch(setError(error))
        }finally{
            dispatch(setLoading(false))
        }
    }


    return {getAllSavedItems, getAllRelatedItems, getSmartResurface, deleteItem}
}