import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    onlineUsers: []
}
export const socketSlice = createSlice({
    name: "socket",
    initialState,
    reducers: {
        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload
        }
    }
})

export default socketSlice.reducer
export const { setOnlineUsers } = socketSlice.actions