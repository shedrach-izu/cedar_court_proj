"use client";

import React from "react";
import {
  Minus,
  Plus,
  ShoppingCart,
  X,
} from "lucide-react";

import { useCart } from "@/context/CartContext";
import Link from "next/link"

const CartSlide = () => {
  const {
    cartItems,
    cartOpen,
    setCartOpen,
    removeItem,
    updateQty,
  } = useCart();

  console.log("CART ITEMS:", cartItems)

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const service = subtotal * 0.1;

  const total = subtotal + service;

  const onCheckout = () => {
    console.log("Proceeding to checkout...");
  };

  return (
    <>
      {cartOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40"
          onClick={() => setCartOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-96 max-w-full bg-[#161310] border-l border-[rgba(196,149,74,0.15)] z-50 flex flex-col transform transition-transform duration-300 ease-in-out ${
          cartOpen
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[rgba(196,149,74,0.12)]">

          <div>
            <h2 className="font-['Fraunces'] text-xl text-[#ede4d4]">
              Your Order
            </h2>

            <p className="text-xs font-['DM_Mono'] text-[#8a7d6a] mt-0.5">
              {cartItems.length} item
              {cartItems.length !== 1 ? "s" : ""}
            </p>
          </div>

          <button
            onClick={() => setCartOpen(false)}
            className="w-8 h-8 flex items-center justify-center text-[#8a7d6a] hover:text-[#ede4d4]"
          >
            <X size={18} />
          </button>

        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">

          {cartItems.length === 0 ? (

            <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-16">

              <div className="w-16 h-16 border border-[rgba(196,149,74,0.2)] flex items-center justify-center">
                <ShoppingCart
                  size={24}
                  className="text-[#8a7d6a]"
                />
              </div>

              <p className="text-[#8a7d6a] font-['Jost']">
                Your cart is empty
              </p>

              <button
                onClick={() => setCartOpen(false)}
                className="text-[#c4954a] text-sm font-['Jost'] hover:underline"
              >
                Browse our menu
              </button>

            </div>

          ) : (

            cartItems.map((item) => (

              <div
                key={item.id}
                className="flex gap-3 border-b border-[rgba(196,149,74,0.08)] pb-4"
              >

                <img
                  src={item.img}
                  alt={item.name}
                  className="w-16 h-16 object-cover bg-[#0c0a08] shrink-0"
                />

                <div className="flex-1 min-w-0">

                  <p className="text-sm font-['Jost'] text-[#ede4d4]">
                    {item.name}
                  </p>

                  <p className="text-xs text-[#8a7d6a] mt-0.5">
                    ₦{item.price} each
                  </p>

                  <div className="flex items-center gap-2 mt-2">

                    <button
                      onClick={() =>
                        updateQty(
                          item.id,
                          item.qty - 1
                        )
                      }
                      className="w-6 h-6 border border-[rgba(196,149,74,0.3)] text-[#c4954a] flex items-center justify-center"
                    >
                      <Minus size={10} />
                    </button>

                    <span className="text-sm font-['DM_Mono'] text-[#ede4d4] w-4 text-center">
                      {item.qty}
                    </span>

                    <button
                      onClick={() =>
                        updateQty(
                          item.id,
                          item.qty + 1
                        )
                      }
                      className="w-6 h-6 border border-[rgba(196,149,74,0.3)] text-[#c4954a] flex items-center justify-center"
                    >
                      <Plus size={10} />
                    </button>

                  </div>

                </div>

                <div className="flex flex-col items-end justify-between">

                  <button
                    onClick={() =>
                      removeItem(item.id)
                    }
                    className="text-[#8a7d6a] hover:text-red-400"
                  >
                    <X size={14} />
                  </button>

                  <p className="text-sm font-['DM_Mono'] text-[#c4954a]">
                    ₦{(item.price * item.qty).toFixed(2)}
                  </p>

                </div>

              </div>

            ))

          )}

        </div>

        {/* Summary */}
        {cartItems.length > 0 && (

          <div className="px-6 py-5 border-t border-[rgba(196,149,74,0.12)]">

            <div className="space-y-2 mb-4">

              <div className="flex justify-between text-sm">
                <span className="text-[#8a7d6a]">
                  Subtotal
                </span>

                <span className="text-[#ede4d4]">
                  ₦{subtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-[#8a7d6a]">
                  Service (10%)
                </span>

                <span className="text-[#ede4d4]">
                  ₦{service.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between pt-2 border-t border-[rgba(196,149,74,0.1)]">

                <span className="text-[#ede4d4] font-semibold">
                  Total
                </span>

                <span className="text-[#c4954a] font-semibold">
                  ₦{total.toFixed(2)}
                </span>

              </div>

            </div>

            <Link
              href="/checkout"
            >
             <button className="w-full py-3.5 bg-[#c4954a] text-[#0c0a08] font-semibold" onClick={() => { setCartOpen(false); onCheckout();}}>Proceed to Checkout</button>
            </Link>

            <button
              onClick={() => setCartOpen(false)}
              className="w-full mt-2 py-2.5 text-sm text-[#8a7d6a]"
            >
              Continue Ordering
            </button>

          </div>

        )}

      </div>
    </>
  );
};


export default CartSlide;