// use client
"use client";

import React, { useEffect, useState } from "react";
import { ActionResult } from "@/types";
import { useFormState, useFormStatus } from "react-dom";
import SignIn from "../lib/actions";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

// initiaState
const initialFormState: ActionResult = {
  error: "",
  success: "",
};

// function SubmitButton
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="p-[12px_24px] bg-[#0D5CD7] rounded-full text-center font-semibold text-white hover:bg-[#0D5CD7]/90 transition-colors"
    >
      {pending ? "Loading..." : "Sign In to My Account"}
    </button>
  );
}

export default function SignInPage() {
  const [state, formAction] = useFormState(SignIn, initialFormState);
  //   initialisasi router
  const searchParams = useSearchParams();

  //   Local state untuk kontrol visibilitas error
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [visible, setVisible] = useState(false);

  // State untuk toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (state.error) {
      setErrorMessage(state.error);
      setVisible(true);

      const timer = setTimeout(() => {
        setVisible(false); // fade out
      }, 4000); // mulai fade setelah 4 detik

      const clearMsg = setTimeout(() => {
        setErrorMessage("");
      }, 4000); // clear message setelah 4 detik total

      return () => {
        clearTimeout(timer);
        clearTimeout(clearMsg);
      };
    }
  }, [state.error]);

  // handle succes dari query param
  useEffect(() => {
    const success = searchParams.get("success");
    if (success) {
      setSuccessMessage(success);
      setVisible(true);

      const timer = setTimeout(() => setVisible(false), 4000);
      const clearMsg = setTimeout(() => setSuccessMessage(""), 4000);

      return () => {
        clearTimeout(timer);
        clearTimeout(clearMsg);
      };
    }
  }, [searchParams]);

  return (
    <div
      id="signin"
      className="bg-[#EFF3FA] min-h-screen pt-[30px] pb-[50px] flex flex-col"
    >
      <style jsx global>{`
        /* Remove autofill background color */
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0 30px white inset !important;
          -webkit-text-fill-color: #1f2937 !important;
          transition: background-color 5000s ease-in-out 0s;
        }
      `}</style>
      <div className="container max-w-[1130px] mx-auto flex flex-1 items-center justify-center py-5">
        <form
          action={formAction}
          className="w-[500px] bg-white p-[50px_30px] flex flex-col gap-5 rounded-3xl border border-[#E5E5E5]"
        >
          <div className="flex justify-center">
            <img src="./assets/logos/logo-black.svg" alt="logo" />
          </div>
          <h1 className="font-bold text-2xl leading-[34px]">Sign In</h1>
          {/* cek error state */}
          {errorMessage && (
            <div
              className={`border border-[#FF3B3B] bg-red-50 rounded-md p-3 transition-opacity duration-1000 ${
                visible ? "opacity-100" : "opacity-0"
              }`}
            >
              <h4 className="font-semibold text-red-600">
                Error
                <p className="text-sm">{errorMessage}</p>
              </h4>
            </div>
          )}
          {/* Success Notification */}
          {successMessage && (
            <div
              className={`border border-green-600 bg-green-50 rounded-md p-3 transition-opacity duration-1000 ${
                visible ? "opacity-100" : "opacity-0"
              }`}
            >
              <h4 className="font-semibold text-green-600">
                Success
                <p className="text-sm">{successMessage}</p>
              </h4>
            </div>
          )}

          <div className="flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300 bg-white">
            <div className="flex shrink-0">
              <img src="./assets/icons/sms.svg" alt="icon" />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Write your email address"
              className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-gray-800 bg-transparent"
            />
          </div>
          <div className="flex flex-col gap-[10px]">
            <div className="flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300 bg-white">
              <div className="flex shrink-0">
                <img src="./assets/icons/lock.svg" alt="icon" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Write your password"
                className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-gray-800 bg-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="flex shrink-0 text-gray-500 hover:text-gray-700 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <SubmitButton />
            <Link
              href="/sign-up"
              className="p-[12px_24px] bg-white rounded-full text-center font-semibold border border-[#E5E5E5] text-gray-800 hover:bg-gray-50 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
