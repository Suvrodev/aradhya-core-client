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

    ///Not Used
    getSpecificBatch: builder.query({
      query: (id) => {
        return {
          url: `/batch/${id}`,
          method: "GET",
        };
      },
      providesTags: ["batch"],
    }),
    //Just use for update (1 batch will come)
    getJustOneBatchForUpdate: builder.query({
      query: (id) => {
        return {
          url: `/batch/just-one/${id}`,
          method: "GET",
        };
      },
      providesTags: ["batch"],
    }),

    //Get just one upcomming batch (Course detaul)
    getUpComingBatchUnderCourse: builder.query({
      query: (id) => {
        return {
          url: `/batch/undercourse/upcoming/${id}`,
          method: "GET",
        };
      },
      providesTags: ["batch"],
    }),

    //Show all batch from admin panner persperctive of course
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
  useGetJustOneBatchForUpdateQuery,
  useGetUpComingBatchUnderCourseQuery,
  useGetSpecificBatchUnderCourseQuery,
  useDeleteBatchMutation,
  useUpdateBatchMutation,
} = batchManagementApi;
