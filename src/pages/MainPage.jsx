import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import HeroSection from '../components/HeroSection/HeroSection';

export default function MainPage() {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            <Navbar />
            <HeroSection />
            <footer className="py-6 bg-gray-900 text-white text-center">
                <p className="text-lg">© {new Date().getFullYear()} Ofertas Marly - Todos los derechos reservados.</p>
            </footer>
        </div>
    );
}