import { createApi } from "@reduxjs/toolkit/query/react"
import { fetchBaseQuery } from "@reduxjs/toolkit/query"
import { apiConfig } from "../../config/api/api-config";

// Create a base query using the API configuration
const baseQuery = fetchBaseQuery(apiConfig)

export const typepersonApi = createApi({
    reducerPath: "typepersonApi",
    baseQuery,
    tagTypes: ["TypePersons"],
    endpoints: (builder) => ({
    getTypePerson: builder.query({
            query: () => ({
            url: "/admin/typeperson",
            method: "GET",
            }),
            providesTags: ["TypePersons"],
          }),
    postTypePerson: builder.mutation({
            query: (data) => ({
              url: "/admin/typeperson",
              method: "POST",
              body: data,
            }),
            invalidatesTags: ["TypePersons"],
          }),
    updateTypePerson:builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/typeperson/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["TypePersons"],
    }),
    deleteTypePerson: builder.mutation({
        query: (id) => ({
            url: `/admin/typeperson/${id}`,
            method: "DELETE",
          }),
          invalidatesTags: ["TypePersons"],
    })
    }),
   
  });
  export const { useGetTypePersonQuery,usePostTypePersonMutation,useUpdateTypePersonMutation,useDeleteTypePersonMutation} = typepersonApi;