import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import productosJson from "../data/productos.json";

function asyncMock(categoryId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (categoryId === undefined) {
                resolve(productosJson);
            } else {
                const productosFiltrados = productosJson.filter((item) => {
                    return item.categoria === categoryId;
                });

                resolve(productosFiltrados);
            }
        }, 2000);
    });
}

function ItemListContainer() {
    const { categoryId } = useParams();
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        asyncMock(categoryId).then((res) => setProductos(res));
    }, [categoryId]);

    return (
        <main>
            <section>
                <div className="relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-24 max-w-7xl">
                    <div className="grid w-full grid-cols-1 gap-6 mx-auto lg:grid-cols-3">
                        {productos.map((producto) => (
                            <Link key={producto.id} to={`/item/${producto.id}`}>
                                <div className="p-6">
                                    <img className="object-cover object-center w-full mb-8 lg:h-48 md:h-36 rounded-xl" src={producto.img} alt={producto.name} />
                                    <div className="inline-flex justify-between w-full">
                                        <h1 className="mb-8 text-xl font-semibold leading-none tracking-tighter text-neutral-600">{producto.name}</h1>
                                        <span>${producto.price}</span>
                                    </div>
                                    <p className="mx-auto text-base font-medium leading-relaxed text-gray-500">{producto.description}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}

export default ItemListContainer;
