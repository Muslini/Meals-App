import React, { useContext, useState } from "react";
import { Fragment } from "react";
import CartContext from "../context/meals-context";
import CheckItem from "./CheckItem";
import Card from "./UI/Card";
import { PaystackButton } from "react-paystack";

function CheckOut(props) {
  const ctx = useContext(CartContext);
  const publicKey = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY;
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const realAmount = ctx.totalAmount;
  const VAT = (0.05 * realAmount);
  const numVAT = +VAT;
  const numAmount = +realAmount;
  const total = (numVAT + numAmount); 
  const amount = total * 100;
  function deleteOne(id) {
    ctx.deleteItem(id);
  }
  function mopUp() {
    props.cancelCheckout();
    ctx.afterOrder()
  }

  const components = {
    email,
    amount,
    metadata: {
      name,
      phone
    },
    publicKey,
    text: "Proceed to checkout",
    onSuccess : mopUp,
    onClose: () => alert("buy this food so hunger doesn't kill you")
  }

  function mapThrough(doc) {
    return (
      <CheckItem
        key={doc.id}
        name={doc.name}
        amount={doc.amount}
        price={doc.price}
        onDelete={deleteOne.bind(null, doc.id)}
      />
    );
  }

  return (
    <Fragment>
      <div onClick={props.closeCart} className="check-box">
        <h2 className="Check-text">Please confirm your order</h2>
      </div>
      <Card className={`check-card`}>
        <div className="sect1">
          <div className="check-container">{ctx.items.map(mapThrough)}</div>
          <div className="totals">
            <span>Amount</span>
            <span>₦{realAmount.toLocaleString()}.00</span>
          </div>
          <div className="totals">
            <span>VAT</span>
            <span>₦{VAT.toLocaleString()}.00</span>
          </div>
          <div className="totals">
            <span>Total</span>
            <span>₦{total.toLocaleString()}.00</span>
          </div>
        </div>
        <div className="sect2">
          <div className="user-info">
            <div>
              <label>Name</label>
              <input onChange={(e) => setName(e.target.value)} type="text" required></input>
            </div>
            <div>
              <label>Email</label>
              <input onChange={(e) => setEmail(e.target.value)} type="email" required></input>
            </div>
            <div>
              <label>Phone</label>
              <input onChange={(e) => setPhone(e.target.value)} type="number" required></input>
            </div>
          </div>
          <div className="pay-button">
            <button onClick={props.cancelCheckout}>Cancel</button>
            <PaystackButton {...components} />
          </div>
        </div>
      </Card>
    </Fragment>
  );
}

export default CheckOut;
