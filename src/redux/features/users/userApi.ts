import { api } from "@/redux/api/apiSlice";

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signupUser: builder.mutation({
      query: (data) => ({
        url: `/auth/signup`,
        method: "POST",
        body: data,
      }),
    }),
    loginUser: builder.mutation({
      query: (data) => ({
        url: `/auth/login`,
        method: "POST",
        body: data,
      }),
    }),
    getMyProfile: builder.query({
      query: () => ({
        url: `/users/my-profile`,
        method: "GET",
      }),
    }),
    updateMyProfile: builder.mutation({
      query: ({ token, data }) => ({
        url: `/users/my-profile`,
        method: "PATCH",
        headers: token,
        body: data,
      }),
    }),
    updateBookmark: builder.mutation({
      query: ({ token, id, data }) => ({
        url: `/users/bookmark/${id}`,
        method: "PATCH",
        headers: token,
        body: data,
      }),
    }),
  }),
});

export const {
  useSignupUserMutation,
  useLoginUserMutation,
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
  useUpdateBookmarkMutation,
} = userApi;
