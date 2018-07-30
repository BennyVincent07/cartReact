import React from "react";
import Product from "./Product";
import AddToCartButton from "./Button";
export default ({ products, addToCart }) => (
  <React.Fragment>
    <h2>Products List</h2>
    <div>
      {products.map(product => (
        <Product key={product.id} {...product}>
          <AddToCartButton
            onClick={addToCart.bind(null, product.id, product.quant)}
            message="Add to Cart"
          />
        </Product>
      ))}
    </div>
  </React.Fragment>
);
