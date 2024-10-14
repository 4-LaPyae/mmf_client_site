import { createApi } from "@reduxjs/toolkit/query/react"
import { fetchBaseQuery } from "@reduxjs/toolkit/query"
import { apiConfig } from "../../config/api/api-config";

// Create a base query using the API configuration
const baseQuery = fetchBaseQuery(apiConfig)

export const roleAndPermissionApi = createApi({
    reducerPath: "roleAndPermissionApi",
    baseQuery,
    tagTypes: ["RoleAndPermissions","AllRolePermissions"],
    endpoints: (builder) => ({
    getGorupPermissions: builder.query({
            query: () => ({
            url: "/admin/permission/group/list",
            method: "GET",
            }),
            providesTags: ["RoleAndPermissions"],
          }),
    }),

    

  });
  export const { useGetGorupPermissionsQuery} = roleAndPermissionApi;