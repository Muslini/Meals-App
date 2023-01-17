import React, { Fragment, useContext } from "react";
import ReactDOM from "react-dom";
import Card from "./UI/Card";
import "./Cart.css";
import CartItem from "./CartItem";
import CartContext from "../context/meals-context";


function doNothing() {
  console.log("musa");
}

function Cart(props) {
  const ctx = useContext(CartContext);
  const realAmount = ctx.totalAmount.toFixed(1)
  function addOne(item) {
    ctx.addItem({...item, amount: 1})
  }

  function removeOne(id) {
    ctx.removeItem(id)
  }

  function mapThrough(doc) {
    return (
      <CartItem 
        key= {doc.id}
        name= {doc.name}
        amount= {doc.amount}
        price= {doc.price}
        onAdd= {addOne.bind(null, doc)}
        onRemove= {removeOne.bind(null, doc.id)}
      />
    );
  }

  function Modal(props) {
    return (
      <Fragment>
        <div onClick={props.closeCart} className="cart-box"></div>
        <Card className={`cart-card`}>
          <div className="cart-container">
            {ctx.items.map(mapThrough)}
          </div>
          <div className="totals">
            <span>Total Amount</span>
            <span>${realAmount}</span>
          </div>
          <div className="buttons">
            <button onClick={props.closeCart}>Close</button>
            <button onClick={doNothing}>Order</button>
          </div>
        </Card>
      </Fragment>
    );
  }


  return (
    <Fragment>
      {ReactDOM.createPortal(<Modal closeCart={props.closeCart} />, document.getElementById("overlay"))}
    </Fragment>
  );
}

export default Cart;
