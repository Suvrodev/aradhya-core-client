import { baseApi } from "../../baseApi";

const courseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addCourse: builder.mutation({
      query: (data) => {
        return {
          url: "/course",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["course"],
    }),

    ///Course Exists yes thakle ei course gula show korbe (user der janno)
    getAllCourse: builder.query({
      query: () => {
        return {
          url: `/course`,
          method: "GET",
        };
      },
      providesTags: ["course"],
    }),
    ///Course Exists matter korbe na (admin der janno)
    getAllCourseByAdmin: builder.query({
      query: () => {
        return {
          url: `/course/admin`,
          method: "GET",
        };
      },
      providesTags: ["course"],
    }),

    ///Single ekta course
    getSpecificCourse: builder.query({
      query: (id) => {
        return {
          url: `/course/${id}`,
          method: "GET",
        };
      },
      providesTags: ["course"],
    }),

    //Not use less for All Courses *Directly all course link e asle state theke to data dekhate parbe ne
    getCourseUnderService: builder.query({
      query: (id) => {
        return {
          url: `/course/in-Service/${id}`,
          method: "GET",
        };
      },
      providesTags: ["course"],
    }),

    deleteCourse: builder.mutation({
      query: (id) => {
        return {
          url: `/course/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["course"],
    }),
    updateCourse: builder.mutation({
      query: ({ id, updateData }) => {
        return {
          url: `/course/${id}`,
          method: "PATCH",
          body: updateData,
        };
      },
      invalidatesTags: ["course"],
    }),
  }),
});

export const {
  useAddCourseMutation,
  useGetAllCourseQuery,
  useGetAllCourseByAdminQuery,
  useGetSpecificCourseQuery,
  useGetCourseUnderServiceQuery,
  useDeleteCourseMutation,
  useUpdateCourseMutation,
} = courseManagementApi;
