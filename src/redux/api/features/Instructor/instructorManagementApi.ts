import { baseApi } from "../../baseApi";

const studentManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllInstructor: builder.query({
      query: (params) => {
        const queryParams = new URLSearchParams(params).toString();
        return {
          url: `/i-auth/all-instructor?${queryParams}`,
          method: "GET",
        };
      },
      providesTags: ["instructor"],
    }),
    getSpecificInstructor: builder.query({
      query: (id) => {
        return {
          url: `/i-auth/all-instructor/${id}`,
          method: "GET",
        };
      },
      providesTags: ["instructor"],
    }),

    deleteInstructor: builder.mutation({
      query: (id) => {
        return {
          url: `/i-auth/all-instructor/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["instructor"],
    }),

    updateInstructor: builder.mutation({
      query: ({ id, updateData }) => {
        return {
          url: `/i-auth/all-instructor/${id}`,
          method: "PATCH",
          body: updateData,
        };
      },
      invalidatesTags: ["instructor"],
    }),

    updateInstructorePassword: builder.mutation({
      query: ({ id, updateData }) => {
        return {
          url: `/i-auth/updatepassword/${id}`,
          method: "PATCH",
          body: updateData,
        };
      },
      invalidatesTags: ["instructor"],
    }),
  }),
});

export const {
  useGetAllInstructorQuery,
  useGetSpecificInstructorQuery,
  useDeleteInstructorMutation,
  useUpdateInstructorMutation,
  useUpdateInstructorePasswordMutation,
} = studentManagementApi;
