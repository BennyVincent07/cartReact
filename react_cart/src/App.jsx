import React, { Component } from "react";
import { pages } from "./Constants";
import ProductList from "./Components/ProductList";
import CartList from "./Components/CartList";
import Button from "./Components/Button";
import { getProducts, findProductById, quant } from "./api";
import products from "./api";

// App Component (is a stateful component)
export default class App extends Component {
  constructor(props) {
    super(props);
    // Sets the initial state.
    this.state = {
      currentPage: pages.PRODUCT_LIST, // Initial page is PRODUCT_LIST
      isLoading: true, // Should show loading until the products are loaded.
      products: [], // Initially the products list is empty
      cart: [],
      totalItem: 0
      // Initially the cart list is empty
    };
  }

  /**
   * componentDidMount is a React lifecycle method
   * that would be called immediately after the component is
   * mounted in the DOM.
   * Should make all the asynchronous or side effect casusing calls
   * from here.
   * Since we are using `await` inside this method
   * `async` is needed in front of this method signature.
   */
  async componentDidMount() {
    // Get the products this is an async function
    // returns a Promise
    const products = await getProducts();
    // Sets the products and isLoading to false
    this.setState({ products, isLoading: false });
  }

  /**
   * Sets the currentPage as CART_LIST
   */
  goToCart = () => {
    this.setState({
      currentPage: pages.CART_LIST
    });
  };

  /**
   * Sets the currentPage as PRODUCT_LIST
   */
  goToCatalog = () => {
    this.setState({
      currentPage: pages.PRODUCT_LIST
    });
  };

  /**
   * Add product to the cart list
   */
  addToCart = productId => {
    const { cart } = this.state;
    const product = findProductById(productId);
    this.setState({
      totalItem: this.state.totalItem + 1
    });
    // this.updateState(productId,product.quant);
    product.quant++;

    if (product.quant === 1) {
      this.setState({
        cart: [...cart, product]
      });
    }

    // console.log("button1"+cart[0]);
    //console.log("button2"+cart[1]);
  };
  minusItem = productId => {
    const { cart } = this.state;
    const product = findProductById(productId);
    if (product.quant > 0) {
      product.quant--;
      this.setState({
        totalItem: this.state.totalItem - 1
      });
    } else {
      this.setState({
        cart: [...cart]
      });
    }

    if (product.quant === 0) {
      this.state.totalItem = this.state.totalItem - 1;
      this.deleteItem(productId);
    }
  };
  updateState = (val, id) => {
    const { cart } = this.state;
    const product = findProductById(id);
    if (val === "0") {
      const item = cart.indexOf(product);

      cart.splice(item, 1);
      var currentQuant = val - product.quant;
      // this.setState({
      //   totalItem : this.state.totalItem + currentQuant
      // })
      this.state.totalItem = this.state.totalItem + currentQuant;
      console.log(cart.length + " " + product.quant);
      product.quant = val;
      this.setState({
        cart: [...cart]
      });
    } else if (val !== "") {
      const { cart } = this.state;
      var currentQuant = val - product.quant;
      product.quant = val;
      this.setState({
        totalItem: this.state.totalItem + currentQuant
      });
    } else val === "";
    {
      const { cart } = this.state;
      var currentQuant = val - product.quant;
      product.quant = val;
      this.setState({
        cart: [...cart]
      });
    }
  };

  deleteItem = (productId, quant) => {
    const { cart } = this.state;
    const product = findProductById(productId);
    this.setState({
      totalItem: this.state.totalItem - product.quant
    });
    product.quant = 0;
    const item = cart.indexOf(product);
    cart.splice(item, 1);
    this.setState({
      cart: [...cart]
    });
  };

  render() {
    const { isLoading, currentPage, cart, products } = this.state;

    if (isLoading) {
      return <div className="loading">Loading...</div>;
    }

    const listing =
      currentPage === pages.PRODUCT_LIST ? (
        <ProductList products={products} addToCart={this.addToCart} />
      ) : (
        <CartList
          cart={cart}
          addToCart={this.addToCart}
          deleteItem={this.deleteItem}
          minusItem={this.minusItem}
          productId={this.productId}
          updateState={this.updateState}
        />
      );

    let navBtnMsg, navBtnFn;
    if (currentPage === pages.PRODUCT_LIST) {
      navBtnMsg = cart.length;

      navBtnFn = this.goToCart;
    } else {
      navBtnMsg = "Back";
      navBtnFn = this.goToCatalog;
    }

    return (
      <div>
        <Button
          className="goto-cart-btn"
          onClick={navBtnFn}
          message={navBtnMsg}
        />
        {listing}
      </div>
    );
  }
}
