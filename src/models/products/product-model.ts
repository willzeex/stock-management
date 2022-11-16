export default class ProductModel {
    id?: string;
    name?: string;
    description?: string;
    barCode?: string;
    manufacturer?: ManufacturerModel;
    costPrice?: number;
    salePrice?: number;
    stockQuantity?: number;
}

interface ManufacturerModel {
    id: string;
    name: string | null;
}