import { baseApi } from "../../baseApi";

const assignStudentManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addAssignStudent: builder.mutation({
      query: (data) => {
        return {
          url: "/assign",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["assignStudent"],
    }),
    getAllAssignStudent: builder.query({
      query: () => {
        return {
          url: `/assign`,
          method: "GET",
        };
      },
      providesTags: ["assignStudent"],
    }),
    getSpecificAssignStdudent: builder.query({
      query: (id) => {
        return {
          url: `/assign/${id}`,
          method: "GET",
        };
      },
      providesTags: ["assignStudent"],
    }),

    deleteAssignStudent: builder.mutation({
      query: (id) => {
        return {
          url: `/assign/${id}`,
          method: "assignStudent",
        };
      },
      invalidatesTags: ["blog"],
    }),
    updateAssignStudent: builder.mutation({
      query: ({ id, updateData }) => {
        return {
          url: `/assign/${id}`,
          method: "PATCH",
          body: updateData,
        };
      },
      invalidatesTags: ["assignStudent"],
    }),
  }),
});

export const {
  useAddAssignStudentMutation,
  useGetAllAssignStudentQuery,
  useGetSpecificAssignStdudentQuery,
  useDeleteAssignStudentMutation,
  useUpdateAssignStudentMutation,
} = assignStudentManagementApi;
