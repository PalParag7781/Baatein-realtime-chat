import { createSlice } from "@reduxjs/toolkit";
import { getMessageThunk, sendMessageThunk } from "./message.thunk";

const initialState = {
    buttonLoading: false,
    screenLoading: false,
    messages: []
}
export const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        setNewMessages: (state, action) => {
            const oldMessages = state.messages ?? []
            state.messages = [...oldMessages, action.payload]
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendMessageThunk.pending, (state, action) => {
                console.log("pending login")
                state.buttonLoading = true
            })


            .addCase(sendMessageThunk.fulfilled, (state, action) => {
                console.log("fulfilled login")



                state.buttonLoading = false

                state.screenLoading = false

                const oldMessages = state.messages || []

                state.messages = [...oldMessages, action.payload?.message]


            })


            .addCase(sendMessageThunk.rejected, (state, action) => {
                console.log("rejected login")


                state.buttonLoading = false


            })

            .addCase(getMessageThunk.pending, (state, action) => {
                state.buttonLoading = true;
            })
            .addCase(getMessageThunk.fulfilled, (state, action) => {
                state.buttonLoading = false

                state.messages = action.payload?.responseData?.messages || []
            })
            .addCase(getMessageThunk.rejected, (state, action) => {
                state.buttonLoading = false
            })

    }
})


export const { setNewMessages } = messageSlice.actions

export default messageSlice.reducer