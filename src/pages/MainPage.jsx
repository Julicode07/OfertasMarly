import React from 'react';
import { ShoppingCart } from "lucide-react";
import { Button, Input, Link } from '@nextui-org/react';
import SearchInput from '../components/SearchInput';

export default function MainPage() {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
                <div className="mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-4 pl-4 pr-8">
                        <Link href="/" className="flex items-center">
                            <h1 className="text-3xl font-extrabold text-blue-700">
                                Ofertas Marly
                            </h1>
                        </Link>
                    </div>

                    <nav className="hidden md:flex items-center space-x-6 text-sm font-bold">
                        <Link href="/#inicio" className="text-blue-600 hover:text-blue-700">Inicio</Link>
                        <Link href="/productos" className="text-gray-700 hover:text-blue-600">Productos</Link>
                        <Link href="/categorias" className="text-gray-700 hover:text-blue-600">Categorías</Link>
                        <Link href="/ofertas" className="text-gray-700 hover:text-blue-600">Ofertas</Link>
                        <Link href="/contacto" className="text-gray-700 hover:text-blue-600">Contacto</Link>
                    </nav>

                    <div className="flex items-center gap-2">
                        <div className="relative hidden md:block w-64">
                            <SearchInput />
                        </div>
                        <button className="px-2 py-2 rounded-xl relative outline-none border-none bg-blue-200">
                            <ShoppingCart className="h-6 w-6 text-gray-700" />
                            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                3
                            </span>
                        </button>
                    </div>
                </div>
            </header>
        </div>
    );
}
