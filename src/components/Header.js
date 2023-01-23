import React, { Fragment, useContext, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import image from "../images/p1.jpg";
import Cart from "./Cart";
import CartContext from "../context/meals-context";
import CheckOut from "./Checkout";

function Header() {
  const [buttonBump, setBump] = useState(false);
  const [showCart, setCart] = useState(false);
  const [showCheckout, setCheckout] = useState(false);
  const ctx = useContext(CartContext);
  useEffect(() => {
    if(ctx.items.length === 0) { return; }  
    setBump(true);
    const clear = setTimeout(() => { setBump(false)}, 300);

    return () => {clearTimeout(clear)};
  }, [ctx.items]);  

  function handleCartClick() {
    setCart(true);
  }

  function unhandleCart() {
    setCart(false);
  }
  function startCheckout() {
    setCheckout(true);
    setCart(false);
  }
  function closeCheckout() {
    setCheckout(false);
    console.log("i just ran")
  }

  const numberOfCartItems = ctx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  return (
    <Fragment>
      {showCart && <Cart closeCart={unhandleCart} openCheckout={startCheckout} />}
      {showCheckout && <CheckOut cancelCheckout={closeCheckout} />}
      <div className="header-box">
        <p>FoodApp</p>
        <button
          onClick={handleCartClick}
          className={`button ${buttonBump && "bump"}`}
        >
          <Icon
            icon="material-symbols:shopping-cart"
            inline={true}
            style={{ fontSize: "1.5rem" }}
          />
          <span>Your Items</span>
          <span className="badge">{numberOfCartItems}</span>
        </button>
      </div>
      <div className="img-box">
        <img src={image} alt="A table with trays of food" />
      </div>
    </Fragment>
  );
}

export default Header;
