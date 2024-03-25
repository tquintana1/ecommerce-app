import React, { useContext } from "react";
import { CartContext } from "../components/Cart/CartContext";
import Checkout from "../components/Cart/Checkout";

function Cart() {
    const { cartItems, removeFromCart, calculateTotal, clearCart } = useContext(CartContext);

    return (
        <div className="flex justify-center items-center h-full relative">
            <div className="flex flex-col max-w-3xl p-6 space-y-4 sm:p-10 bg-white">
                <h2 className="text-xl font-semibold">Tu Carrito</h2>
                <ul className="flex flex-col divide-y divide-gray-200">
                    {cartItems.map((item, index) => (
                        <li key={index} className="flex flex-col py-6 sm:flex-row sm:justify-between">
                            <div className="flex w-full space-x-2 sm:space-x-4">
                                <img className="flex-shrink-0 object-cover w-20 h-20 border border-gray-300 rounded outline-none sm:w-32 sm:h-32" src={item.img} alt={item.name} />
                                <div className="flex flex-col justify-between w-full pb-4">
                                    <div className="flex justify-between w-full pb-2 space-x-2">
                                        <div className="space-y-1">
                                            <h3 className="text-lg font-semibold leading-6">{item.name}</h3>
                                            <p className="text-sm text-gray-500">{item.description}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-semibold">{item.price}$</p>
                                        </div>
                                    </div>
                                    <div className="flex text-sm divide-x">
                                        <button type="button" className="flex items-center px-2 py-1 pl-0 space-x-1" onClick={() => removeFromCart(index)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 fill-current text-gray-400">
                                                <path d="M96,472a23.82,23.82,0,0,0,23.579,24H392.421A23.82,23.82,0,0,0,416,472V152H96Zm32-288H384V464H128Z"></path>
                                                <rect width="32" height="200" x="168" y="216"></rect>
                                                <rect width="32" height="200" x="240" y="216"></rect>
                                                <rect width="32" height="200" x="312" y="216"></rect>
                                                <path d="M328,88V40c0-13.458-9.488-24-21.6-24H205.6C193.488,16,184,26.542,184,40V88H64v32H448V88ZM216,48h80V88H216Z"></path>
                                            </svg>
                                            <span className="text-gray-400">Eliminar</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="space-y-1 text-right">
                    <p>Monto total: <span className="font-semibold">{calculateTotal()} $</span></p>
                    <p className="text-sm text-gray-500">No incluye impuestos y costo de envío</p>
                    <button className="md:hover:text-red-700 text-red-500" onClick={clearCart}>Vaciar Carrito</button>
                </div>
                <Checkout />
            </div>
        </div>
    );
}

export default Cart;
