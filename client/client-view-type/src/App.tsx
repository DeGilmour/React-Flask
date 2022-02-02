
import { Component } from 'react';
import './App.css';
import { Link, Switch, Route } from "react-router-dom";
import CreateProduct from './components/add_product'
import AllProducts from './components/view_products'
import "bootstrap/dist/css/bootstrap.min.css";
import SelfProduct from './components/self_product';
import './media/css/product_css.css'

class App extends Component {
  // Main component, here i created a bunch of views to switch the current page, using a simple navbar.
  render() {
    return (
      <div>
        <div className='bg-dark'>
          <nav className="navbar navbar-expand navbar-dark bg-dark mb-5">
            <Link to={"/"} className="navbar-brand">
              FreshProduct
            </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/"} className="nav-link">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                  Add a Product
                </Link>
              </li>
            </div>
          </nav>
          <div className="background min-vh-100 mt-5">
            <div className='container mt-5'>
              <Switch>
                <Route exact path={["/", "/tutorials"]} component={AllProducts} />
                <Route exact path="/add" component={CreateProduct} />
                <Route path="/get-product/:id" component={SelfProduct} />
              </Switch>
            </div>
          </div>
        </div>

      </div>
    );
  }
}


export default App;
