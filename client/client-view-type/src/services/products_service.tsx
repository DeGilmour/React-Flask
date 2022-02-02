import http from "../http-common";
import Product from "../types/product_type";
import axios from "axios";

class ProductService{
    // This is the service class, its responsible to send every http request to the flask api.
    getAllProducts(){
        // Returns a list of every product created.
        return http.get<Array<Product>>('/')
    }

    createProduct(data: Product) {
        // Sends the data to create a new product
        return http.post<Product>("/add-product", data);
    }
    
    uploadImage(formData: any){
        // Uploads the image of the new product
        axios.post('/upload-file', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
    }
    deleteProduct(id: any) {
        // Deletes the desired product.
        return http.delete<any>(`/delete-product/${id}`);
    }

    getProduct(id: string){
        // Returns a specific product.
        return http.get<Product>(`/get-product/${id}`);
    }

    updateProduct(data: Product, id: any) {
        // Updates the selected project with new information.
        return http.put<any>(`/update-product/${id}`, data);
    }
    

}
export default new ProductService();