import { Component, ChangeEvent } from "react";
import Product from "../types/product_type";
import ProductService from "../services/products_service";
import { RouteComponentProps } from "react-router-dom";
import '../media/css/product_css.css'

interface RouterProps {
    id: string;
}

type Props = RouteComponentProps<RouterProps>;
type State = {
    self_product: Product;

}


export default class SelfProduct extends Component<Props, State> {
    // Main component of the product, this is used to visualize a created product, also responsible for updating the desired changes.
    constructor(props: Props) {
        super(props);
        this.getProduct = this.getProduct.bind(this);
        this.updateProduct = this.updateProduct.bind(this);
        this.onChangeValue = this.onChangeValue.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.state = {
            self_product: {
                id: null,
                product_name: "",
                product_value: "",
                description: "",
                image_name: ""
            },
        };


    }

    onChangeValue(e: ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        this.setState(function (prevState) {
            return {
                self_product: {
                    ...prevState.self_product,
                    product_value: value,
                },
            };
        });
    }

    onChangeDescription(e: ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        this.setState(function (prevState) {
            return {
                self_product: {
                    ...prevState.self_product,
                    description: value,
                },
            };
        });
    }
    componentDidMount() {
        // When the component mounts, i get the id of the url and get the product.
        this.getProduct(this.props.match.params.id)

    }

    getProduct(id: string) {
        ProductService.getProduct(id)
            .then((response: any) => {
                this.setState({
                    self_product: response.data.data,
                });
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    updateProduct() {
        ProductService.updateProduct(
            this.state.self_product,
            this.state.self_product.id
        )
            .then((response: any) => {
                console.log(response.data);

            })
            .catch((e: Error) => {
                console.log(e);
            });
    }



    render() {
        const { self_product } = this.state;
        return (
            <div className="mt-5">
                <h1 className="text-white">Product Name: {self_product.product_name}</h1>

                <div className="card bg-dark text-white w-50">
                    <img className="card-img " src={`http://127.0.0.1:5000/get-image/${self_product.image_name}`} />
                    <div className="card-img-overlay">
                        <h5 className="card-title"><label htmlFor="product_value">Product Value: </label>
                            <input id="product_value" value={self_product.product_value} onChange={this.onChangeValue} className="m-2 " name="product_value"></input></h5>
                        <p className="card-text"><label htmlFor="description">Description: </label>
                            <input id="description" value={self_product.description} onChange={this.onChangeDescription} className="m-2 "></input></p>
                        <button className="btn btn-success" onClick={this.updateProduct}>Edit Product</button>
                    </div>
                </div>
            </div >

        )
    }
}