// Cart.jsx
import React from "react";

function Cart({ cartItems }) {
    // Verificar si cartItems está indefinido o nulo
    if (!cartItems || cartItems.length === 0) {
        return <div>No items in cart</div>;
    }

    return (
        <div>
            <h2>Shopping Cart</h2>
            {cartItems.map((item, index) => (
                <div key={index} className="cart-item">
                    <img src={item.img} alt={item.name} />
                    <div>
                        <h3>{item.name}</h3>
                        <p>${item.price}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Cart;
