import React, { Fragment, useContext, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import image from "../images/meals.jpg";
import Cart from "./Cart";
import CartContext from "../context/meals-context";

function Header() {
  const [buttonBump, setBump] = useState(false);
  const [showCart, setCart] = useState(false);
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

  
  return (
    <Fragment>
      {showCart && <Cart closeCart={unhandleCart} />}
      <div className="header-box">
        <p>MealsApp</p>
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
          <span className="badge">{ctx.items.length}</span>
        </button>
      </div>
      <div className="img-box">
        <img src={image} alt="A table with trays of food" />
      </div>
    </Fragment>
  );
}

export default Header;
