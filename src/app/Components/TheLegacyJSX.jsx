"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollSmoother, ScrollTrigger, SplitText } from "gsap/all";
import SkeletonCard from "./SkeletonCard";
import { ChevronRight } from "@deemlol/next-icons";
import { ChevronLeft } from "@deemlol/next-icons";
import Link from "next/link";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, ScrollSmoother);

export default function TheLegacyJSX() {

    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const cardsRef = useRef([]);
    const subTitleRef = useRef([]);
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const filteredProducts = selectedCategory === "all" ? products : products.filter(p => p.category === selectedCategory);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("https://6920bdbb512fb4140bde528f.mockapi.io/products", {
                cache: "no-store"
            })
            const data = await res.json();
            setProducts(data);
        }
        fetchData();
    }, []);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top center",
                end: "+=500",
                toggleActions: "play none none none"
            }
        });
        const titleSplit = new SplitText(titleRef.current, {
            type: "words",
            mask: "words"
        })
        tl.from(titleSplit.words, {
            y: 50,
            opacity: 0,
            duration: 0.5,
            stagger: { each: 0.15 },
            ease: "power3.out"
        })
        products.forEach((_, i) => {
            tl.from(subTitleRef.current[i], {
                y: 50,
                opacity: 0,
                duration: 0.5,
                stagger: { each: 0.05 },
                ease: "power3.out"
            }, "<")
        })


    }, [products]);
    return (
        <section ref={containerRef} className="w-full h-[70vh] sm:h-[70vh] md:h-[90vh] lg:h-screen relative">
            <div className="py-20 px-20">
                <h1 ref={titleRef} className="uppercase text-2xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-center sm:text-center md:text-left lg:text-left">wear the legacy</h1>
                <div className="customBtn flex justify-end relative top-20 gap-2">
                    <div className="custom-prev cursor-pointer">
                        <ChevronLeft size={24} color="#000" className="bg-gray-200 w-7 h-7" />
                    </div>
                    <div className="custom-next cursor-pointer">
                        <ChevronRight size={24} color="#000" className="bg-gray-200 w-7 h-7" />
                    </div>
                </div>
            </div>
            <div className="relative w-full max-w-8xl mx-auto py-10">
                {products.length === 0 ? (
                    <Swiper slidesPerView={3} spaceBetween={20}>
                        {[...Array(6)].map((index) => (
                            <SwiperSlide key={index}>
                                <SkeletonCard />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <div data-lag="0" data-speed="0">
                        <Swiper
                            modules={[Navigation]}
                            navigation={{
                                nextEl: ".custom-next",
                                prevEl: ".custom-prev",
                            }}
                            spaceBetween={10}
                            slidesPerView={3}>

                            {filteredProducts.filter((product) => product.type === "tshirt")
                                .map((product, i) => {
                                    return (
                                        <SwiperSlide key={i}>
                                            <div ref={(card) => cardsRef.current[i] = card} className="h-[300px] sm:h-[300px] md:h-[400px] lg:h-[500px] bg-gray-100 overflow-hidden">
                                                <Link href="/Shop">
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="w-full h-full object-contain cursor-pointer"
                                                    />
                                                </Link>
                                            </div>
                                            <p ref={(subTitle) => subTitleRef.current[i] = subTitle} className="text-center uppercase font-bold">{product.category}</p>
                                        </SwiperSlide>
                                    );
                                })
                            }
                        </Swiper>
                    </div>
                )}

            </div>
        </section>
    );
}