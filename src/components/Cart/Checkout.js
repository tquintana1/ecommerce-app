import React, { useEffect, useState, useContext } from "react";
import { addDoc, collection } from 'firebase/firestore';
import db from '../../firebase';
import useForm from "../Cart/useForm";
import { CartContext } from "../Cart/CartContext";

function Checkout() {
    const { cartItems, setCartItems, removeFromCart, calculateTotal } = useContext(CartContext);
    const [orderId, setOrderId] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const savedCartItems = JSON.parse(localStorage.getItem('cartItems'));
        if (savedCartItems) {
            setCartItems(savedCartItems);
        }
    }, []);

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


    return (
        <div className="flex justify-center items-center h-full relative">
            {showModal && (
                <div className="fixed inset-0 z-10 bg-gray-800 opacity-50"></div>
            )}

            <div className="flex flex-col w-full max-w-4xl p-6 space-y-4 sm:p-10 bg-white">
                <h2 className="text-xl font-semibold">Checkout</h2>
                <form onSubmit={handleSubmit} className="w-full">

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
                    <div className="flex justify-end space-x-4 mt-3">
                        <button type="submit" className="px-6 py-2 border rounded-md bg-amber-500 text-white">Checkout</button>
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

export default Checkout;
