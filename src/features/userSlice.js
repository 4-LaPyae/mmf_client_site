import { createSlice } from '@reduxjs/toolkit'
import { loginApi } from './feature_apis/loginApi'

const initialState = {
	user: null, // Initial user state
	token: null, // Initial token state
	menus: [], // Initial menu routes  state
	role:null,
	isAuthenticated:false,
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload.user
			state.token = action.payload.auth_token
			state.menus = action.payload.menus
			state.role = action.payload.user.role
			state.isAuthenticated = true
		},
		clearUser: (state) => {
			state.user = null
			state.token = null
			state.menus = []
			state.role = null
			state.isAuthenticated = false
		},
		clearExceptMenus: (state) => {
			state.user = null
			state.token = null
		},
		setUserDetail:(state,action) => {
			state.user = action.payload;
		}
	},
	// extraReducers: (builder) => {
	// 	builder.addMatcher(
	// 	  loginApi.endpoints.postLogin.matchFulfilled,
	// 	  (state, { payload }) => {
	// 		state.user = payload.data.user;
	// 		state.token = payload.data.user.auth_token;
	// 		state.menus = payload.data.menus;
	// 	  }
	// 	);
	// }
})

export const { setUser, clearUser, clearExceptMenus,setUserDetail } = userSlice.actions

export const selectUser = (state) => state.user.user // Selector to access the user data
export const selectToken = (state) => state.user.token // Selector to access the token
export const selectMenu = (state) => state.user.menus // Selector to access the menu routes

export default userSlice.reducer
