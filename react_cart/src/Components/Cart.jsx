import React from "react";

// Product component (is a Stateless component)
export default ({ id, name, price, quant, children }) => (
  <li className="product">
    <div className="inline">
      Product: {name}
      <span className="spa">
      Price: {price} 
      </span >
      <br />
      {children}
    </div>
  </li>
);
