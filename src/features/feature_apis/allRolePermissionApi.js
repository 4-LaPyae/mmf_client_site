import { createApi } from "@reduxjs/toolkit/query/react"
import { fetchBaseQuery } from "@reduxjs/toolkit/query"
import { apiConfig } from "../../config/api/api-config";

// Create a base query using the API configuration
const baseQuery = fetchBaseQuery(apiConfig)

export const allRolePermissionApi = createApi({
    reducerPath: "allRolePermissionApi",
    baseQuery,
    tagTypes: ["AllRolePermissions"],
    endpoints: (builder) => ({
    getAllRolePermissions: builder.query({
            query: () => ({
            url: "/admin/role/and/permission/list",
            method: "GET",
            }),
            providesTags: ["AllRolePermissions"],

          }),
    postRolePermission: builder.mutation({
            query: (data) => ({
              url: "/admin/store/role/permission",
              method: "POST",
              body: data,
            }),
            invalidatesTags:["AllRolePermissions"]
          }),
    updateRolePermission: builder.mutation({
            query: ({id,data}) => ({
              url: `/admin/role/permission/update/${id}`,
              method: "POST",
              body: data,
            }),
            invalidatesTags:["AllRolePermissions"]
          }),
    }),

    

  });
  export const {useGetAllRolePermissionsQuery,usePostRolePermissionMutation,useUpdateRolePermissionMutation} = allRolePermissionApi;