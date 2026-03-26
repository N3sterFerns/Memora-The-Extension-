import { configureStore } from '@reduxjs/toolkit'
import authSlice from "../src/features/auth/auth.slice"
import saveSlice from "../src/features/save/save.slice"

const store = configureStore({
    reducer: {
        auth: authSlice,
        save: saveSlice
    }
})

export default store;