import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { axiosInstance } from "../../../components/utilities/axiosInstance.js";

export const loginUserThunk = createAsyncThunk("users/login",
    async ({ userName, password }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/user/login", {
                userName, password
            })

            if (response.data) {
                localStorage.setItem("accessToken", response.data.accessToken)
            }
            toast.success("Login Successful")


            return response.data
        }

        catch (error) {
            console.log("catch block running")
            console.log(error.response.data.message);
            const errorOutput = error.response.data.message

            toast.error(errorOutput)

            return rejectWithValue(errorOutput)


        }
    }
)

export const registerUserThunk = createAsyncThunk("users/signUp", async ({ fullName,
    userName, password, gender, confirmPassword }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post("/user/register", {
            fullName,
            userName, password, gender, confirmPassword
        })

        toast.success("successfully signedUp!")



        return response.data
    }

    catch (error) {
        console.log("catch block running")
        console.log(error.response.data.message);
        const errorOutput = error.response.data.message

        toast.error(errorOutput)

        return rejectWithValue(errorOutput)
    }
})

export const logoutUserThunk = createAsyncThunk("/users/logOut", async (_, { rejectWithValue }) => {
    const accessToken = Storage.getItem("accessToken")
    try {
        const response = await axiosInstance.post("/user/logout", {}, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        localStorage.removeItem("accessToken");
        toast.success("logged out successfully ")



        return response.data
    }

    catch (error) {

        console.log("catch block running")
        console.log(error.response.data.message);
        const errorOutput = error.response.data.message

        toast.error(errorOutput)

        return rejectWithValue(errorOutput)
    }
    finally {
        localStorage.removeItem("accessToken");
    }
})

export const getUserProfileThunk = createAsyncThunk("user/getProfile", async (_, { rejectWithValue }) => {
    const accessToken = localStorage.getItem("accessToken")

    if (!accessToken) {
        return rejectWithValue("No token found...")
    }

    try {
        const response = await axiosInstance.get("/user/get-profile", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })


        return response.data

    } catch (error) {
        console.log("catch block running of getUserProfile")
        console.log("the error response is ", error.response.data.message);
        const errorOutput = error.response.data.message

        toast.error(errorOutput)

        return rejectWithValue(errorOutput)
    }
})


export const getOtherUsersThunk = createAsyncThunk("/user/otherUsers", async (_, { rejectWithValue }) => {
    const accessToken = localStorage.getItem("accessToken")

    if (!accessToken) {
        return rejectWithValue("No token found...")
    }

    try {
        const response = await axiosInstance("/user/get-other-users", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })


        return response.data.otherUsers

    }

    catch (error) {
        console.log("catch block running of getOtherUser")
        console.log("the error response is ", error.response.data.message);
        const errorOutput = error.response.data.message
        return rejectWithValue(errorOutput)
    }
})

export const updateProfileThunk = createAsyncThunk("/users/updateProfile", async ({ fullName, userName, password, gender }, { rejectWithValue }) => {
    const accessToken = localStorage.getItem("accessToken")
    try {
        const response = await axiosInstance.put("/user/updateProfile", { fullName, userName, password, gender }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })

        toast.success("Profile Updated Successfully")

        return response.data.user
    } catch (error) {
        console.log(error.response.data.message);
        const errorOutput = error.response.data.message

        toast.error(errorOutput)

        return rejectWithValue(errorOutput)
    }
})
