// use client
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormStatus } from "react-dom";
import { useFormState } from "react-dom";
import { AlertCircleIcon, X } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ThemeToggle } from "./theme-toggle";
import Link from "next/link";
import SignIn from "../lib/actions";
import { useEffect, useState } from "react";

const initialState = {
  error: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <div className="flex w-full flex-col gap-2">
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Loading..." : "Sign In"}
      </Button>
    </div>
  );
}

export default function FormSignIn() {
  const [state, formAction] = useFormState(SignIn, initialState);
  const [showError, setShowError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  console.log("State form:", state);

  // ✅ Auto-dismiss error with fade animation
  useEffect(() => {
    if (state.error !== "") {
      setShowError(true);
      setIsVisible(true);

      const fadeTimer = setTimeout(() => {
        setIsVisible(false);
        // Wait for fade animation to complete before hiding
        setTimeout(() => setShowError(false), 300);
      }, 4500); // Start fading at 4.5s

      // Cleanup timer if component unmounts or error changes
      return () => clearTimeout(fadeTimer);
    } else {
      setShowError(false);
      setIsVisible(false);
    }
  }, [state.error]);

  // ✅ Manual close function
  const handleCloseError = () => {
    setIsVisible(false);
    setTimeout(() => setShowError(false), 300);
  };

  return (
    <form action={formAction}>
      {/* ✅ FIXED: Changed from max-w-sm to max-w-md for wider card */}
      <Card className="w-full max-w-md rounded-xl shadow-lg">
        <div className="flex justify-end top-4 right-4 mr-4 mt-4">
          <ThemeToggle />
        </div>

        <CardHeader className="space-y-1 px-8">
          <CardTitle className="text-2xl">Login to your account</CardTitle>
          <CardDescription className="text-base">
            Enter your email & password to sign in
          </CardDescription>
        </CardHeader>

        <CardContent className="px-8">
          {/* ✅ Error with fade animation and manual close */}
          {state.error !== "" && showError && (
            <Alert
              variant="destructive"
              className={`mb-6 transition-opacity duration-300 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <AlertCircleIcon className="h-4 w-4" />
              <AlertTitle className="flex items-center justify-between">
                Unable to process your Sign In.
                <button
                  type="button"
                  onClick={handleCloseError}
                  className="ml-2 hover:bg-red-600 rounded-full p-1"
                >
                  <X className="h-3 w-3" />
                </button>
              </AlertTitle>
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          )}

          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-base">
                Email
              </Label>
              <Input
                name="email"
                id="email"
                type="email"
                placeholder="m@example.com"
                className="h-12 text-base"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password" className="text-base">
                  Password
                </Label>
              </div>
              <Input
                name="password"
                id="password"
                type="password"
                className="h-12 text-base"
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex-col gap-4 px-8 pb-8">
          <CardAction className="flex justify-center">
            <p className="text-base text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/" className="text-blue-500 hover:underline">
                Sign Up
              </Link>
            </p>
          </CardAction>
          <SubmitButton />
        </CardFooter>
      </Card>
    </form>
  );
}
