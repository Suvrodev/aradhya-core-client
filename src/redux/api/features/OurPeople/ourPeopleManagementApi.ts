import { baseApi } from "../../baseApi";

const ourPeopleManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addOurPeople: builder.mutation({
      query: (data) => {
        return {
          url: "/people",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["ourPeople"],
    }),
    getAllOurPeople: builder.query({
      query: (params) => {
        return {
          url: `/people`,
          params: params,
          method: "GET",
        };
      },
      providesTags: ["ourPeople"],
    }),

    getSpecificOurPeople: builder.query({
      query: (id) => {
        return {
          url: `/people/${id}`,
          method: "GET",
        };
      },
      providesTags: ["ourPeople"],
    }),

    deleteOurPeople: builder.mutation({
      query: (id) => {
        return {
          url: `/people/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["ourPeople"],
    }),
    updateOurPeople: builder.mutation({
      query: ({ id, updateData }) => {
        return {
          url: `/people/${id}`,
          method: "PATCH",
          body: updateData,
        };
      },
      invalidatesTags: ["ourPeople"],
    }),
  }),
});

export const {
  useAddOurPeopleMutation,
  useGetAllOurPeopleQuery,
  useGetSpecificOurPeopleQuery,
  useDeleteOurPeopleMutation,
  useUpdateOurPeopleMutation,
} = ourPeopleManagementApi;
