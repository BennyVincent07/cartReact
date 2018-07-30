import React from "react";

// Product component (is a Stateless component)
export default ({ id, name, price, quant, children }) => (
  <li className="product">
    <div className="inline">
      Product: {name} <br />
      Price: {price} <br />
      Quant: {quant} <br />
      {children}
    </div>
  </li>
);
