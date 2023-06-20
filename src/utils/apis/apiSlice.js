import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const base_url = `http:localhost:3005`;

export const apiSlice = createApi({
    reducerPath: 'api', // optional
    baseQuery: fetchBaseQuery({ baseUrl: base_url }),
    tagTypes: ["Post"],
    endpoints: builder => ({})
})

export const getUsers = async () => {
    const response = await axios.get(`${base_url}/users`);
    return response.data;
};