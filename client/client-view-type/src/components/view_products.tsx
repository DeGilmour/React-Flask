import { Component } from "react";
import Product from "../types/product_type";
import ProductService from "../services/products_service";
import { Link } from "react-router-dom";


type Props = {};

type State = {
    products: Array<Product>
}


export default class AllProducts extends Component<Props, State>{
    // Component responsible for constructing a list of products to be visualized.
    constructor(props: Props) {
        super(props);
        this.getAllProducts = this.getAllProducts.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.state = {
            products: []
        };
    }

    componentDidMount() {
        // When the component mounts it asks for the list.
        this.getAllProducts();
    }

    getAllProducts() {
        // Gets the list of products.
        ProductService.getAllProducts()
            .then((response: any) => {
                this.setState({
                    products: response.data
                });
                console.log(response.data);

            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    deleteProduct(id: number) {
        ProductService.deleteProduct(id)
            .then((response: any) => {
                console.log(response.data);
                window.location.reload();
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }
    render() {
        const { products } = this.state;
        return (
            <div className="m-5 p-5">
                <h4 className="mb-5 text-white">All Products</h4>
                <div className="container">
                    <div className="row">
                        {products.length <= 0 && <h2 className="alert alert-info"> You have no products created at this moment, please create a new product.</h2>}
                        {products &&
                            products.map((product: Product, index) => (
                                <div className="col-sm cards">
                                    <div className="card" >
                                        <img className="card-img-top" src={`http://127.0.0.1:5000/get-image/${product.image_name}`} alt="A lacking" />
                                        <div className="card-body">
                                            <h5 className="card-title">Product: {product.product_name}</h5>
                                            <p className="card-text">Description: {product.description}</p>
                                            <button onClick={() => this.deleteProduct(product.id)} className="btn btn-danger m-2" >Delete</button>
                                            <Link to={'/get-product/' + product.id} className="btn btn-primary m-2">Edit</Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>


            </div >
        )
    }
}