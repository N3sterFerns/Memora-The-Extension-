import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
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
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setSaves, addSave, setLoading, setError } = saveSlice.actions;
export default saveSlice.reducer;