import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import HeroSection from '../modules/MainPage/HeroSection';
import ProductSection from '../modules/Products/ProductSection';
import Categories from '../modules/Categories/Categories';

export default function MainPage() {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 pb-14 md:pb-0">
            <Navbar />
            <HeroSection />
            <Categories />
            <ProductSection />
            <footer className="bg-white hidden md:block">
                <div className="border-t border-gray-200 py-6 text-center text-gray-500 text-sm font-bold">
                    <p>© {new Date().getFullYear()} Ofertas Marly - Todos los derechos reservados.</p>
                </div>

            </footer>
        </div>
    );
}