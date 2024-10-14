import { createApi } from "@reduxjs/toolkit/query/react"
import { fetchBaseQuery } from "@reduxjs/toolkit/query"
import { apiConfig } from "../../config/api/api-config";

// Create a base query using the API configuration
const baseQuery = fetchBaseQuery(apiConfig)

export const adminApi = createApi({
    reducerPath: "adminApi",
    baseQuery,
    tagTypes: ["Admins"],
    endpoints: (builder) => ({
        getAdmins: builder.query({
            query: () => ({
            url: "/admin/all",
            method: "GET",
            }),
            providesTags: ["Admins"],

          }),
          getSupervisor: builder.query({
            query: () => ({
            url: "/admin/supervisor/list",
            method: "GET",
            }),
            providesTags: ["Admins"],

          }),
        createAdmin: builder.mutation({
            query: (data) => {
                return {
                    url: `/admin/adminuser/create`,
                    method: "POST",
                    body: data,
                };
            },
        invalidatesTags:["Admins"]
        }),
        updateProfileAdmin: builder.mutation({
            query: ({ id, data }) => {
                return {
                    url: `/admin/update/${id}`,
                    method: "POST",
                    body: data,
                };
            },
            invalidatesTags:["Admins"]

        }),
        updateAdmin: builder.mutation({
            query: ({ id, data }) => {
                return {
                    url: `/admin/roleuser/update/${id}`,
                    method: "POST",
                    body: data,
                };
            },
            invalidatesTags:["Admins"]

        }),
        updateAdminPassword: builder.mutation({
            query: (data) => {
                return {
                    url: 'admin/password/update',
                    method: "POST",
                    body: data,
                };
            },
        }),

        deleteAdmin: builder.mutation({
            query: (id) => {
                return {
                    url: `admin/delete/${id}`,
                    method: "POST",
                };
            },
            invalidatesTags:["Admins"]
        }),
    }),
  });
  export const { useGetAdminsQuery,useGetSupervisorQuery,useCreateAdminMutation,useUpdateAdminMutation,useUpdateProfileAdminMutation,useUpdateAdminPasswordMutation ,useDeleteAdminMutation} = adminApi;