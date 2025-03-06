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
    getAllCourse: builder.query({
      query: () => {
        return {
          url: `/course`,
          method: "GET",
        };
      },
      providesTags: ["course"],
    }),
    getSpecificCourse: builder.query({
      query: (id) => {
        return {
          url: `/course/${id}`,
          method: "GET",
        };
      },
      providesTags: ["course"],
    }),

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
  useGetSpecificCourseQuery,
  useGetCourseUnderServiceQuery,
  useDeleteCourseMutation,
  useUpdateCourseMutation,
} = courseManagementApi;
