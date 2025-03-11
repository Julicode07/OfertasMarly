import React from 'react';
import { ShoppingCart } from "lucide-react";
import { Link } from '@heroui/react';

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 bg-white border-b-2 border-gray-200">
            <div className="mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-4 pl-1">
                    <Link href="/" className="flex items-center">
                        <img src="/BagIcon2.webp" alt="Logo" className="h-8 w-8 mr-2 mb-1" />
                        <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-700 via-blue-500 to-blue-700 text-transparent bg-clip-text drop-shadow-lg transition-transform duration-200 hover:scale-105">
                            Ofertas Marly
                        </h1>
                    </Link>
                </div>


                <nav className="hidden md:flex items-center space-x-6 text-sm font-bold pr-6">
                    <Link href="/inicio" className="text-blue-600 hover:text-blue-700">Inicio</Link>
                    <Link href="/productos" className="text-gray-700 hover:text-blue-600">Productos</Link>
                    <Link href="/categorias" className="text-gray-700 hover:text-blue-600">Categorías</Link>
                    <Link href="/ofertas" className="text-gray-700 hover:text-blue-600">Ofertas</Link>
                    <Link href="/contacto" className="text-gray-700 hover:text-blue-600">Contacto</Link>
                </nav>

                <div className="flex items-center justify-end gap-8 pr-5">
                    <Link to="/cuenta" className="relative hidden md:flex items-center justify-center gap-2">
                        <i className="ri-user-3-line text-base"></i>
                        <span className="text-sm text-gray-800 hover:text-blue-600 font-bold">Cuenta</span>
                    </Link>
                    <button className="px-2 py-2 rounded-xl relative outline-none border-none cursor-pointer bg-slate-200 hover:bg-blue-200">
                        <ShoppingCart className="h-5 w-5 text-gray-700" />
                        <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            3
                        </span>
                    </button>
                </div>
            </div>
        </header>
    )
}