import { baseApi } from "../../baseApi";

const curriculumManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addCurriculum: builder.mutation({
      query: (data) => {
        return {
          url: "/curriculum",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["curriculum"],
    }),
    getAllCurriculum: builder.query({
      query: () => {
        return {
          url: `/course`,
          method: "GET",
        };
      },
      providesTags: ["curriculum"],
    }),
    getSpecificCurriculum: builder.query({
      query: (id) => {
        return {
          url: `/curriculum/${id}`,
          method: "GET",
        };
      },
      providesTags: ["curriculum"],
    }),

    getCurriculumeUnderCourse: builder.query({
      query: (id) => {
        return {
          url: `/course/in-Service/${id}`,
          method: "GET",
        };
      },
      providesTags: ["course"],
    }),

    deleteCurriculum: builder.mutation({
      query: (id) => {
        return {
          url: `/curriculum/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["curriculum"],
    }),
    updateCurriculum: builder.mutation({
      query: ({ id, updateData }) => {
        return {
          url: `/curriculum/${id}`,
          method: "PATCH",
          body: updateData,
        };
      },
      invalidatesTags: ["curriculum"],
    }),
  }),
});

export const {
  useAddCurriculumMutation,
  useGetAllCurriculumQuery,
  useGetSpecificCurriculumQuery,
  useGetCurriculumeUnderCourseQuery,
  useDeleteCurriculumMutation,
  useUpdateCurriculumMutation,
} = curriculumManagementApi;
