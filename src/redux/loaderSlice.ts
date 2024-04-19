import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: false
}

const loaderSlide = createSlice({
    name: "loaders",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
        }
    }
});

export const { setLoading } = loaderSlide.actions

export default loaderSlide.reducer