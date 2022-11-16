import Manufacturer from "src/models/products/manufacturer";
import ProductModel from "src/models/products/product-model";

export type RootState = {
    products: ProductsState;
    manufacturers: ManufacturerState;
};

export type ProductsState = {
    items?: ProductModel[];
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
    serverError?: string;
};

export type ManufacturerState = {
    items?: Manufacturer[];
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
    serverError?: string;
};