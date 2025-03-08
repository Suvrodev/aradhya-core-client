import { baseApi } from "../../baseApi";

const studentManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllStudent: builder.query({
      query: (params) => {
        const queryParams = new URLSearchParams(params).toString();
        return {
          url: `/auth/allusers?${queryParams}`,
          method: "GET",
        };
      },
      providesTags: ["student"],
    }),
    getSpecificStudent: builder.query({
      query: (id) => {
        return {
          url: `/auth/allusers/${id}`,
          method: "GET",
        };
      },
      providesTags: ["student"],
    }),

    deleteStudent: builder.mutation({
      query: (id) => {
        return {
          url: `/auth/allusers/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["student"],
    }),

    updateStudent: builder.mutation({
      query: ({ id, updateData }) => {
        return {
          url: `/auth/allusers/${id}`,
          method: "PATCH",
          body: updateData,
        };
      },
      invalidatesTags: ["student"],
    }),

    updatePassword: builder.mutation({
      query: ({ id, updateData }) => {
        return {
          url: `/auth/updatepassword/${id}`,
          method: "PATCH",
          body: updateData,
        };
      },
      invalidatesTags: ["student"],
    }),
  }),
});

export const {
  useGetAllStudentQuery,
  useGetSpecificStudentQuery,
  useDeleteStudentMutation,
  useUpdateStudentMutation,
  useUpdatePasswordMutation,
} = studentManagementApi;
