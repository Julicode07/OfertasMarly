import React from "react";
export default function Categories() {
    return (
        <section id="categorias" className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">Explora por Categorías</h2>


                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    <a href="" className="group relative overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-md transition-all">
                        <div className="aspect-square overflow-hidden">
                            <img alt="Electrónica" className="object-cover w-full h-full transition-transform group-hover:scale-105" src="/images/Categories/electronica.jpg?height=200&amp;width=200" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-4 text-white"><h3 className="font-medium text-lg">Electrónica</h3><p className="text-sm text-white/80">120 productos</p>
                        </div>
                    </a>
                    <a href="" className="group relative overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-md transition-all">
                        <div className="aspect-square overflow-hidden">
                            <img alt="Ropa" className="object-cover w-full h-full transition-transform group-hover:scale-105" src="/images/Categories/ropa.jpg?height=200&amp;width=200" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-4 text-white"><h3 className="font-medium text-lg">Ropa</h3><p className="text-sm text-white/80">85 productos</p>
                        </div>
                    </a>
                    <a href="" className="group relative overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-md transition-all">
                        <div className="aspect-square overflow-hidden">
                            <img alt="Hogar" className="object-cover w-full h-full transition-transform group-hover:scale-105" src="/images/Categories/hogar.jpg?height=200&amp;width=200" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-4 text-white"><h3 className="font-medium text-lg">Hogar</h3><p className="text-sm text-white/80">64 productos</p>
                        </div>
                    </a>
                    <a href="" className="group relative overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-md transition-all">
                        <div className="aspect-square overflow-hidden">
                            <img alt="Belleza" className="object-cover w-full h-full transition-transform group-hover:scale-105" src="/images/Categories/belleza.jpg?height=200&amp;width=200" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-4 text-white"><h3 className="font-medium text-lg">Belleza</h3><p className="text-sm text-white/80">42 productos</p>
                        </div>
                    </a>
                </div>
            </div>
        </section>
    )
}