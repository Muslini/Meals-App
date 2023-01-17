import React, { useReducer } from "react";
import CartContext from "./meals-context"

const defaultCart = {
    items: [],
    totalAmount: 0
};

function cartReducer(state, action) {
    if(action.type === "ADD") {
        const exists = state.items.findIndex(element => element.id === action.value.id)
        const existsItem = state.items[exists];
        let updatedItems;

        if(existsItem) {
            const updatedItem = {
                ...existsItem,
                amount: existsItem.amount + action.value.amount
            }
            updatedItems = [...state.items];
            updatedItems[exists] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.value)
        }

        return {
            items: updatedItems,
            totalAmount: state.totalAmount + (action.value.amount * action.value.price)
        }
    }

    if(action.type === "MINUS") {
        const exists = state.items.findIndex((element) => { if(element.id === action.id) {return true}})
        const existsItem = state.items[exists];
        let updatedItems;
        const calcAmount = state.totalAmount - existsItem.price;
        
        if(existsItem.amount > 1) {
            const updatedItem = {
                ...existsItem,
                amount: existsItem.amount - 1
            }
            updatedItems = [...state.items];
            updatedItems[exists] = updatedItem;
        } else {
            updatedItems = state.items.filter(element => element.id !== action.id)
        }

        return {
            items: updatedItems,
            totalAmount: calcAmount 
        }
    }
    return defaultCart;
};

function ContextProvider(props) {

    const [cartState, cartDispatch] = useReducer(cartReducer, defaultCart)

    function addHandler(item) {
        cartDispatch({type:"ADD", value: item})
    };

    function removeHandler(id) {
        cartDispatch({type:"MINUS", id: id})
    };

    const contextValue = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addHandler,
        removeItem: removeHandler
    }

    return (
        <CartContext.Provider value={contextValue}>
            {props.children}
        </CartContext.Provider>
    )

};

export default ContextProvider;