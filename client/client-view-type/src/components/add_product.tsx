import { Component, ChangeEvent, ReactNode } from "react";
import Product from "../types/product_type";
import ProductService from "../services/products_service";


type Props = {};

type State = Product & { created: boolean, image_name: string }

export default class CreateProduct extends Component<Props, State>{
    // This component is responsible for the creation of the product.
    constructor(props: Props) {
        super(props);
        this.createProduct = this.createProduct.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeValue = this.onChangeValue.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.restart = this.restart.bind(this);
        this.imageUpload = this.imageUpload.bind(this);
        this.state = {
            id: null,
            description: "",
            product_name: '',
            product_value: "",
            created: false,
            image_name: '',
            image: undefined
        };
    }

    // The onChangeX methods, are used to replace the curent data in the inputs to the specific variables in state of the product type.

    onChangeName(e: ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        this.setState({
            product_name: value
        });
    }

    onChangeValue(e: ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        this.setState({
            product_value: value
        });
    }

    onChangeDescription(e: ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        this.setState({
            description: value
        });
    }

    createProduct() {
        // Main method of the creation process, sets the new product data and sends it to the service.
        const data: Product = {
            product_name: this.state.product_name,
            description: this.state.description,
            product_value: this.state.product_value,
            image: this.state.image,
            image_name: this.state.image_name
        };
        console.log(data)
        ProductService.createProduct(data)
            .then((response: any) => {
                this.setState({
                    id: response.data.data.id,
                    product_name: response.data.dataproduct_name,
                    description: response.data.datadescription,
                    product_value: response.data.data.product_value,
                });
                setTimeout(
                    window.location.href = '/get-product/' + response.data.data.id,
                    10000
                );
            })
            .catch((e: Error) => {
                console.log(e);
            });
        ProductService.uploadImage(this.state.image);

    }
    imageUpload(e: ChangeEvent<HTMLInputElement>) {
        // Image upload method, i useed a form_data for this, because it was simpler to upload to the "backend".
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            let this_form = new FormData();
            this_form.append("image", img)
            this_form.append("name", img.name);
            this.setState({
                // image: URL.createObjectURL(img)
                image: this_form,
                image_name: img.name,

            });
        }
    };

    restart() {
        this.setState({
            id: null,
            description: "",
            product_name: '',
            product_value: "",
            created: false
        });
    }

    render() {
        const { created, product_name, product_value, description } = this.state;
        return (
            <div className="m-5 mt-5">
                <div className="container bg-dark text-white form-row mt-5">
                    <div className="m-3 mt-5 form-group">
                        <label className="mt-2" htmlFor="product_name">Product Name: </label>
                        <input className='form-control mb-2' name="product_name" id="product_name" onChange={this.onChangeName} value={product_name}></input>
                    </div>
                    <div className="m-3 mt-5 form-group">
                        <label htmlFor="description">Product Description: </label>
                        <input className='form-control mb-2' name="description" onChange={this.onChangeDescription} id="description" value={description}></input>
                    </div>
                    <div className="m-3 mt-5 form-group">
                        <label>Product Value: </label>
                        <input className='form-control' name="product_value" onChange={this.onChangeValue} value={product_value}></input>
                    </div>
                    <div className="m-3 mt-5 form-group">
                        <input type="file" name="product_image" onChange={this.imageUpload}></input>
                    </div>
                    <div className="form-group container">
                        <div className="col-sm-10">
                            <button className="btn btn-success mb-5" onClick={this.createProduct}>Save</button>
                        </div>
                    </div>
                </div>
            </div>)
    }
}