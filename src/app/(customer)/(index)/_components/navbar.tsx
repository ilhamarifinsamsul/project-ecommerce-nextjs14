import { getUser } from "@/lib/auth";
import Link from "next/link";
import { Logout } from "../../(auth)/lib/actions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default async function Navbar() {
  const { session, user } = await getUser();
  return (
    <nav className="container max-w-[1130px] mx-auto flex items-center justify-between bg-[#0D5CD7] p-5 rounded-3xl">
      <div className="flex shrink-0">
        <img src="/assets/logos/logo.svg" alt="icon" />
      </div>
      <ul className="flex items-center gap-[30px]">
        <li className="hover:font-bold hover:text-[#FFC736] transition-all duration-300 font-bold text-[#FFC736]">
          <Link href="/catalogs">Shop</Link>
        </li>
        <li className="hover:font-bold hover:text-[#FFC736] transition-all duration-300 text-white">
          <Link href="/">Categories</Link>
        </li>
        <li className="hover:font-bold hover:text-[#FFC736] transition-all duration-300 text-white">
          <Link href="/">Testimonials</Link>
        </li>
        <li className="hover:font-bold hover:text-[#FFC736] transition-all duration-300 text-white">
          <Link href="/">Rewards</Link>
        </li>
      </ul>
      <div className="flex items-center gap-3">
        <Link href="/carts">
          <div className="w-12 h-12 flex shrink-0">
            <img src="/assets/icons/cart.svg" alt="icon" />
          </div>
        </Link>

        {session && user.role === "customer" ? (
          <div className="flex items-center gap-3">
            <p className="text-white">Hi, {user.name}</p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-[48px] h-[48px] flex shrink-0 rounded-full p-1 border border-[#E5E5E5] overflow-hidden">
                  <img
                    src="/assets/photos/p4.png"
                    className="w-full h-full object-cover rounded-full"
                    alt="photo"
                  />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <form action={Logout}>
                    <button type="submit" className="w-full text-left">
                      Logout
                    </button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="flex gap-3">
            <Link
              href="/sign-in"
              className="p-[12px_20px] bg-white rounded-full font-semibold text-gray-700"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="p-[12px_20px] bg-white rounded-full font-semibold text-gray-700"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
