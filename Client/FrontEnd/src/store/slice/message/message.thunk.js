import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../components/utilities/axiosInstance";


export const sendMessageThunk = createAsyncThunk("message/send", async ({ receiverId, message }, { rejectWithValue }) => {


    const accessToken = localStorage.getItem("accessToken")
    try {
        const response = await axiosInstance.post(`/message/send/${receiverId}`, { message },
            {
                headers:
                {
                    Authorization: `Bearer ${accessToken}`
                }
            })



        return response.data
    }

    catch (error) {
        console.error(error);
        const errorOutput = error?.response?.data?.errMessage;
        toast.error(errorOutput);
        return rejectWithValue(errorOutput);
    }
})

export const getMessageThunk = createAsyncThunk("message/get", async ({ receiverId }, { rejectWithValue }) => {
    const accessToken = localStorage.getItem("accessToken")
    try {
        const response = await axiosInstance.get(`/message/get-messages/${receiverId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })


        return response.data;

    } catch (error) {
        console.error(error);
        const errorOutput = error?.response?.data?.errMessage;
        toast.error(errorOutput);
        return rejectWithValue(errorOutput);
    }
})