import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from 'firebase/firestore';
import db from '../firebase';

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
        <main className="item-detail">
            <h1 style={{ textTransform: "capitalize" }}>
                {producto.name}
            </h1>
            <section style={{ display: "flex" }}>
                <section className="pokemon-info">
                    <p>Description: {producto.description}</p>
                    <p>Stock: {producto.stock}</p>
                    <p>Price: {producto.price}</p>
                    <p>Category: {producto.categoria}</p>
                </section>
            </section>
        </main>
    );
}

export default ItemDetailContainer;
