import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from 'firebase/firestore';
import db from '../firebase';
import { Toaster } from "sonner";
import ItemDetail from "./ItemDetail";

function ItemDetailContainer() {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);

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
            <ItemDetail producto={producto} />
        </main>
    );
}

export default ItemDetailContainer;
