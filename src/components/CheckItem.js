import React from "react";
import { Icon } from "@iconify/react";

function CheckItem(props) {
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
        <button onClick={props.onDelete}>
          <Icon
            icon="mdi:bin-circle"
            inline={true}
            style={{ fontSize: "2rem" }}
          />
        </button>
      </div>
    </div>
  );
}

export default CheckItem;