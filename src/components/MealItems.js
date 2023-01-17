import React, { useContext, useRef } from "react";
import "./MealItems.css";
import CartContext from "../context/meals-context";

function MealItems(props) {
const amountRef = useRef();
const ctx = useContext(CartContext);

function submitHandler(event) {
  event.preventDefault();
  
  ctx.addItem({
    id: props.id,
    name: props.name,
    price: props.price,
    amount: +amountRef.current.value
  })

} 

  return (
    <div className="items-box">
      <div className="info">
        <h4 className="name">{props.name}</h4>
        <span>{props.description}</span>
        <p className="price">${props.price}</p>
      </div>
      <form onSubmit={submitHandler}>
        <div className="input">
          <label>Amount</label>
          <input ref={amountRef} type="number" step="1" min="1" max="5" required />
        </div>
        <button>Add</button>
      </form>
    </div>
  );
}

export default MealItems;
