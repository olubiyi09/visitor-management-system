import { createSlice } from "@reduxjs/toolkit";

interface UsersState {
    currentUser: any;
    userRoles: Record<string, string>;
    isLoggedIn: any;
}

const initialState: UsersState = {
    currentUser: null,
    isLoggedIn: false,
    userRoles: {},
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        },
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        },
        // setUserRoles: (state, action) => {
        //     state.userRoles = action.payload;
        // },
        // updateUserRole: (state, action) => {
        //     const { userId, newRole } = action.payload;
        //     state.userRoles[userId] = newRole;
        // },
    },
});

export const { setCurrentUser, setIsLoggedIn } = usersSlice.actions;
// export const { setCurrentUser, setUserRoles, updateUserRole } = usersSlice.actions;

export default usersSlice.reducer;
