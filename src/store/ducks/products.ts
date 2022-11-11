import { createAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import ProductModel from 'src/models/products/product-model';
import getAllProducts from 'src/services/products/product-service'
import { ProductsState } from '../types';

export const listAllProducts = createAction('products/GET_ALL_PRODUCTS');

const initialState: ProductsState = {
    items: []
}

// First, create the thunk
export const fetchAllProducts = createAsyncThunk(
    'products/fetchAllProducts',
    async () => {
        const response = await getAllProducts();

        return response
    }
)

// Then, handle actions in your reducers:
const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        // standard reducer logic, with auto-generated action types per reducer
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
            state.items = action.payload;
        });
    },
})

export default productsSlice.reducer;