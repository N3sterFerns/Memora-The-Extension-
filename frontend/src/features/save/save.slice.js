import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  relatedItems: [],
  resurfaceItems: [],
  loading: false,
  error: null,
};

const saveSlice = createSlice({
  name: "save",
  initialState,
  reducers: {
    setSaves: (state, action) => {
      state.items = action.payload;
    },
    addSave: (state, action) => {
      state.items.unshift(action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setRelatedItem: (state, action)=>{
      state.relatedItems = action.payload;
    },
    setSmartResurface: (state, action)=>{
      state.resurfaceItems = action.payload;
    },
    clearRelatedItem: (state, action)=>{
      state.relatedItems = []
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setSaves, addSave, setSmartResurface, setLoading,setRelatedItem,clearRelatedItem, setError } = saveSlice.actions;
export default saveSlice.reducer;