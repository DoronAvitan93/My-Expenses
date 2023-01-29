import { createSlice } from "@reduxjs/toolkit";



//redux
const authSlice = createSlice({
    name: 'auth',
    initialState:
    {
        isAuthenticated: false,
        userIdAfterLogin: null,
        //UI conditional content:
        isClickRegister: false,
        isClickLogin: false
    },

    reducers: {

        setIsisAuthenticated(state, action) {
            state.isAuthenticated = action.payload
        },

        setUserIdAfterLogin(state, action) {
            state.userIdAfterLogin = action.payload;
            localStorage.setItem('userID', action.payload)
        },
    }
}
);


export const authActions = authSlice.actions;

export default authSlice.reducer;