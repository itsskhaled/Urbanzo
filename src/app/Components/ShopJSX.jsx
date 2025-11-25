"use client";

import { useEffect, useRef, useState } from "react";
import SkeletonCard from "./SkeletonCard";
import Link from "next/link";
import { Filter } from "@deemlol/next-icons";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";

gsap.registerPlugin(useGSAP, SplitText);
export default function ShopJSX() {
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const [products, setProducts] = useState([]);
    const Categories = ["all", "men", "women"];
    const [selectedCategory, setSelectedCategory] = useState("all");
    const filteredProducts = selectedCategory === "all" ? products : products.filter(p => p.category === selectedCategory);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("https://6920bdbb512fb4140bde528f.mockapi.io/products", {
                cache: "no-store"
            });
            const data = await res.json();
            setProducts(data);
        };
        fetchData();
    }, []);

    useGSAP(() => {
        const tl = gsap.timeline();
        const titleSplit = new SplitText(titleRef.current, {
            type: "chars",
            mask: "chars"
        });
        tl.from(titleSplit.chars, {
            y: 50,
            opacity: 0,
            ease: "power3.out",
            duration: 0.7,
            stagger: { each: 0.08 }
        });
    })

    return (
        <section ref={containerRef} className="min-h-screen w-full py-20">
            <div>
                <div className="flex w-full justify-center py-10">
                    <h1 ref={titleRef} className="text-5xl uppercase">shop</h1>
                </div>
                <div className="flex justify-center pb-10">
                    <div className="flex items-center mr-2">
                        <Filter size={24} color="#000" />
                        <h1 className="flex text-xs sm:text-xs md:text-base lg:text-base ml-2">Filter :</h1>
                    </div>
                    {Categories.map((cat, i) => {
                        return (
                            <ul key={i}>
                                <li
                                    onClick={() => setSelectedCategory(cat)}
                                    className="uppercase py-1 px-4 rounded-md cursor-pointer hover:bg-black hover:text-white translate duration-300 text-xs sm:text-xs md:text-base lg:text-base">{cat}</li>
                            </ul>
                        );
                    })}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-[85%] gap-5 m-auto">

                    {products.length === 0 ? (
                        [...Array(6)].map((_, i) => (
                            <SkeletonCard key={i} />
                        ))
                    ) : (
                        filteredProducts.map((product, i) => (
                            <Link href={`Shop/${product.id}`}>
                                <div key={i} className="relative h-100 overflow-hidden group cursor-pointer">
                                    <img
                                        src={product.image}
                                        alt=""
                                        className="h-full w-full object-cover"
                                    />

                                    <div className="

                                    absolute inset-0 
                                    bg-linear-to-t from-black/70 to-transparent
                                    opacity-100 sm:opacity-100 md:opacity-100 lg:opacity-0 group-hover:opacity-100
                                    transition-all duration-300 
                                    flex flex-col justify-end p-4 text-white
                                ">
                                        <h1 className="capitalize">{product.name}</h1>
                                        <h1>${product.price} USD</h1>
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}

                </div>
            </div>
        </section>
    );
}
