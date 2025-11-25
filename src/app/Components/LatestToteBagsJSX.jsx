"use client";

import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SkeletonCard from "./SkeletonCard";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, SplitText } from "gsap/all";
import { ChevronRight } from "@deemlol/next-icons";
import { ChevronLeft } from "@deemlol/next-icons";
import Link from "next/link";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)
export default function LatestToteBagsJSX() {
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const cardsRef = useRef([]);
    const showAllRef = useRef(null);

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("https://6920bdbb512fb4140bde528f.mockapi.io/products", {
                cache: "no-store"
            })
            const data = await res.json()
            setProducts(data)
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
       
    }, []);
    return (
        <section ref={containerRef} className="w-full h-screen py-10">
            <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row w-full justify-between items-center py-20 px-20">
                <h1 ref={titleRef} className="uppercase text-2xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-center sm:text-center md:text-left lg:text-left">latest tote + bags + backpacks</h1>
                <div className="customBtn flex justify-end items-center relative top-20 gap-2">
                    <Link href="/Shop"><h1 ref={showAllRef} className="uppercase underline font-bold text-xs mr-5">show all</h1></Link>
                    <div className="custom-prev3 cursor-pointer">
                        <ChevronLeft size={24} color="#000" className="bg-gray-200 w-7 h-7" />
                    </div>
                    <div className="custom-next3 cursor-pointer">
                        <ChevronRight size={24} color="#000" className="bg-gray-200 w-7 h-7" />
                    </div>
                </div>
            </div>
            <div className="relative w-full max-w-8xl mx-auto py-10">
                {products.length === 0 ? (
                    <Swiper slidesPerView={4} spaceBetween={20}>
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
                                nextEl: ".custom-next3",
                                prevEl: ".custom-prev3"
                            }}
                            spaceBetween={10}
                            slidesPerView={4}>
                            {products.filter((product) => product.type === "bag")
                                .map((product, i) => {
                                    return (
                                        <SwiperSlide key={i}>
                                            <div ref={(card) => cardsRef.current[i] = card} className="h-[200px] sm:h-[200px] md:h-[400px] lg:h-[500px] bg-gray-100 overflow-hidden">
                                                <Link href={`/TheLegacy/${product.id}`}>
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="w-full h-full object-contain cursor-pointer"
                                                    />
                                                </Link>
                                            </div>
                                            <div>
                                                <p className="text-center text-xs sm:text-xs md:text-base lg:text-base uppercase">{product.name?.slice(0, 10)}...</p>
                                                <p className="text-center text-xs sm:text-xs md:text-base lg:text-base uppercase">${product.price} USD</p>
                                            </div>
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