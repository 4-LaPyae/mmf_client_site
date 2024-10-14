import { createApi } from "@reduxjs/toolkit/query/react"
import { fetchBaseQuery } from "@reduxjs/toolkit/query"
import { apiConfig } from "../../config/api/api-config";

// Create a base query using the API configuration
const baseQuery = fetchBaseQuery(apiConfig)

// Define and create a common API using Redux Toolkit's `createApi` function
// export const loginApi = createApi({
// 	reducerPath: "commonApi", // A unique reducer path for the common API
// 	baseQuery, // Use the base query configured with the API settings
// 	endpoints: (builder) => ({
// 		commonApi: builder.mutation({
// 			query: ({ endpoint, method, body }) => {
// 				return {
// 					url: endpoint, // The API endpoint to call
// 					method: method, // The HTTP method for the request
// 					body, // The request body, if provided
// 				}
// 			},
// 			invalidatesTags: ["getData"], // Define tags to invalidate when mutation occurs
// 		}),
// 	}),
// })
export const loginApi = createApi({
    reducerPath: "loginApi",
    baseQuery,
    endpoints: (builder) => ({
      postLogin: builder.mutation({
        query: (data) => ({
          url: "/admin/login",
          method: "POST",
          body: data,
        }),
      }),
    }),
  });
  export const { usePostLoginMutation } = loginApi;