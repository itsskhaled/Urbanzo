"use client";

import { useEffect, useRef, useState } from "react";
import SkeletonCard from "./SkeletonCard";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";

gsap.registerPlugin(useGSAP, SplitText);
export default function NewJSX() {
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const getNewProduct = async () => {
            const res = await fetch("https://6920bdbb512fb4140bde528f.mockapi.io/products", {
                cache: "no-store"
            })
            const data = await res.json();
            setProducts(data)
        }
        getNewProduct();
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
                    <h1 ref={titleRef} className="text-4xl uppercase">New Arrivals</h1>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-[85%] gap-5 m-auto">

                    {products.length === 0 ? (
                        [...Array(6)].map((_, i) => (
                            <SkeletonCard key={i} />
                        ))
                    ) : (
                        products.filter((product) => product.status === "new")
                            .map((product, i) => {
                                return (
                                    <Link href={`New/${product.id}`} key={i}>
                                        <div className="relative h-100 overflow-hidden group cursor-pointer">
                                            {product.status !== "" && (
                                                <p className="absolute py-0.5 px-2 rounded-sm text-white uppercase text-xs bg-green-500">{product.status}</p>
                                            )}
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
                                )
                            })
                    )}
                </div>
            </div>
        </section>
    );
}
