import 'flowbite';
import { PiPants } from "react-icons/pi";
import { TbSmartHome, TbShoe, TbShirtSport, TbShoppingCart } from "react-icons/tb";
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <>
            <nav className="bg-white border-gray-200">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse"> {/* Usar Link en lugar de <a> */}
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/603px-Amazon_logo.svg.png" className="h-8 mt-3" alt="Amazon Logo" />
                    </Link>
                    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-default" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
                            <li>
                                <Link to="/" className="flex items-center py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-amber-400 md:p-0">
                                    <TbSmartHome className="w-5 h-5 mr-2" />
                                    Inicio
                                </Link>
                            </li>
                            <li>
                                <Link to="/categoria/camisas" className="flex items-center py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-amber-400 md:p-0">
                                    <TbShirtSport className="w-5 h-5 mr-2" />
                                    Camisas
                                </Link>
                            </li>

                            <li>
                                <Link to="/categoria/pantalones" className="flex items-center py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-amber-400 md:p-0">
                                    <PiPants className="w-5 h-5 mr-2" />
                                    Pantalones
                                </Link>
                            </li>

                            <li>
                                <Link to="/categoria/calzado" className="flex items-center py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-amber-400 md:p-0">
                                    <TbShoe className="w-5 h-5 mr-2" />
                                    Calzado
                                </Link>
                            </li>

                            <li>
                                <Link to="/cart" className="flex items-center py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-amber-400 md:p-0">
                                    <TbShoppingCart className="w-5 h-5 mr-2" />
                                    Carrito
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        </>
    )
}

export default Navbar;
