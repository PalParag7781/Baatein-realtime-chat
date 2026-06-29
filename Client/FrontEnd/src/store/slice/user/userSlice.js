import { createSlice } from "@reduxjs/toolkit"
import { getOtherUsersThunk, getUserProfileThunk, loginUserThunk, logoutUserThunk, registerUserThunk, updateProfileThunk } from "./user.thunk"

const initialState = {
    isAuthenticated: false,
    userProfile: null,
    buttonLoading: false,
    screenLoading: true,
    allUsers: [],
    selectedUser: null
}


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload
        }
    },
    extraReducers: (builder) => {
        //login
        builder

            .addCase(loginUserThunk.pending, (state, action) => {
                console.log("pending login")
                state.buttonLoading = true
            })


            .addCase(loginUserThunk.fulfilled, (state, action) => {
                console.log("fulfilled login")


                state.userProfile = action.payload.user

                state.buttonLoading = false

                state.isAuthenticated = true

                state.screenLoading = false

            })


            .addCase(loginUserThunk.rejected, (state, action) => {
                console.log("rejected login")


                state.buttonLoading = false

                state.isAuthenticated = false
            })


            // Register

            .addCase(registerUserThunk.pending, (state) => {
                console.log("pending register")
                state.buttonLoading = true
            })

            .addCase(registerUserThunk.fulfilled, (state, action) => {
                console.log("fulfilled register")






                state.buttonLoading = false

                state.userProfile = action.payload.user
                

            })

            .addCase(registerUserThunk.rejected, (state, action) => {
                console.log("rejected register")

                state.buttonLoading = false
            })

            //Logout

            .addCase(logoutUserThunk.pending, (state) => {
                console.log("pending register")
                state.buttonLoading = true
            })

            .addCase(logoutUserThunk.fulfilled, (state, action) => {
                console.log("fulfilled register")

                state.buttonLoading = false

                state.userProfile = []

                state.isAuthenticated = false

                state.allUsers = []

                state.selectedUser = null

            })

            .addCase(logoutUserThunk.rejected, (state, action) => {
                console.log("rejected register")

                state.buttonLoading = false

                state.isAuthenticated = false;
                state.userProfile = null;
            })

            //getUserProfile

            .addCase(getUserProfileThunk.pending, (state) => {
                console.log("pending gettingUserProfile")

                state.screenLoading = true

            })

            .addCase(getUserProfileThunk.fulfilled, (state, action) => {
                console.log("fulfilled gettingUserProfile")


                state.screenLoading = false

                state.userProfile = action.payload.user

                state.isAuthenticated = true
            })

            .addCase(getUserProfileThunk.rejected, (state, action) => {
                console.log("rejected gettingUserProfile")


                state.screenLoading = false
                state.isAuthenticated = false;
                state.userProfile = null;
                state.allUsers = [];
                state.selectedUser = null;



            })

            //get other users
            .addCase(getOtherUsersThunk.pending, (state) => {
                console.log("pending gettingOtherUser")

                state.screenLoading = true
            })

            .addCase(getOtherUsersThunk.fulfilled, (state, action) => {
                console.log("fulfilled gettingOtherUser")


                state.screenLoading = false

                state.allUsers = action.payload

                console.log("Other users are ", action.payload)

            })

            .addCase(getOtherUsersThunk.rejected, (state, action) => {
                console.log("rejected gettingOtherUser")


                state.screenLoading = false




            })

            //update Profile 

            .addCase(updateProfileThunk.pending, (state) => {
                console.log("pending updating the profile")

                state.buttonLoading = true
            })

            .addCase(updateProfileThunk.fulfilled, (state, action) => {
                console.log("fulfilled updating the profile ")


                state.screenLoading = false

                state.userProfile = { ...state.userProfile, ...action.payload }



            })

            .addCase(updateProfileThunk.rejected, (state, action) => {
                console.log("rejected gettingOtherUser")


                state.screenLoading = false
            })

    },





}
)



export default userSlice.reducer
export const { setSelectedUser } = userSlice.actions

