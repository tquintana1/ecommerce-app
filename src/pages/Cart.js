import React, { useEffect, useState } from "react";
import { addDoc, collection } from 'firebase/firestore';
import db from '../firebase';
import useForm from "../components/Cart/useForm";

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [orderId, setOrderId] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const savedCartItems = JSON.parse(localStorage.getItem('cartItems'));
        if (savedCartItems) {
            setCartItems(savedCartItems);
        }
    }, []);

    const removeFromCart = (index) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems.splice(index, 1);
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const submitCallback = async (formData) => {
        if (cartItems.length === 0) {
            alert('Tu carrito está vacío.');
            return;
        }

        try {
            const totalCost = calculateTotal();
            const docRef = await addDoc(collection(db, 'ordenes'), {
                ...formData,
                productos: cartItems,
                costo_total: totalCost,
                timestamp: new Date()
            });
            console.log("Documento agregado con ID:", docRef.id);
            setOrderId(docRef.id);
            setShowModal(true);

            setCartItems([]);
            setFormData({
                nombre: "",
                apellido: "",
                correo: "",
                celular: ""
            });
            localStorage.removeItem('cartItems');
        } catch (error) {
            console.error("Error al agregar documento:", error);
        }
    };

    const { formData, setFormData, handleSubmit } = useForm(submitCallback);

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + parseFloat(item.price), 0);
    };

    return (
        <div className="flex justify-center items-center h-full relative">
            {showModal && (
                <div className="fixed inset-0 z-10 bg-gray-800 opacity-50"></div>
            )}

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
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mt-8 space-y-4">
                        <div>
                            <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-gray-900">Nombre</label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleInputChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="Juan"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="apellido" className="block mb-2 text-sm font-medium text-gray-900">Apellido</label>
                            <input
                                type="text"
                                id="apellido"
                                name="apellido"
                                value={formData.apellido}
                                onChange={handleInputChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="Lopez"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="correo" className="block mb-2 text-sm font-medium text-gray-900">Correo electrónico</label>
                            <input
                                type="email"
                                id="correo"
                                name="correo"
                                value={formData.correo}
                                onChange={handleInputChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="juan@amazon.com"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="celular" className="block mb-2 text-sm font-medium text-gray-900">Celular</label>
                            <input
                                type="tel"
                                id="celular"
                                name="celular"
                                value={formData.celular}
                                onChange={handleInputChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                                placeholder="1154302310"
                                required
                            />
                        </div>
                    </div>
                    <div className="flex justify-end space-x-4 mt-3	">
                        <button type="submit" className="px-6 py-2 border rounded-md bg-amber-500	 text-white">Checkout</button>
                    </div>
                </form>

                {showModal && (
                    <div className="fixed inset-0 z-10 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                        <div className="relative w-auto max-w-3xl mx-auto my-6">
                            <div className="bg-white rounded-lg shadow-lg outline-none focus:outline-none">
                                <div className="flex items-start justify-between p-5 border-b border-gray-200 rounded-t">
                                    <h3 className="text-lg font-semibold">ID de la Orden</h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="text-black">×</span>
                                    </button>
                                </div>
                                <div className="relative p-6 flex-auto">
                                    <p className="text-gray-800">Tu ID de orden es: <span className="font-semibold">{orderId}</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>

    );
}

export default Cart;
