import { baseApi } from "../../baseApi";

const serviceManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addService: builder.mutation({
      query: (data) => {
        return {
          url: "/service",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["service"],
    }),
    getAllService: builder.query({
      query: () => {
        return {
          url: `/service`,
          method: "GET",
        };
      },
      providesTags: ["service"],
    }),

    deleteService: builder.mutation({
      query: (id) => {
        return {
          url: `/service/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["service"],
    }),
    updateService: builder.mutation({
      query: ({ id, updateData }) => {
        return {
          url: `/service/${id}`,
          method: "PATCH",
          body: updateData,
        };
      },
      invalidatesTags: ["service"],
    }),
  }),
});

export const {
  useAddServiceMutation,
  useGetAllServiceQuery,
  useDeleteServiceMutation,
  useUpdateServiceMutation,
} = serviceManagementApi;
