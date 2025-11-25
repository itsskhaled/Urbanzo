"use client";
import { Star } from "@deemlol/next-icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../Store/CartSlice";


export default function ProductDetailsJSX({ product }) {
    const [count, setCount] = useState(1);
    const [selected, setSelected] = useState(false);
    const dispatch = useDispatch();
    return (
        <section className="w-full min-h-screen pt-25">
            <div className="perant w-full">
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-[150px_1fr] lg:grid-cols-[850px_1fr] gap-2 px-10">
                    <div className="box-1">
                        <div className="relative w-[350px] sm:w-xl md:w-xl lg:w-md h-md">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <div className="box-2 mt-20">
                        <h1 className="text-5xl">{product.name}</h1>
                        <div className="flex my-5">
                            <Star size={24} color="#000" />
                            <Star size={24} color="#000" />
                            <Star size={24} color="#000" />
                            <Star size={24} color="#000" />
                            <Star size={24} color="#000" />
                            <p className="mx-2 capitalize">reviews</p>
                        </div>
                        <div className="flex gap-2">
                            <h1>${product.price}</h1>
                            <h1 className="line-through text-gray-500">${product.oldPrice}</h1>
                            <h1 className="bg-yellow-100 px-1.5 rounded-xl">%{product.sale}</h1>
                        </div>
                        <div className="my-5 w-80 sm:w-80 md:w-100 lg:w-130 capitalize">
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro quas vitae, sed, quo doloribus vel officiis maxime aliquid minima aut sunt, minus necessitatibus fugit saepe illo commodi labore quam nostrum!</p>
                        </div>
                        <div className="flex gap-10 uppercase">
                            <h1>size:</h1>
                            {["m", "l", "xl", "2xl"].map((size, i) => {
                                return (
                                    <p key={i}
                                        onClick={() => setSelected(size)}
                                        className={`cursor-pointer border px-2 rounded-xl
                                        ${selected === size ? "bg-black text-white" : "bg-white text-black"}`}>{size}</p>
                                );
                            })}
                        </div>
                        <div className="flex gap-10 my-5 mb-20">
                            <div className="flex gap-10 border rounded-md px-2 pt-2">
                                <p className="cursor-pointer select-none" onClick={() => dispatch(decreaseQuantity(item.id))}>-</p>
                                <h1>{count}</h1>
                                <p className="cursor-pointer select-none" onClick={() => setCount(count + 1)}>+</p>
                            </div>
                            <button className="uppercase bg-black text-white px-8 py-2 rounded-xl cursor-pointer"
                                onClick={() => dispatch(addToCart({
                                    ...product,
                                    quantity: count,
                                    selectedSize: selected,
                                }))}
                            >add to cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}