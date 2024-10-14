import { createApi } from "@reduxjs/toolkit/query/react"
import { fetchBaseQuery } from "@reduxjs/toolkit/query"
import { apiConfig } from "../../config/api/api-config";

// Create a base query using the API configuration
const baseQuery = fetchBaseQuery(apiConfig)

export const townshipApi = createApi({
    reducerPath: "townshipApi",
    baseQuery,
    tagTypes: ["Townships"],
    endpoints: (builder) => ({
    getTownship: builder.query({
            query: () => ({
            url: "/admin/township",
            method: "GET",
            }),
            providesTags: ["Townships"],
          }),
    postTownship: builder.mutation({
            query: (data) => ({
              url: "/admin/township",
              method: "POST",
              body: data,
            }),
            invalidatesTags: ["Townships"],
          }),
    updateTownship:builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/township/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Townships"],
    }),
    deleteTownship: builder.mutation({
        query: (id) => ({
            url: `/admin/township/${id}`,
            method: "DELETE",
          }),
          invalidatesTags: ["Townships"],
    })
    }),
   
  });
  export const { usePostTownshipMutation,useGetTownshipQuery,useDeleteTownshipMutation,useUpdateTownshipMutation } = townshipApi;