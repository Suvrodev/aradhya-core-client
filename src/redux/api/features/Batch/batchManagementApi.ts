import { baseApi } from "../../baseApi";

const batchManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addBatch: builder.mutation({
      query: (data) => {
        return {
          url: "/batch",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["batch"],
    }),
    getAllBatch: builder.query({
      query: () => {
        return {
          url: `/batch`,
          method: "GET",
        };
      },
      providesTags: ["batch"],
    }),
    getSpecificBatch: builder.query({
      query: (id) => {
        return {
          url: `/batch/${id}`,
          method: "GET",
        };
      },
      providesTags: ["batch"],
    }),
    getUpComingBatchUnderCourse: builder.query({
      query: (id) => {
        return {
          url: `/batch/undercourse/upcoming/${id}`,
          method: "GET",
        };
      },
      providesTags: ["batch"],
    }),
    getSpecificBatchUnderCourse: builder.query({
      query: (id) => {
        return {
          url: `/batch/undercourse/${id}`,
          method: "GET",
        };
      },
      providesTags: ["batch"],
    }),

    deleteBatch: builder.mutation({
      query: (id) => {
        return {
          url: `/batch/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["batch"],
    }),
    updateBatch: builder.mutation({
      query: ({ id, updateData }) => {
        return {
          url: `/batch/${id}`,
          method: "PATCH",
          body: updateData,
        };
      },
      invalidatesTags: ["batch"],
    }),
  }),
});

export const {
  useAddBatchMutation,
  useGetAllBatchQuery,
  useGetSpecificBatchQuery,
  useGetUpComingBatchUnderCourseQuery,
  useGetSpecificBatchUnderCourseQuery,
  useDeleteBatchMutation,
  useUpdateBatchMutation,
} = batchManagementApi;
