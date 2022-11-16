import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Manufacturer from "src/models/products/manufacturer";
import { ManufacturerState } from "../types";

const axiosApi = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 1000
});

const initialState: ManufacturerState = {
    loading: 'idle',
    items: []
}

export const fetchAllManufacturers = createAsyncThunk(
    'products/fetchAllManufacturers',
    async () => {
        const response = await axiosApi.get<Manufacturer[]>('/manufacturers');

        return response.data
    }
)

const manufacturerSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllManufacturers.fulfilled, (state, action) => {
            state.items = action.payload;
        });
    },
})

export default manufacturerSlice.reducer;