"use client";

import aboutPhoto from "@/Image/photoHero.png"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollToPlugin, ScrollTrigger, SplitText } from "gsap/all";
import Image from "next/image";
import { useRef } from "react";


gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, ScrollToPlugin)
export default function AboutUs() {
    const containerRef = useRef(null);
    const containerInfoRef = useRef(null);
    const photoRef = useRef(null);
    const bgGreenRef = useRef(null);
    const titleRef = useRef(null);
    const titleInfoRef = useRef(null);
    useGSAP(() => {
        const tl = gsap.timeline();
        const titleSplit = new SplitText(titleRef.current, {
            type: "chars",
            mask: "chars",
            smartWrap: true
        })
        const titleInfoSplit = new SplitText(titleInfoRef.current, {
            type: "lines",
            mask: "lines"
        })
        tl.from(titleSplit.chars, {
            y: 50,
            opacity: 0,
            ease: "power3.out",
            duration: 0.8,
            stagger: { each: 0.06 }
        })

        tl.from(photoRef.current, {
            opacity: 0,
            duration: 0.5
        }, "<50%")

        tl.to(photoRef.current, {
            scale: 20,
            ease: "power2.inOut",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
            }
        });
        tl.fromTo(bgGreenRef.current, { opacity: 0, scale: 0 }, {
            opacity: 1,
            scale: 100,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "40% botton",
                scrub: true
            }
        })

        ScrollTrigger.create({
            trigger: containerRef.current,
            start: "bottom 90%",
            onEnter: () => {
                gsap.to(window, {
                    duration: 0.5,
                    scrollTo: containerInfoRef.current,
                    ease: "power4.inOut"
                });
            },
            onLeaveBack: () => {
                gsap.to(window, {
                    duration: 0.5,
                    scrollTo: containerRef.current,
                    ease: "power4.inOut"
                })
            }
        });

        tl.from(containerInfoRef.current, {
            opacity: 0,
            scrollTrigger: {
                trigger: containerInfoRef.current,
                start: "top bottom"
            }
        })

        gsap.from(titleInfoSplit.lines, {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            stagger: { each: 0.5 },
            scrollTrigger: {
                trigger: containerInfoRef.current,
                start: "top center",
                end: "+=500",
                toggleActions: "play none none none",
            }
        })
    });

    return (
        <>
            <section ref={containerRef} className="h-[300vh] w-full relative overflow-hidden">
                <h1 ref={titleRef} className="uppercase text-7xl sm:text-7xl md:text-[10rem] lg:text-[17rem] mt-50 text-center">About us</h1>
                <div ref={photoRef} className="absolute top-110 sm:top-110 md:top-10 lg:top-0 flex justify-center scale-200 sm:scale-200 lg:scale-100 w-full ">
                    <Image src={aboutPhoto} alt="" />
                    <div ref={bgGreenRef} className="absolute w-full h-screen bg-lime-300" />
                </div>
            </section>
            <section ref={containerInfoRef} className="h-screen w-full relative bg-lime-300">
                <h1
                    ref={titleInfoRef}
                    className="pt-80 sm:pt-80 md:pt-70 lg:pt-50 text-center text-4xl sm:text-4xl md:text-5xl lg:text-9xl leading-tight capitalize font-extrabold"
                >
                    We create pieces that speak your presence before you do
                </h1>

            </section>
        </>
    );
}