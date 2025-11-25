"use client";
import { useSelector, useDispatch } from "react-redux";
import { decreaseQuantity, increaseQuantity, removeFromCart } from "../Store/CartSlice";
import { Plus } from "@deemlol/next-icons";
import { Minus } from "@deemlol/next-icons";
import { Delete } from "@deemlol/next-icons";
import Link from "next/link";

export default function CartJSX() {
  const dispatch = useDispatch();
  const { cartItems, totalAmount } = useSelector((state) => state.cart);

  return (
    <section className="min-h-screen w-full relative bg-gray-100">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-[1fr_200px] lg:grid-cols-[1fr_400px] py-30 px-10 gap-5">
        <div className="box-1 bg-white py-10 px-10 text-3xl capitalize rounded-2xl">
          <h1>my cart</h1>
          {cartItems.length === 0 && (
            <div className="my-10 text-center">
              <h1 className="my-4 uppercase">The basket is empty</h1>
              <Link href="/Shop">
                <button className="capitalize text-sm border px-4 py-2 rounded-md cursor-pointer">Go to shop</button>
              </Link>
            </div>
          )}
          {cartItems.map((item) => (
            <div key={item.id} className="flex my-10">
              <div className="w-[350px] h-[250px]">
                <img src={item.image} width={350} height={250} className="h-full w-full object-cover" />
              </div>
              <div>
                <div className="flex flex-row w-full gap-5 mt-5 pl-5 items-center">
                  <h1>{item.name}</h1>
                  <p className="ml-100 cursor-pointer" onClick={() => dispatch(removeFromCart({
                    id: item.id,
                    selectedSize: item.selectedSize
                  }))}>
                    <Delete size={24} color="#E60000" />
                  </p>
                </div>
                <div className="pl-5 my-5">
                  <p className="text-sm">Size : {item.selectedSize}</p>
                </div>
                <div className="flex text-sm gap-5 items-center py-5 pl-5 mt-15">
                  <button className="border border-gray-400 rounded-md py-2 px-2 cursor-pointer select-none" onClick={() => dispatch(decreaseQuantity({
                    id: item.id,
                    selectedSize: item.selectedSize
                  }))}><Minus size={15} color="#000" /></button>
                  <p>{item.quantity}</p>
                  <button className="border border-gray-400 rounded-md py-2 px-2 cursor-pointer select-none" onClick={() => dispatch(increaseQuantity({
                    id: item.id,
                    selectedSize: item.selectedSize
                  }))}><Plus size={15} color="#000" /></button>
                </div>
                <div className="pl-5 text-sm">
                  Price : ${item.totalPrice} USD
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="box-2 bg-white h-70 rounded-2xl">
          <div className="pt-5 mx-10">
            <h1 className="capitalize text-2xl pb-5">order summary</h1>
            <div className="flex justify-between">
              <h1>Total : </h1>
              <h1 className="ml-5 mb-5">${totalAmount} USD</h1>
            </div>
            <hr className="w-[95%] m-auto py-5 text-gray-300" />
          </div>
          <div className="flex justify-center">
            <button className="capitalize bg-black text-white px-6 py-3 rounded-md font-bold cursor-not-allowed opacity-60" disabled>proceed to checkout</button>
          </div>
        </div>
      </div>
    </section>
  );
}