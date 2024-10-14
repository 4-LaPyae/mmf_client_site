import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { apiConfig } from "../../config/api/api-config";
import { exitTeamMemberApi } from "./exitTeamMemberApi";

// Create a base query using the API configuration
const baseQuery = fetchBaseQuery(apiConfig);

export const teamApi = createApi({
    reducerPath: "teamApi",
    baseQuery,
    tagTypes: ["Teams", "ExitTeamMembers"],
    endpoints: (builder) => ({
        getTeam: builder.query({
            query: () => ({
                url: "/admin/team",
                method: "GET",
            }),
            providesTags: ["Teams"],
        }),
        createTeam: builder.mutation({
            query: (data) => ({
                url: "/admin/team",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Teams"],
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                await queryFulfilled;
                dispatch(
                    exitTeamMemberApi.util.invalidateTags(["ExitTeamMembers"]),
                );
            },
        }),
        updateTeam: builder.mutation({
            query: ({ id, data }) => ({
                url: `/admin/team/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Teams"],
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                await queryFulfilled;
                dispatch(
                    exitTeamMemberApi.util.invalidateTags(["ExitTeamMembers"]),
                );
            },
        }),
        deleteTeam: builder.mutation({
            query: (id) => ({
                url: `/admin/team/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Teams"],
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                await queryFulfilled;
                dispatch(
                    exitTeamMemberApi.util.invalidateTags(["ExitTeamMembers"]),
                );
            },
        }),
    }),
});
export const {
    useGetTeamQuery,
    useCreateTeamMutation,
    useUpdateTeamMutation,
    useDeleteTeamMutation,
} = teamApi;
