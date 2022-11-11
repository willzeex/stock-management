import ProductModel from "src/models/products/product-model";

export type RootState = {
    products: ProductsState;
};

export type ProductsState = {
    isFetching?: boolean;
    serverError?: string;
    items?: ProductModel[];
};
