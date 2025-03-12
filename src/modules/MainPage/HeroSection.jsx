
import React from "react";
export default function HeroSection() {

    const phoneNumber = "573028543435";

    const message = `👋 Hola Marly ...`;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    return (
        <main>
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-500"></div>

                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
                    <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white"></div>
                    <div className="absolute bottom-10 left-1/4 w-60 h-60 rounded-full bg-white"></div>
                    <div className="absolute top-1/3 right-1/4 w-20 h-20 rounded-full bg-white"></div>
                </div>

                <div className="container mx-auto px-4 py-16 md:py-14 relative">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="text-white space-y-3">
                            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-medium">
                                Bienvenidos a Ofertas Marly
                            </div>

                            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                                Productos accesibles para toda la familia
                            </h2>

                            <p className="text-white/90 text-lg">
                                Descubre increíbles ofertas en artículos para el hogar y cuidado personal. Productos de calidad, precios irresistibles y todo lo que necesitas para hacer tu día a día más cómodo.

                            </p>

                            <div className="flex flex-wrap gap-6 pt-2">
                                <div className="flex items-center gap-2">
                                    <div className="bg-white/20 w-10 h-10 flex items-center justify-center rounded-full">
                                        📦
                                    </div>
                                    <span>Productos seleccionados</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="bg-white/20 w-10 h-10 flex items-center justify-center rounded-full">
                                        <i className="ri-customer-service-2-line text-white text-xl"></i>
                                    </div>
                                    <span>Atención personalizada</span>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <a href="#productos" className="bg-white text-blue-700 hover:bg-gray-100 font-semibold px-6 py-3 rounded-lg block sm:flex items-center cursor-pointer group">
                                    Productos destacados
                                    <i className="ri-arrow-right-line text-xl ml-2 transition-transform duration-300 ease-in-out group-hover:rotate-90"></i>
                                </a>
                                <a href={whatsappUrl} className="border border-white text-white hover:bg-white/10 font-semibold px-6 py-3 rounded-lg block sm:flex items-center cursor-pointer">
                                    Contactanos
                                    <i className="ri-phone-fill text-xl ml-2"></i>
                                </a>
                            </div>
                        </div>

                        <div className="relative hidden md:block">
                            <div className="relative flex items-center justify-center w-auto h-[400px]">
                                <img
                                    src="/Launch.png"
                                    alt="Nuestros productos"
                                    className="absolute top-5 left-0 z-0 w-auto h-[300px] object-cover"
                                    loading="lazy"
                                />
                                <img
                                    src="/Product.png"
                                    alt="Nuestros productos"
                                    className="absolute top-20 left-64 z-10 hidden lg:block w-auto h-[300px] object-cover"
                                    loading="lazy"
                                />
                            </div>

                            <div className="absolute bottom-0 left-16 z-20 bg-white p-3 rounded-lg shadow-lg">
                                <div className="flex items-center gap-2">
                                    <div className="bg-blue-500 w-8 h-8 flex items-center justify-center rounded-full">
                                        📦
                                    </div>
                                    <div>
                                        <div className="text-gray-900 font-medium text-sm">Productos nuevos</div>
                                        <div className="text-gray-500 text-xs">Catálogo actualizado</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}