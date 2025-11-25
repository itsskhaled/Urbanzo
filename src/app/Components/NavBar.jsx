"use client";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ShoppingCart } from "@deemlol/next-icons";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import Link from "next/link";
import { useSelector } from "react-redux";


gsap.registerPlugin(useGSAP, SplitText);

export default function NavBar() {

    const quantity = useSelector((state) => state.cart.totalQuantity);

    const navBarLinks = [
        { id: 1, name: "home", href: "/" },
        { id: 2, name: "shop", href: "/Shop" },
        { id: 3, name: "New Arrivals", href: "/New" },
        { id: 4, name: "sales", href: "/Sales   " },
        { id: 5, name: "about", href: "/AboutUs" },
    ];

    const [open, setOpen] = useState(false);
    const [isBlur, setIsBlur] = useState(false);

    const menuBarRef = useRef(null);
    const menuRef = useRef(null);
    const linkRef = useRef([]);
    const tl = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) setIsBlur(true);
            else setIsBlur(false);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useGSAP(() => {
        gsap.from(menuBarRef.current, {
            yPercent: -50,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out"
        });

        tl.current = gsap.timeline({ paused: true });

        tl.current.to(menuRef.current, {
            x: 0,
            duration: 0.5,
            ease: "power3.out",
        });

        linkRef.current.forEach((link) => {
            const MenuSplit = new SplitText(link, {
                type: "lines",
                mask: "lines",
            });

            tl.current.from(MenuSplit.lines, {
                y: 50,
                opacity: 0,
                duration: 0.2,
                stagger: { each: 0.02 },
                ease: "power3.out"
            });
        });

    }, []);

    useGSAP(() => {
        if (open) tl.current.play();
        else tl.current.reverse();
    }, [open]);

    return (
        <>
            <div
                ref={menuBarRef}
                className={`fixed w-full bg-white shadow-sm z-50 transition-all duration-300 ${isBlur ? "backdrop-blur-md bg-white/30" : "bg-transparent"
                    }`}
            >
                <div className="flex items-center w-full justify-between px-6 py-3">
                    <h1 className="text-3xl uppercase">Urbanzo</h1>

                    <ul className="hidden md:flex items-center">
                        {navBarLinks.map((item , i) => {

                            return (
                                <Link href={item.href}>
                                    <li
                                        key={i}
                                        className="flex mx-5 text-base sm:text-base md:text-xs lg:text-base uppercase relative cursor-pointer">{item.name}</li>
                                </Link>
                            );
                        })}
                    </ul>
                    <div className="flex items-center gap-5">
                        <Link href="/Cart">
                            <ShoppingCart size={24} color="#000" className="mr-4 cursor-pointer" />
                            {quantity > 0 && (
                                <span className="absolute top-8 right-19 sm:right-19 md:right-7 lg:right-7 bg-red-500 text-white px-2 rounded-full text-sm">
                                    {quantity}
                                </span>
                            )}

                        </Link>
                        {/* MOBILE MENU */}
                        <div className="md:hidden cursor-pointer" onClick={() => setOpen(!open)}>
                            {open ? <div className="text-3xl">✕</div> : <div className="text-3xl">☰</div>}
                        </div>
                    </div>
                </div>
            </div>
            <div
                ref={menuRef}
                className="fixed top-0 left-0 h-screen w-full bg-white z-40 p-10 md:hidden"
                style={{ transform: "translateX(-100%)" }}
            >
                <ul className="flex flex-col text-3xl mt-20 text-center">
                    {navBarLinks.map((item, i) => (
                        <Link href={item.href} key={i} onClick={() => setOpen(false)}>
                            <li
                                ref={(link) => (linkRef.current[i] = link)}
                                className="my-4 uppercase cursor-pointer"
                            >
                                {item.name}
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
        </>
    );
}
