"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";


import ProductCard from "@/components/product/ProductCard";
import { Product } from "@/data/products";

export default function ApiProducts() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch(
                    "https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/products.json"
                );

                const data = await res.json();

                // Map API products to our local Product interface
                const mappedProducts: Product[] = data.slice(0, 8).map((apiProd: any) => ({
                    id: `api-${apiProd.id}`,
                    name: apiProd.name || apiProd.title || "Product",
                    slug: `api-${apiProd.id}`,
                    price: (apiProd.priceCents / 100) || apiProd.price || 0,
                    rating: apiProd.rating?.stars || apiProd.rating?.rate || 4.5,
                    reviewCount: apiProd.rating?.count || Math.floor(Math.random() * 200),
                    description: apiProd.description,
                    images: [apiProd.image],
                    image: apiProd.image,
                    category: apiProd.category,
                    inStock: true,
                    stockCount: 50,
                    details: ["API Product", "Fetched dynamically", "Free shipping"],
                    specs: [{ name: "Category", value: apiProd.category }],
                    vendor: "API Partner"
                }));

                setProducts(mappedProducts);
            } catch (error) {
                console.error(error);
            }
        }

        fetchProducts();
    }, []);

    return (
        <section className="space-y-4 px-1 sm:px-6 lg:px-8 mt-8 ">
            <div className="flex items-end justify-between">
                <div className="text-left">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                        New Collection
                    </span>

                    <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground mt-2">
                        API Products
                    </h2>
                </div>

                <Link
                    href="/shop"
                    className="flex shrink-0 items-center gap-1 whitespace-nowrap text-xs font-bold text-foreground hover:text-primary transition-colors"
                >
                    Shop all
                    <ArrowRight className="h-3.5 w-3.5" />
                </Link>
            </div>

            <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory hide-scrollbar">
                {products.map((product) => (
                    <div key={product.id} className="min-w-[180px] sm:min-w-[220px] flex-shrink-0 snap-start h-full">
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </section>
    );
}