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
      query: (email) => {
        return {
          url: `/auth/allusers/${email}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["student"],
    }),

    updateStudent: builder.mutation({
      query: ({ email, updateData }) => {
        return {
          url: `/auth/allusers/${email}`,
          method: "PATCH",
          body: updateData,
        };
      },
      invalidatesTags: ["student"],
    }),

    updatePassword: builder.mutation({
      query: ({ email, updateData }) => {
        return {
          url: `/auth/updatepassword/${email}`,
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
