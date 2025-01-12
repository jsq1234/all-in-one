import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Playfair } from "next/font/google";
import Link from "next/link";
import { merriweather } from "./layout";

const playfair = Playfair({
  weight: ["500", "300", "400", "600", "700"],
  subsets: ["latin"],
});

export default function Home() {
  return (
    <main className="relative w-full h-screen flex items-center">
      <Image
        src="/hero-background.jpeg"
        alt="Background"
        fill
        className="object-cover z-0 blur-sm"
        priority // If this is your hero image
      />
      <div className={`relative z-10 ml-28 ${playfair.className}`}>
        <h1 className="text-8xl text-white">All In One</h1>
        <h3 className="text-2xl text-white">
          An app for all of my conveniences
        </h3>
        <div className={`flex space-x-4 mt-4 ${merriweather.className}`}>
          <Link href="/sign-up">
            <Button className="text-md px-8 py-5 font-bold" variant={"outline"}>
              Sign Up
            </Button>
          </Link>
          <Link href="/sign-in">
            <Button className="text-md px-8 py-5 font-bold" variant={"outline"}>
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
