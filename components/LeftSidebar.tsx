"use client";
import React, { useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { cn } from "@/lib/utils";
import { Menu, Search, History, Bot } from "lucide-react";
import {
  SignedOut,
  SignInButton,
  SignedIn,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { Button } from "./ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import Link from "next/link";
import Image from "next/image";
import logoIcon from "@/public/logo.png";

export default function LeftSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const { user, isLoaded } = useUser();
  return (
    <div
      className={cn(
        "h-screen flex flex-col justify-between gap-4 bg-[#F7F8FA] relative",
        isOpen ? "w-[200px]" : "w-16"
      )}
    >
      {/* LOGO */}
      <div className="w-full h-16 flex flex-row justify-center items-center text-xl text-blue-500 font-bold">
        {isOpen ? (
          <Image src={logoIcon} alt="logo"  className="w-8/12 object-cover" />
        ) : (
          <Button variant="ghost">
            <Bot width={32} height={32} className="w-8 h-8" />
          </Button>
        )}
      </div>
      {/* CONTENT */}
      <div className="flex-1 h-screen overflow-scroll scrollbar-hide">
        <Button variant={"link"} className="w-full">
          <Link
            href={`/search`}
            className="h-6 w-full flex flex-row px-2 items-center  cursor-pointer gap-2"
          >
            <Search width={16} height={16} className="w-4 h-4" />{" "}
            {isOpen && "搜索"}
          </Link>
        </Button>
        {isOpen && (
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="px-6">
              <AccordionTrigger disabled={!isOpen}>
                <div className="w-full h-6 flex flex-row items-center gap-2">
                  <History width={16} height={16} className="w-4 h-4" />
                  {isOpen && "历史记录"}
                </div>
              </AccordionTrigger>
              <AccordionContent asChild>
                <Button variant={"link"} className="w-full">
                  <Link
                    href={`/search/history/1`}
                    className="h-6 w-full flex flex-row px-2 items-center  cursor-pointer gap-2"
                  >
                    首次搜索记录
                  </Link>
                </Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </div>

      <div className="w-full flex justify-center">
        {isOpen && (
          <SignedOut>
            <SignInButton>
              <Button className="w-10/12">SignIn</Button>
            </SignInButton>
          </SignedOut>
        )}

        <SignedIn>
          <div className="w-full flex flex-row items-center gap-2 px-4">
            <UserButton />
            {isOpen && (
              <div>{user?.username || user?.firstName || user?.lastName}</div>
            )}
          </div>
        </SignedIn>
      </div>

      {/* BOTTOM */}
      <div
        className={cn(
          "h-14 w-full  flex flex-row px-4 items-center border-t-[1px] border-t-gray-200",
          isOpen ? "justify-between" : "justify-center"
        )}
      >
        {isOpen ? (
          <>
            <LanguageSwitcher />
          </>
        ) : null}
        <Menu onClick={() => setIsOpen((prev) => !prev)} />
      </div>
    </div>
  );
}
