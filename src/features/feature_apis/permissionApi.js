import { createApi } from "@reduxjs/toolkit/query/react"
import { fetchBaseQuery } from "@reduxjs/toolkit/query"
import { apiConfig } from "../../config/api/api-config";

// Create a base query using the API configuration
const baseQuery = fetchBaseQuery(apiConfig)

export const permissionApi = createApi({
    reducerPath: "permissionApi",
    baseQuery,
    tagTypes: ["Permissions"],
    endpoints: (builder) => ({
    getPermission: builder.query({
            query: () => ({
            url: "/admin/permission/list",
            method: "GET",
            }),
            providesTags: ["Permissions"],
          }),
      postPermission: builder.mutation({
        query: (data) => ({
          url: "/admin/role/permission",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["Permissions"],
      }),
      updatePermission:builder.mutation({
        query: ({ id, data }) => ({
          url: `/admin/role/permission/${id}`,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: ["Permissions"],
      }),
      deletePermission: builder.mutation({
        query: (id) => ({
            url: `/admin/role/permission/${id}`,
            method: "DELETE",
          }),
          invalidatesTags: ["Permissions"],
    })
    }),
  });
  export const { useGetPermissionQuery,usePostPermissionMutation ,useUpdatePermissionMutation,useDeletePermissionMutation} = permissionApi;