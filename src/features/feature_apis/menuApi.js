import { createApi } from "@reduxjs/toolkit/query/react"
import { fetchBaseQuery } from "@reduxjs/toolkit/query"
import { apiConfig } from "../../config/api/api-config";

// Create a base query using the API configuration
const baseQuery = fetchBaseQuery(apiConfig)

export const menuApi = createApi({
    reducerPath: "menuApi",
    baseQuery,
    tagTypes: ["Menus"],
    endpoints: (builder) => ({
    getMenus: builder.query({
            query: () => ({
            url: "/admin/menu",
            method: "GET",
            }),
            providesTags: ["Menus"],
          }),
      postMenu: builder.mutation({
        query: (data) => ({
          url: "/admin/menu",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["Menus"],

      }),
    }),
  });
  export const { usePostMenuMutation,useGetMenusQuery } = menuApi;