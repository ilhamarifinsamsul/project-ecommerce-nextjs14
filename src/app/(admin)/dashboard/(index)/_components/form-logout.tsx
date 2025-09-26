"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useFormState } from "react-dom";

import Logout from "../lib/actions";
import { ActionResult } from "@/types";
import { LogOut } from "lucide-react";

const initialState: ActionResult = {
  error: "",
};

export default function FormLogout() {
  const [state, formAction] = useFormState(Logout, initialState);

  return (
    <nav className="mt-auto flex flex-col items-center gap-4 px-4 sm:py-5">
      <Tooltip>
        <TooltipTrigger asChild>
          <form action={formAction}>
            <button className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
              <LogOut className="h-4 w-4" />
              <span className="sr-only">Logout</span>
            </button>
          </form>
        </TooltipTrigger>
        <TooltipContent side="right">Logout</TooltipContent>
      </Tooltip>
    </nav>
  );
}
