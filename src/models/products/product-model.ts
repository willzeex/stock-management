import Manufacturer from "./manufacturer";

export default interface ProductModel {
    id: string;
    name: string;
    description: string;
    barCode: string;
    manufacturer: Manufacturer;
    costPrice: number;
    salePrice: number;
    stockQuantity: 15
}