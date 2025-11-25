"use client";
import { Provider } from "react-redux";
import { Store } from "./Store/Store";
import { useEffect } from "react";
import { loadCartFromStorage } from "./Store/CartSlice";

export function Providers({ children }) {
    useEffect(() => {
    const data = localStorage.getItem("cartData");
    if (data) {
      Store.dispatch(loadCartFromStorage(JSON.parse(data)));
    }
  }, []);

  return <Provider store={Store}>{children}</Provider>;
}
