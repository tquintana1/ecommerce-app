// ItemListContainer.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { collection, getDocs, query, where } from 'firebase/firestore';
import db from '../firebase';
import Cart from "./Cart";

function ItemListContainer() {
    const { categoryId } = useParams();
    const [productos, setProductos] = useState([]);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                let querySnapshot;
                if (categoryId) {
                    const q = query(collection(db, 'productos'), where('categoria', '==', categoryId));
                    querySnapshot = await getDocs(q);
                } else {
                    querySnapshot = await getDocs(collection(db, 'productos'));
                }
                const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setProductos(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchProductos();
    }, [categoryId]);

    const addToCart = (producto) => {
        setCartItems([...cartItems, producto]);
    };

    return (
        <main>
            <section>
                <div className="relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-24 max-w-7xl">
                    <div className="grid w-full grid-cols-1 gap-6 mx-auto lg:grid-cols-3">
                        {productos.map((producto) => (
                            <div key={producto.id}>
                                <Link to={`/item/${producto.id}`}>
                                    <div className="p-6">
                                        <img className="object-cover object-center w-full mb-8 lg:h-48 md:h-36 rounded-xl" src={producto.img} alt={producto.name} />
                                        <div className="inline-flex justify-between w-full">
                                            <h1 className="mb-8 text-xl font-semibold leading-none tracking-tighter text-neutral-600">{producto.name}</h1>
                                            <span>${producto.price}</span>
                                        </div>
                                        <p className="mx-auto text-base font-medium leading-relaxed text-gray-500">{producto.description}</p>
                                        <button onClick={() => addToCart(producto)}>Add to Cart</button>
                                    </div>
                                </Link>
                                <button onClick={() => addToCart(producto)}>Add to Cart</button>

                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Cart cartItems={cartItems} />
        </main>
    );
}

export default ItemListContainer;
