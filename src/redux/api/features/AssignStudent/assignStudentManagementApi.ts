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
    // getAllAssignStudent: builder.query({
    //   query: () => {
    //     return {
    //       url: `/assign`,
    //       method: "GET",
    //     };
    //   },
    //   providesTags: ["assignStudent"],
    // }),
    getAllAssignStudent: builder.query({
      query: ({ search, paymentGateWay, status, sort }) => {
        let queryString = "";

        // Adding query parameters dynamically
        if (search) queryString += `search=${search}&`;
        if (paymentGateWay) queryString += `paymentGateWay=${paymentGateWay}&`;
        if (status) queryString += `status=${status}&`;
        if (sort) queryString += `sort=${sort}&`;

        return {
          url: `/assign?${queryString}`,
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

    getOwnCourseOfAssignStudent: builder.query({
      query: (email) => {
        return {
          url: `/assign/own-course/${email}`,
          method: "GET",
        };
      },
      providesTags: ["assignStudent"],
    }),

    getInstructorsAssignStudent: builder.query({
      query: ({ batchId, courseId }: { batchId: string; courseId: string }) => {
        return {
          url: `/assign/instructors-assign-student/${batchId}/${courseId}`,
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
  useGetOwnCourseOfAssignStudentQuery,
  useGetInstructorsAssignStudentQuery,
  useDeleteAssignStudentMutation,
  useUpdateAssignStudentMutation,
} = assignStudentManagementApi;
