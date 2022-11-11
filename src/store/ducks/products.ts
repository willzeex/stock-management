import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import ProductModel from 'src/models/products/product-model';
import getAllProducts from 'src/services/products/product-service'
import { ProductsState } from '../types';

export const listAllProducts = createAction('products/GET_ALL_PRODUCTS');

const initialState: ProductsState = {
    items: []
}

export const fetchAllProducts = createAsyncThunk(
    'products/fetchAllProducts',
    async () => {
        const response = await getAllProducts();

        return response
    }
)

export const fetchAddProduct = createAsyncThunk(
    'products/fetchAddProduct',
    async (product: ProductModel) => {
        const response = await getAllProducts();

        return response
    }
)

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
            state.items = action.payload;
        });
    },
})

export default productsSlice.reducer;