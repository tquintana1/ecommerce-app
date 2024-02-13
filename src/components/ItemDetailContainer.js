import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import productosJson from "../data/productos.json";

function asyncMock(productId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const producto = productosJson.find(item => item.id === parseInt(productId));
            resolve(producto);
        }, 2000);
    });
}

function ItemDetailContainer() {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);

    useEffect(() => {
        asyncMock(id).then((res) => setProducto(res));
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
