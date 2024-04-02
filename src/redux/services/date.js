import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: `/api/` }),
  endpoints: (builder) => ({
    getFleets: builder.query({
      query: () => `fleet/`,
    }),
    getGallery: builder.query({
      query: () => `gallery`,
    }),
  }),
});

export const { 
  useGetFleetsQuery ,
  useGetGalleryQuery ,

} = pokemonApi;
