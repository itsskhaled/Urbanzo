"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import Link from "next/link";
import { useRef } from "react";
import Image from "next/image";
import visaCard from "@/Image/visaCard.png";
import googlePay from "@/Image/googlePay.webp";
import paypal from "@/Image/paypal.png";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);
export default function FooterJSX() {
    const contanierRef = useRef(null);
    const titleRef = useRef(null);
    const btnRef = useRef(null);
    const linksRef = useRef([]);
    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: contanierRef.current,
                start: "top 70%",
                toggleActions: "play none none none",
            }
        })
        const titleSplit = new SplitText(titleRef.current, {
            type: "lines",
            mask: "lines"
        });

        tl.from(titleSplit.lines, {
            y: 50,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out"
        });
        tl.from(btnRef.current, {
            y: 50,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out"
        }, "<50%");
        linksRef.current.forEach((link) => {
            const linkSplit = new SplitText(link, {
                type: "chars",
                mask: "chars",
                smartWrap: true
            });
            tl.from(linkSplit.chars, {
                x: 50,
                opacity: 0,
                duration: 0.5,
                ease: "power2.out",
                stagger: { each: 0.05 }
            })
        })
    })
    return (
        <section ref={contanierRef} className="w-full h-[70vh] sm:h-[70vh] md:h-[40vh] lg:h-[40vh]">
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-[1fr_450px] lg:grid-cols-[1fr_450px] items-center pt-20 sm:pt-20 lg:pt-0">
                <div className="px-20">
                    <div className="logo text-center sm:text-center md:text-left lg:text-left">
                        <h1 ref={titleRef} className="uppercase text-6xl">varen</h1>
                        <Link href="/Shop">
                            <button ref={btnRef} className="uppercase border py-2 px-6 rounded-md mt-5 cursor-pointer">Discover</button>
                        </Link>
                    </div>
                </div>
                <div className="links">
                    {
                        [
                            { id: 1, name: "home", href: "/" },
                            { id: 2, name: "shop", href: "/Shop" },
                            { id: 3, name: "New Arrivals", href: "/New" },
                            { id: 4, name: "sales", href: "/Sales   " },
                            { id: 5, name: "about", href: "/AboutUs" },
                        ].map((link, i) => {
                            return (
                                <ul key={i} className="text-center sm:text-center md:text-left lg:text-left">
                                    <Link href={link.href}>
                                        <li className="uppercase my-4"
                                            ref={(link) => linksRef.current[i] = link}>{link.name}</li>
                                    </Link>
                                </ul>
                            );
                        })
                    }
                </div>
            </div>
            <hr className="w-[95%] m-auto text-gray-400" />
            <div className="flex justify-between">   
                    <p className="absolute flex justify-center w-full bottom-10 ">© 2025 Varen — All rights reserved</p>
            </div>
        </section>
    );
}