import React from "react";

function CartItem(props) {
  return (
    <div className="cart-item">
      <div>
        <h3>{props.name}</h3>
        <div>
          <span className="price">{props.price}</span>
          <span className="amount">x{props.amount}</span>
        </div>
      </div>
      <div className="actions">
        <button onClick={props.onRemove}>-</button>
        <button onClick={props.onAdd}>+</button>
      </div>
    </div>
  );
}

export default CartItem;
