"use client";

import { useCart } from "@/hooks/useCart";
import { rupiah } from "@/lib/utils";
import React, { useMemo } from "react";
import { useFormState } from "react-dom";
import { StoreOrder } from "../lib/actions";
import { ActionResult } from "@/types";
import { useFormStatus } from "react-dom";

// initialState
const initialState: ActionResult = {
  error: "",
  success: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <div className="flex flex-col gap-2">
      <button
        type="submit"
        className="p-[12px_24px] bg-[#0D5CD7] rounded-full text-center font-semibold text-white disabled:opacity-60 disabled:cursor-not-allowed transition-all"
        disabled={pending}
      >
        {pending ? "Processing..." : "Checkout with Xendit"}
      </button>
    </div>
  );
}

export default function CheckoutForm() {
  const { products } = useCart();

  // Kalkulasi subtotal
  const subTotal = useMemo(() => {
    return products.reduce(
      (prev, curr) => prev + curr.price * curr.quantity,
      0
    );
  }, [products]);

  // Kalkulasi Insurance 12%
  const insurance = useMemo(() => {
    return subTotal * 0.12;
  }, [subTotal]);

  // Flat shipping
  const shipping = 0;

  // Warranty (free)
  const warranty = 0;

  // PPN 11%
  const ppn = useMemo(() => {
    return subTotal * 0.11;
  }, [subTotal]);

  // Grand Total
  const grandTotal = useMemo(() => {
    return subTotal + insurance + shipping + warranty + ppn;
  }, [subTotal, insurance, ppn]);

  // state
  const storeOrderParams = (_: unknown, formData: FormData) =>
    StoreOrder(_, formData, grandTotal, products);
  const [state, formAction] = useFormState(storeOrderParams, initialState);

  return (
    <>
      <form
        action={formAction}
        id="checkout-info"
        className="container max-w-[1130px] mx-auto flex justify-between gap-5 mt-[50px] pb-[100px] text-gray-800"
      >
        <div className="w-[650px] flex flex-col shrink-0 gap-4 h-fit">
          <h2 className="font-bold text-2xl leading-[34px]">
            Your Shipping Address
          </h2>
          <div className="flex flex-col gap-5 p-[30px] rounded-3xl border border-[#E5E5E5] bg-white">
            <div className="flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300">
              <div className="flex shrink-0">
                <img src="assets/icons/profile-circle.svg" alt="icon" />
              </div>
              <input
                type="text"
                id="name"
                name="name"
                className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-gray-800 bg-transparent"
                placeholder="Write your real complete name"
                required
              />
            </div>
            <div className="flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300">
              <div className="flex shrink-0">
                <img src="assets/icons/house-2.svg" alt="icon" />
              </div>
              <input
                type="text"
                id="address"
                name="address"
                className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-gray-800 bg-transparent"
                placeholder="Write your active house address"
                required
              />
            </div>
            <div className="flex items-center gap-[30px]">
              <div className="flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300">
                <div className="flex shrink-0">
                  <img src="assets/icons/global.svg" alt="icon" />
                </div>
                <input
                  type="text"
                  id="city"
                  name="city"
                  className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-gray-800 bg-transparent"
                  placeholder="City"
                  required
                />
              </div>
              <div className="flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300">
                <div className="flex shrink-0">
                  <img src="assets/icons/location.svg" alt="icon" />
                </div>
                <input
                  type="number"
                  id="postal_code"
                  name="postal_code"
                  className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-gray-800 bg-transparent"
                  placeholder="Post code"
                  required
                />
              </div>
            </div>
            <div className="flex items-start gap-[10px] rounded-[20px] border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300">
              <div className="flex shrink-0">
                <img src="assets/icons/note.svg" alt="icon" />
              </div>
              <textarea
                name="notes"
                id="notes"
                className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-gray-800 bg-transparent resize-none"
                rows={6}
                placeholder="Additional notes for courier"
              ></textarea>
            </div>
            <div className="flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300">
              <div className="flex shrink-0">
                <img src="assets/icons/call.svg" alt="icon" />
              </div>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-gray-800 bg-transparent"
                placeholder="Write your phone number or whatsapp"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col shrink-0 gap-4 h-fit">
          <h2 className="font-bold text-2xl leading-[34px]">Payment Details</h2>
          <div className="w-full bg-white border border-[#E5E5E5] flex flex-col gap-[30px] p-[30px] rounded-3xl">
            <a href="">
              <div className="w-full bg-white border border-[#E5E5E5] flex items-center justify-between gap-2 p-5 rounded-3xl">
                <div className="flex items-center gap-[10px]">
                  <div className="w-12 h-12 flex shrink-0 rounded-full bg-[#FFC736] items-center justify-center overflow-hidden">
                    <img src="assets/icons/cake.svg" alt="icon" />
                  </div>
                  <div className="flex flex-col gap-[2px]">
                    <p className="font-semibold">100% Its Original</p>
                    <p className="text-sm">We dont sell fake products</p>
                  </div>
                </div>
                <div className="flex shrink-0">
                  <img src="assets/icons/arrow-right.svg" alt="icon" />
                </div>
              </div>
            </a>

            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex shrink-0">
                    <img src="assets/icons/tick-circle.svg" alt="icon" />
                  </div>
                  <p>Sub Total</p>
                </div>
                <p className="font-semibold">{rupiah(subTotal)}</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex shrink-0">
                    <img src="assets/icons/tick-circle.svg" alt="icon" />
                  </div>
                  <p>Insurance 12%</p>
                </div>
                <p className="font-semibold">{rupiah(insurance)}</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex shrink-0">
                    <img src="assets/icons/tick-circle.svg" alt="icon" />
                  </div>
                  <p>Shipping (Flat)</p>
                </div>
                <p className="font-semibold">{rupiah(shipping)}</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex shrink-0">
                    <img src="assets/icons/tick-circle.svg" alt="icon" />
                  </div>
                  <p>Warranty Original</p>
                </div>
                <p className="font-semibold">{rupiah(warranty)}</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex shrink-0">
                    <img src="assets/icons/tick-circle.svg" alt="icon" />
                  </div>
                  <p>PPN 11%</p>
                </div>
                <p className="font-semibold">{rupiah(ppn)}</p>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <p className="font-semibold">Grand Total</p>
              <p className="font-bold text-[32px] leading-[48px] underline text-[#0D5CD7]">
                {rupiah(grandTotal)}
              </p>
            </div>

            {state?.error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{state.error}</p>
              </div>
            )}

            <div className="flex flex-col gap-3">
              <SubmitButton />
              <a
                href=""
                className="p-[12px_24px] bg-white rounded-full text-center font-semibold border border-[#E5E5E5] hover:border-gray-300 transition-all"
              >
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
