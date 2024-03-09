import { toast } from 'sonner'

export const addToCart = (producto, cartItems, setCartItems) => {
    if (!producto) return;
    const updatedCartItems = [...cartItems, producto];
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    toast.success('Producto añadido')
};