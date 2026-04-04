import { useDispatch } from "react-redux"
import { clearRelatedItem, setError, setLoading, setRelatedItem, setSaves, setSmartResurface } from "../save.slice"
import { deleteItems, getGraphAnalytics, getRelatedItems, getSavedItems, getSmartResurfaceItems } from "../services/save.service"


export const useSave = ()=>{
    const dispatch = useDispatch()

    const getAllSavedItems = async (page=1)=>{
        try {
           dispatch(setLoading(true))
           const res = await getSavedItems(page, 5)
           dispatch(setSaves(res))
           
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
            dispatch(setSmartResurface({
                timeBased: res.timeBased || [],
                relevanceBased: res.relevanceBased || []
            }))
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

    const getGraphData = async ()=>{
        const res = await getGraphAnalytics();
        return res
    }


    return {getAllSavedItems, getAllRelatedItems, getSmartResurface,getGraphData, deleteItem}
}