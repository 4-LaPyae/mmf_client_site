import { configureStore } from "@reduxjs/toolkit"
import { loadState, saveState } from "./session"
import { setupListeners } from "@reduxjs/toolkit/query"
// import { commonApi } from "./config/api"
import { errorHandler } from "./config/api/error-handler"
import collapsedReducer from "./features/collapsedSlice"
import localeReducer from "./features/localeSlice"
import themeReducer from "./features/themeSlice"
import responsiveReducer from "./features/responsiveSlice"
import userReducer from "./features/userSlice"
import updateReducer from "./features/updateSlice"
import rolesReducer from "./features/rolesSlice"
import { loginApi } from "./features/feature_apis/loginApi"
import { menuApi } from "./features/feature_apis/menuApi"
import { permissionApi } from "./features/feature_apis/permissionApi"
import { adminApi } from "./features/feature_apis/adminApi"
import { roleApi } from "./features/feature_apis/roleApi"
import { HelperSlice } from "./features/helperSlice";
import { roleAndPermissionApi } from "./features/feature_apis/roleAndPermissionApi"
import { allRolePermissionApi } from "./features/feature_apis/allRolePermissionApi"
import { userApi } from "./features/feature_apis/userApi"
import { townshipApi } from "./features/feature_apis/townshipApi"
import { typepersonApi } from "./features/feature_apis/typepersonApi"
import { teamApi } from "./features/feature_apis/teamApi"
import { exitTeamMemberApi } from "./features/feature_apis/exitTeamMemberApi"
import { pcodeUserApi } from "./features/feature_apis/pcodeUserApi"
import { reportApi } from "./features/feature_apis/reportApi"
// Load the persisted state from local storage
const persistedState = loadState()

// Create the Redux store
const store = configureStore({
	reducer: {
		collapsed: collapsedReducer, // Reducer for managing the "collapsed" state
		locale: localeReducer, // Reducer for managing the "locale" state
		darkMode: themeReducer, // Reducer for managing the "darkMode" theme
		breakpoint: responsiveReducer, // Reducer for managing the "breakpoint" state
		user: userReducer, // Add the user slice to the store
		update: updateReducer, // Add the desired updated data to the store
		roles: rolesReducer, // Add selected checkbox role data to the store
		// [commonApi.reducerPath]: commonApi.reducer, // Reducer for common API state
		HelperSlice,
		[loginApi.reducerPath]: loginApi.reducer,
		[menuApi.reducerPath]: menuApi.reducer,
		[permissionApi.reducerPath]: permissionApi.reducer,
		[adminApi.reducerPath]: adminApi.reducer,
		[roleApi.reducerPath]: roleApi.reducer,
		[roleAndPermissionApi.reducerPath]: roleAndPermissionApi.reducer,
		[allRolePermissionApi.reducerPath]: allRolePermissionApi.reducer,
		[userApi.reducerPath]:userApi.reducer,
		[townshipApi.reducerPath]:townshipApi.reducer,
		[typepersonApi.reducerPath]:typepersonApi.reducer,
		[teamApi.reducerPath]:teamApi.reducer,
		[exitTeamMemberApi.reducerPath]: exitTeamMemberApi.reducer,
		[pcodeUserApi.reducerPath]: pcodeUserApi.reducer,
		[reportApi.reducerPath]: reportApi.reducer,


},
	preloadedState: persistedState, // Initialize the store with persisted state
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(errorHandler) // Add custom error handling
			//.concat(commonApi.middleware), // Add common API middleware
			.concat(loginApi.middleware) // Add custom error handling
			.concat(menuApi.middleware) // Add custom error handling
			.concat(permissionApi.middleware) // Add custom error handling
			.concat(adminApi.middleware) // Add custom error handling
			.concat(roleApi.middleware) // Add custom error handling
			.concat(roleAndPermissionApi.middleware) // Add custom error handling
			.concat(allRolePermissionApi.middleware) // Add custom error handling
			.concat(userApi.middleware)
			.concat(townshipApi.middleware)
			.concat(typepersonApi.middleware)
			.concat(teamApi.middleware)
			.concat(exitTeamMemberApi.middleware)
			.concat(pcodeUserApi.middleware)
			.concat(reportApi.middleware),

})

// Subscribe to store changes to save state to local storage
store.subscribe(() => {
	saveState(store.getState())
})

// Set up listeners for API actions
setupListeners(store.dispatch)

export default store
