import { baseApi } from "../../baseApi";

const blogManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addBlog: builder.mutation({
      query: (data) => {
        return {
          url: "/blog",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["service"],
    }),
    getALlBlog: builder.query({
      query: () => {
        return {
          url: `/blog`,
          method: "GET",
        };
      },
      providesTags: ["service"],
    }),
    getSpecificBlog: builder.query({
      query: () => {
        return {
          url: `/blog`,
          method: "GET",
        };
      },
      providesTags: ["service"],
    }),

    deleteBlog: builder.mutation({
      query: (id) => {
        return {
          url: `/blog/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["service"],
    }),
    updateBlog: builder.mutation({
      query: ({ id, updateData }) => {
        return {
          url: `/blog/${id}`,
          method: "PATCH",
          body: updateData,
        };
      },
      invalidatesTags: ["service"],
    }),
  }),
});

export const {
  useAddBlogMutation,
  useGetALlBlogQuery,
  useGetSpecificBlogQuery,
  useDeleteBlogMutation,
  useUpdateBlogMutation,
} = blogManagementApi;
