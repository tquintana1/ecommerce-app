// ItemDetail.js
import React, { useContext } from "react";
import { TbShoppingCart } from "react-icons/tb";
import { CartContext } from "./Cart/CartContext";
import ItemCount from "./ItemCount";

function ItemDetail({ producto }) {
    const { addToCart } = useContext(CartContext);

    const handleAddToCart = (quantity) => {
        addToCart(producto, quantity);
    };

    return (
        <div className="flex justify-center items-center">
            <div>
                <img className="object-cover object-center w-full mb-8 lg:h-72 md:h-48 rounded-xl max-w-48 mr-4" src={producto.img} alt={producto.name} />
            </div>
            <div className="flex flex-col justify-center">
                <h1 className="mb-2 text-xl font-semibold leading-none tracking-tighter text-neutral-700">{producto.name}</h1>
                <p className="mx-auto text-base font-medium leading-relaxed text-gray-500">Description: {producto.description}</p>
                <p className="mx-auto text-base font-medium leading-relaxed text-gray-500">Stock: {producto.stock}</p>
                <p className="mx-auto text-base font-medium leading-relaxed text-gray-500">Price: {producto.price}</p>
                <p className="mx-auto text-base font-medium leading-relaxed text-gray-500">Category: {producto.categoria}</p>
                <ItemCount onAdd={handleAddToCart} />
            </div>
        </div>
    );
}

export default ItemDetail;
