// ItemCount.js
import React, { useState } from "react";

function ItemCount({ onAdd }) {
    const [quantity, setQuantity] = useState(1);

    const handleAdd = () => {
        onAdd(quantity);
    };

    return (
        <div>
            <label htmlFor="number-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select a number:</label>
            <input
                type="number"
                id="number-input"
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="90210"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                required
            />
            <button onClick={handleAdd} className="text-white mt-4 bg-amber-500 hover:bg-amber-600 focus:ring-4 focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center me-0 mb-2 ml-1	 dark:bg-amber-400 dark:hover:bg-amber-500 focus:outline-none dark:focus:ring-amber-600 w-full">Añadir al carrito</button>

        </div>
    );
}

export default ItemCount;
