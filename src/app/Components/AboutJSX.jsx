"use client";
import Image from "next/image";
import photoBlack from "@/Image/photoHero.png";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useRef } from "react";
import Link from "next/link";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

export default function AboutJSX() {

    const containerRef = useRef(null);
    const imageRef = useRef(null);
    const infoRef = useRef(null);
    const btnRef = useRef(null);

    useGSAP(() => {
        const collection = gsap.utils.toArray(".collection");
        const theBlackLand = gsap.utils.toArray(".theBlackLand");

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top center",
                end: "+=500",
                toggleActions: "play none none none"
            }
        });

        const collectionSplit = new SplitText(collection, {
            type: "lines",
            mask: "lines"
        });
        const theBlackLandSplit = new SplitText(theBlackLand, {
            type: "words",
            mask: "words",
            smartWrap: true
        });
        const infoAboutSplit = new SplitText(infoRef.current, {
            type: "lines",
            mask: "lines"
        })
        tl.from(containerRef.current, {
            opacity: 0,
            ease: "power3.out",
            duration: 0.2
        })
        tl.from(collectionSplit.lines, {
            y: 50,
            opacity: 0,
            ease: "power2.out",
            duration: 0.5,
            stagger: { each: 0.05 }
        });
        tl.from(imageRef.current, {
            opacity: 0,
            ease: "power2.out",
            duration: 0.5
        }, "<50%")
        tl.from(theBlackLandSplit.words, {
            y: 50,
            opacity: 0,
            ease: "power2.out",
            duration: 0.5,
            stagger: { each: 0.10 }
        })
        tl.from(infoAboutSplit.lines, {
            y: 50,
            opacity: 0,
            ease: "power2.out",
            duration: 0.5,
            stagger: { each: 0.05 }
        })
        tl.from(btnRef.current, {
            y: 50,
            opacity: 0,
            ease: "power2.out",
            duration: 0.5,
        })

    });

    return (
        <section ref={containerRef} className="w-full h-screen relative py-30">
            <div className="w-[90%] h-[600px] m-auto bg-[radial-gradient(circle_at_center,#A3A3A3,#C3C3C3,#DEDEDE)] flex items-center justify-center">
                <div className="collection absolute text-right right-15 sm:right-15 md:right-40 lg:right-40 mb-80 text-2xl uppercase">
                    <h1 className="text-5xl font-bold">Urbanzo</h1>
                    <h1 className="text-3xl">collection</h1>
                    <h1>2025</h1>
                </div>
                <span className="theBlackLand uppercase text-3xl sm:text-3xl md:text-4xl lg:text-5xl absolute left-10 sm:left-10 md:left-30 lg:left-37 mb-20 sm:mb-40 md:mb-50 lg:mb-60 text-white">the</span>
                <div className="theBlackLand absolute flex flex-row uppercase text-4xl sm:text-4xl md:text-[5rem] lg:text-[11rem] gap-20 sm:gap-20 md:gap-50 lg:gap-60 text-white">
                    <h1>black</h1>
                    <h1 className="z-50">land</h1>
                </div>
                <div ref={imageRef} className="relative w-[500px] sm:w-[500px] md:w-[600px] lg:w-[700px] h-[400px] sm:h-[400px] md:h-[500px] lg:h-[600px] top-25 sm:top-25 md:top-0 lg:top-0">
                    <Image
                        src={photoBlack}
                        alt="black land image"
                        fill
                        className="object-cover filter drop-shadow-[10px_10px_40px_rgba(0,0,0,0.8)]"
                    />
                </div>
                <div className="infoAbout absolute flex w-[80%] h-[60%] justify-between items-end">
                    <p ref={infoRef} className="capitalize w-120 text-xs sm:text-xs md:text-base lg:text-base ">Explore a bold fusion of style and performance designed to elevate your everyday look with confidence and comfort</p>
                    <Link href="/AboutUs"><button ref={btnRef} className="uppercase bg-black text-white py-2 px-5 rounded-md text-xs sm:text-xs md:text-base lg:text-base cursor-pointer">discover more</button></Link>
                </div>
            </div>
        </section>
    );
}
