"use client";

import Image from "next/image";
import photoHero from "@/Image/photoHero.png";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { SplitText } from "gsap/all";
import Link from "next/link";

gsap.registerPlugin(useGSAP, SplitText);
export default function HeroClient() {
    const subTitleRef = useRef(null);
    const titleRef = useRef(null);
    const imageRef = useRef(null);
    const infoRef = useRef(null);
    const btnRef = useRef(null);
    const markRef = useRef(null);
    const yearRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline();

        const subTitleSplit = new SplitText(subTitleRef.current, {
            type: "words",
            mask: "words"
        });
        const titleSplit = new SplitText(titleRef.current, {
            type: "chars",
            mask: "chars",
            smartWrap: true
        });
        const infoSplit = new SplitText(infoRef.current, {
            type: "lines",
            mask: "lines"
        });
        const markSpilt = new SplitText(markRef.current, {
            type: "lines",
            mask: "lines"
        });
        const yearSplit = new SplitText(yearRef.current, {
            type: "lines",
            mask: "lines"
        });


        tl.from(subTitleSplit.words, {
            y: -50,
            opacity: 0,
            duration: 0.2,
            stagger: { each: 0.05 },
            ease: "power3.out"
        });
        tl.from(titleSplit.chars, {
            x: -50,
            opacity: 0,
            duration: 0.5,
            stagger: { each: 0.05 },
            ease: "power3.out"
        });
        tl.from(imageRef.current, {
            scale: 2,
            opacity: 0,
            duration: 0.5,
            ease: "power3.out"

        }, "<50%");
        tl.from(infoSplit.lines, {
            y: 50,
            rotate: 15,
            opacity: 0,
            duration: 0.2,
            stagger: { each: 0.05 },
            ease: "power3.out"
        })
        tl.from(btnRef.current, {
            y: 50,
            opacity: 0,
            duration: 0.2,
            ease: "power3.out"
        }, "<50%")
        tl.from(markSpilt.lines, {
            y: -50,
            opacity: 0,
            duration: 0.5,
            ease: "power3.out"
        })
        tl.from(yearSplit.lines, {
            y: -50,
            opacity: 0,
            duration: 0.5,
            ease: "power3.out"
        }, "<50%")
    })
    return (
        <section className="w-full min-h-screen relative bg-[linear-gradient(45deg,#000,#252525,#9C9894)] overflow-hidden ">
            <div className="text-white w-full h-screen flex flex-col justify-center items-center">
                <h1 ref={subTitleRef} className="flex justify-start w-[95%] sm:w-[95%] md:w-[82%] lg:w-[78%] absolute top-60 sm:top-60 md:top-45 lg:top-40 text-xs sm:text-xs md:text-md lg:text-lg uppercase">onyx tee`s remember</h1>
                <h1 data-lag="0.2" ref={titleRef} className="text-7xl sm:text-7xl md:text-[10rem] lg:text-[18rem] uppercase relative mb-35 text-lime-400">Urbanzo</h1>
            </div>
            <div className="absolute inset-0 flex justify-center items-end z-20 pointer-events-none">
                <div ref={imageRef} className="BoxPhoto relative w-[850px] h-[600px] sm:h-[600px] md:h-[750px] lg:h-[820px]">
                    <Image src={photoHero} alt="You have a weak internet connection 😊" fill className="w-screen h-screen object-cover" />
                </div>
            </div>
            <div className="BoxInfo absolute inset-0 flex items-end justify-between h-[85%] w-[95%] left-5 text-white px-5 mt-0 sm:mt-0 lg:mt-15 z-21">
                <div className="left w-80">
                    <p ref={infoRef} className="capitalize mb-5 text-xs sm:text-xs md:text-base lg:text-xl">Your everyday style shouldn’t be ordinary. Discover minimal designs with bold energy—crafted for your fast-paced life</p>
                    <Link href="/AboutUs"><button ref={btnRef} className="uppercase bg-white py-3 px-6 text-black font-bold rounded-md text-xs sm:text-xs md:text-base lg:text-base cursor-pointer">discover</button></Link>
                </div>
                <div className="rigth text-4xl sm:text-4xl md:text-6xl lg:text-9xl">
                    <h1 ref={markRef} className="capitalize">collection</h1>
                    <h1 ref={yearRef} className="text-right text-5xl sm:text-5xl md:text-7xl lg:text-9xl text-transparent [-webkit-text-stroke:1px_white]">2025</h1>
                </div>
            </div>
        </section>
    );
}