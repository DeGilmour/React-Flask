export default interface Product {
    id?: any | null;
    product_name: string, 
    description: string;
    product_value?: string,
    image?: FormData,
    image_name?: string
}