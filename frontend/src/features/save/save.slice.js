import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  relatedItems: [],
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
    clearRelatedItem: (state, action)=>{
      state.relatedItems = []
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setSaves, addSave, setLoading,setRelatedItem,clearRelatedItem, setError } = saveSlice.actions;
export default saveSlice.reducer;