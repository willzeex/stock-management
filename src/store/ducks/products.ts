import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import ProductModel from 'src/models/products/product-model';
import { ProductsState } from '../types';

const productApi = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 1000
});

const initialState: ProductsState = {
    loading: 'idle',
    items: []
};

export const fetchAllProducts = createAsyncThunk(
    'products/fetchAllProducts',
    async () => {
        const response = await productApi.get<ProductModel[]>('/products');
        return response.data;
    }
);

export const fetchAddProduct = createAsyncThunk(
    'products/fetchAddProduct',
    async (product: ProductModel) => {
        const response = await productApi.post<ProductModel>('/products/', product);
        return response.data;
    }
);

export const fetchUpdateProduct = createAsyncThunk(
    'products/fetchUpdateProduct',
    async (product: ProductModel) => {
        const response = await productApi.put<ProductModel>(`/products/${product.id}`, product);
        return response.data;
    }
);
export const fetchDeleteProduct = createAsyncThunk(
    'products/fetchDeleteProduct',
    async (productId: string) => {
        await productApi.delete(`/products/${productId}`);
        return productId;
    }
);

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
            state.items = action.payload;
        });
        builder.addCase(fetchAddProduct.fulfilled, (state, action) => {
            state?.items?.push(action.payload);
        });
        builder.addCase(fetchUpdateProduct.fulfilled, (state, action) => {
            const newState = state?.items?.map((item) => {
                if (item.id !== action.payload.id) {
                    return item
                }

                return {
                    ...item,
                    ...action.payload
                }
            })

            state.items = newState;
        });
        builder.addCase(fetchDeleteProduct.fulfilled, (state, action) => {
            if (state && state.items) {
                const prodductToDelete = state.items.find(x => x.id == action.payload);

                if (prodductToDelete) {
                    const index = state.items.indexOf(prodductToDelete);
                    state.items.splice(index, 1);
                }
            }
        });
    },
})

export default productsSlice.reducer;