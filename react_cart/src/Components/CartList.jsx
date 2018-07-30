import Product from "./Cart";
import AddToCartButton from "./Button.jsx";
import RemoveCartButton from "./Button.jsx";
import DecrementCartButton from "./Button.jsx";
import React, { Component } from "react";

// CartList component (is a Stateless component)
export default class CartList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: " "
    };
    //console.log(this.props.productId)
    // Sets the initial state.
  }

  handleInputChange(idx, e) {
    var val = e.target.value;
    console.log(val);
    if (val < 0 || val % 1 !== 0) {
      alert("Enter Valid Quantity");
    } else {
      this.setState({
        value: this.props.updateState(val, idx)

        // value: this.props.updateState(idx)
      });
    }
  }
  // updateInput(value1) {
  //   this.setState({
  //     value: value1
  //   });
  //   // console.log(value1);
  // }

  render() {
    return (
      <React.Fragment>
        <h2>Cart List ({`${this.props.cart.length}`})</h2>
        <ul>
          {this.props.cart.map((product, idx) => (
            <Product key={idx} {...product}>
              <AddToCartButton
                onClick={this.props.addToCart.bind(
                  null,
                  product.id,
                  product.quant
                )}
                message="+"
              />
              {
                // console.log(idx)
              }
              <input
                onChange={this.handleInputChange.bind(this, product.id)}
                // onBlur={() => this.updateInput(this.state.value)}
                type="number"
                min="0"
                typeof="integar"
                value={product.quant}
                id={product.id}
                autoComplete={"on"}
              />

              <DecrementCartButton
                onClick={this.props.minusItem.bind(
                  null,
                  product.id,
                  product.quant
                )}
                message="-"
              />

              <RemoveCartButton
                onClick={this.props.deleteItem.bind(
                  null,
                  product.id,
                  product.quant
                )}
                message="X"
              />
            </Product>
          ))}
        </ul>

        <div>
          <span>Subtotal: </span>
          <strong>
            {this.props.cart
              .reduce(
                (subTotal, { price, quant }) => subTotal + price * quant,
                0.0
              )
              .toFixed(2)}
          </strong>
        </div>
      </React.Fragment>
    );
  }
}
