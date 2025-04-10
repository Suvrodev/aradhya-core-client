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
      invalidatesTags: ["blog"],
    }),
    getALlBlog: builder.query({
      query: (params) => {
        return {
          url: `/blog`,
          params: params,
          method: "GET",
        };
      },
      providesTags: ["blog"],
    }),
    getAllBlogByAdmin: builder.query({
      query: () => {
        return {
          url: `/blog/admin`,
          method: "GET",
        };
      },
      providesTags: ["blog"],
    }),
    getAllBlogByInstructor: builder.query({
      query: (email) => {
        return {
          url: `/blog/instructor/${email}`,
          method: "GET",
        };
      },
      providesTags: ["blog"],
    }),
    getSpecificBlog: builder.query({
      query: (id) => {
        return {
          url: `/blog/${id}`,
          method: "GET",
        };
      },
      providesTags: ["blog"],
    }),

    deleteBlog: builder.mutation({
      query: (id) => {
        return {
          url: `/blog/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["blog"],
    }),
    updateBlog: builder.mutation({
      query: ({ id, updateData }) => {
        return {
          url: `/blog/update/${id}`,
          method: "PATCH",
          body: updateData,
        };
      },
      invalidatesTags: ["blog"],
    }),
    updateBlogPin: builder.mutation({
      query: ({ id, updateData }) => {
        console.log("id: ", id);
        console.log("Update data: ", updateData);
        return {
          url: `/blog/update/pin/${id}`,
          method: "PUT",
          body: updateData,
        };
      },
      invalidatesTags: ["blog"],
    }),

    updateBlogisEnable: builder.mutation({
      query: ({ id, updateData }) => {
        console.log("id: ", id);
        console.log("Update data: ", updateData);
        return {
          url: `/blog/update/isEnable/${id}`,
          method: "PUT",
          body: updateData,
        };
      },
      invalidatesTags: ["blog"],
    }),
  }),
});

export const {
  useAddBlogMutation,
  useGetALlBlogQuery,
  useGetAllBlogByAdminQuery,
  useGetAllBlogByInstructorQuery,
  useGetSpecificBlogQuery,
  useDeleteBlogMutation,
  useUpdateBlogMutation,
  useUpdateBlogPinMutation,
  useUpdateBlogisEnableMutation,
} = blogManagementApi;
