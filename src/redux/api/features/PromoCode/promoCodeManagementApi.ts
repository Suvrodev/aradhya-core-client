import { baseApi } from "../../baseApi";

const promoCodeManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addPromocode: builder.mutation({
      query: (data) => {
        return {
          url: "/promo",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["promocode"],
    }),
    getAllPromocode: builder.query({
      query: () => {
        return {
          url: `/promo`,
          method: "GET",
        };
      },
      providesTags: ["promocode"],
    }),
    getSpecificPromoCode: builder.query({
      query: (id) => {
        return {
          url: `/promo/${id}`,
          method: "GET",
        };
      },
      providesTags: ["promocode"],
    }),
    getSpecificPromoCodeBasedOnPromoCode: builder.query({
      query: (promocode) => {
        return {
          url: `/promo/promocode/${promocode}`,
          method: "GET",
        };
      },
      providesTags: ["promocode"],
    }),

    deletePromoCode: builder.mutation({
      query: (id) => {
        return {
          url: `/promo/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["promocode"],
    }),
    updatePromoCode: builder.mutation({
      query: ({ id, updateData }) => {
        console.log("In RTK Query------------");
        console.log("id: ", id);
        console.log("Update Data: ", updateData);
        return {
          url: `/promo/${id}`,
          method: "PATCH",
          body: updateData,
        };
      },
      invalidatesTags: ["promocode"],
    }),
  }),
});

export const {
  useAddPromocodeMutation,
  useGetAllPromocodeQuery,
  useGetSpecificPromoCodeQuery,
  useGetSpecificPromoCodeBasedOnPromoCodeQuery,
  useDeletePromoCodeMutation,
  useUpdatePromoCodeMutation,
} = promoCodeManagementApi;
