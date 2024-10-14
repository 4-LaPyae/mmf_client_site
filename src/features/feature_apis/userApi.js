import { createApi } from "@reduxjs/toolkit/query/react"
import { fetchBaseQuery } from "@reduxjs/toolkit/query"
import { apiConfig } from "../../config/api/api-config";

// Create a base query using the API configuration
const baseQuery = fetchBaseQuery(apiConfig)

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery,
    tagTypes: ["Users"],
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => ({
            url: "/admin/formal/user",
            method: "GET",
            }),
            providesTags: ["Users"],

          }),
        creteUser: builder.mutation({
            query: (data) => {
                return {
                    url: '/admin/formal/user',
                    method: "POST",
                    body: data,
                };
            },
        invalidatesTags:["Users"]
        }),
        updateUser: builder.mutation({
            query: ({ id, data }) => {
                return {
                    url: `/admin/formal/user/${id}`,
                    method: "PUT",
                    body: data,
                };
            },
            invalidatesTags:["Users"]

        }),

        inActiveUser: builder.mutation({
            query: (id) => {
                return {
                    url: `admin/formal/user/inactive/${id}`,
                    method: "POST",
                };
            },
            invalidatesTags:["Users"]

        }),
        activeUser: builder.mutation({
            query: (id) => {
                return {
                    url: `admin/formal/user/active/${id}`,
                    method: "POST",
                };
            },
            invalidatesTags:["Users"]

        }),
        deleteUser: builder.mutation({
            query: (id) => {
                return {
                    url: `/admin/formal/user/${id}`,
                    method: "DELETE",
                };
            },
            invalidatesTags:["Users"]
        }),
    }),
  });
  export const {useGetUsersQuery,useCreteUserMutation,useUpdateUserMutation,useDeleteUserMutation,useInActiveUserMutation,useActiveUserMutation} = userApi;