import { createApi } from "@reduxjs/toolkit/query/react"
import { fetchBaseQuery } from "@reduxjs/toolkit/query"
import { apiConfig } from "../../config/api/api-config";

// Create a base query using the API configuration
const baseQuery = fetchBaseQuery(apiConfig)

export const roleApi = createApi({
    reducerPath: "roleApi",
    baseQuery,
    tagTypes: ["Roles"],
    endpoints: (builder) => ({
    getRoles: builder.query({
            query: () => ({
            url: "/admin/role",
            method: "GET",
            }),
            providesTags: ["Roles"],
          }),
    postRole: builder.mutation({
            query: (data) => ({
              url: "/admin/role",
              method: "POST",
              body: data,
            }),
            invalidatesTags: ["Roles"],
          }),
    updateRole:builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/role/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Roles"],
    }),
    deleteRole: builder.mutation({
        query: (id) => ({
            url: `/admin/role/${id}`,
            method: "DELETE",
          }),
          invalidatesTags: ["Roles"],
    })
    }),
   
  });
  export const { usePostRoleMutation,useGetRolesQuery,useDeleteRoleMutation,useUpdateRoleMutation } = roleApi;
  