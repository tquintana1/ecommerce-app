import { useEffect } from "react";
import { collection, getDocs, query, where } from 'firebase/firestore';
import db from '../firebase';

export const ItemList = (categoryId, setProductos, setCartItems) => {
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
                // Actualizar el estado de cartItems después de cargar los productos
                const savedCartItems = JSON.parse(localStorage.getItem('cartItems'));
                if (savedCartItems) {
                    setCartItems(savedCartItems);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchProductos();
    }, [categoryId, setProductos, setCartItems]);
};
