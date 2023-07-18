import { api } from "@/redux/api/apiSlice";

export type IFilterParam = { query: string | number };

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: ({ query, value }) =>
        query && value ? `/books?${query}=${value}` : "/books",
      providesTags: ["bookmark"],
    }),
    getFilteredBooks: builder.query({
      query: ({ query }) => {
        // Create an array of query-value pairs and filter out any entries with undefined values
        const queryPairs = Object.entries(query).filter(
          ([, value]) => value !== undefined
        );
        // Create the query string based on the query-value pairs
        const queryString = queryPairs
          .map(([key, value]) => (value ? `${key}=${value}` : ""))
          .join("&");
        // Combine the query string with the base URL
        const url = queryString === "&" ? "/books" : `/books?${queryString}`;
        return url;
      },
      providesTags: ["bookmark"],
    }),
    singleBook: builder.query({
      query: (id) => `/books/${id}`,
      providesTags: ["bookmark"],
    }),
    addBook: builder.mutation({
      query: (data) => ({
        url: `/books`,
        method: "POST",
        body: data,
      }),
    }),
    addReview: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/review/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["reviews"],
    }),
    updateBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetFilteredBooksQuery,
  useSingleBookQuery,
  useAddBookMutation,
  useAddReviewMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = bookApi;
