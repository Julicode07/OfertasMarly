import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import HeroSection from '../modules/MainPage/HeroSection';
import ProductSection from '../components/Products/ProductSection';
import Categories from '../components/Categories/Categories';

export default function MainPage() {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            <Navbar />
            <HeroSection />
            <Categories />
            <ProductSection />
            {/* Footer */}
            <footer className="py-6 bg-gray-900 text-white text-center">
                <p className="text-lg">© {new Date().getFullYear()} Ofertas Marly - Todos los derechos reservados.</p>
            </footer>
        </div>
    );
}