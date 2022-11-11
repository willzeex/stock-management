import axios from "axios";
import ProductModel from "src/models/products/product-model";

const productApi = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' }
});

export default async function getAllProducts(){
    try {
        const response = await productApi.get<ProductModel[]>('/products');
        return response.data;
    } catch (error) {
        console.error(error);
    }
}