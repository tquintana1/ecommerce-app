import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from 'firebase/firestore';
import db from '../firebase';
import { TbShoppingCart } from "react-icons/tb";
import { toast } from "sonner";
import { addToCart } from "./Cart/addToCart";
import { CartContext } from "./Cart/CartContext";
import { Toaster } from "sonner";

function ItemDetailContainer() {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const { cartItems, setCartItems } = useContext(CartContext);

    useEffect(() => {
        const fetchProducto = async () => {
            try {
                const docRef = doc(db, 'productos', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setProducto(docSnap.data());
                } else {
                    console.log('No such document!');
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchProducto();
    }, [id]);

    if (!producto) return null;

    return (
        <main className="text-center">
            <Toaster richColors closeButton />
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
                    <button type="button" onClick={() => addToCart(producto, cartItems, setCartItems)} className="text-white mt-4 bg-amber-500 hover:bg-amber-600 focus:ring-4 focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center me-0 mb-2 ml-1	 dark:bg-amber-400 dark:hover:bg-amber-500 focus:outline-none dark:focus:ring-amber-600">
                        <div className="me-2"><TbShoppingCart /></div>
                        Añadir al carrito
                    </button>
                </div>
            </div>
        </main>
    );
}

export default ItemDetailContainer;
