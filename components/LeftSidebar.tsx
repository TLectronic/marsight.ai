"use client";
import React, { useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { cn } from "@/lib/utils";
import { PanelLeftClose, Search, History, Bot, PanelRightClose } from "lucide-react";
import {
  SignedOut,
  SignInButton,
  SignedIn,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { Button } from "./ui/button";

import { Card } from "./ui/card";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import Link from "next/link";
import Image from "next/image";
import logoIcon from "@/public/logo.png";
import { useTranslations } from "next-intl";

export default function LeftSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const { user, isLoaded } = useUser();
  const t = useTranslations('LeftSidebar')
  return (
    <div
      className={cn(
        "h-screen flex flex-col justify-between gap-4 bg-[#FFFFFF] relative",
        isOpen ? "w-[200px]" : "w-16"
      )}
    >
      {/* LOGO */}
      <div className="w-full h-16 flex flex-row justify-center items-center text-xl text-blue-500 font-bold">
        {isOpen ? (
          <Image src={logoIcon} alt="logo" className="w-8/12 object-cover" />
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
            <Search width={16} height={16} className="w-4 h-4" />
            {isOpen && t('search')}
          </Link>
        </Button>
        {isOpen && (
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="px-6">
              <AccordionTrigger disabled={!isOpen}>
                <div className="w-full h-6 flex flex-row items-center gap-2">
                  <History width={16} height={16} className="w-4 h-4" />
                  {isOpen && t('library')}
                </div>
              </AccordionTrigger>
              <AccordionContent asChild>
                <Button variant={"link"} className="w-full">
                  <Link
                    href={`/search/history/1`}
                    className="h-6 w-full flex flex-row px-2 items-center cursor-pointer gap-2"
                  >
                    首次搜索记录
                  </Link>
                </Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </div>

      <div className="w-5/6 ml-2">
        <Card className="p-4 pr-2 bg-white">
          <div className="font-semibold text-base leading-relaxed">
            {isOpen && t('title')}
          </div>
          <div className="text-sm leading-relaxed mt-2 mb-2">
            {isOpen && t('content')}
          </div>
          <Button className="mb-2" variant="default">
            <Link href="./prices" >
              {isOpen && t('button')}
            </Link>
          </Button>
        </Card>
      </div>

      <div className="w-full flex justify-center">
        {isOpen && (
          <SignedOut>
            <SignInButton>
              <Button className="w-10/12">{t('signin')}</Button>
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
        {
          isOpen ? <PanelLeftClose onClick={() => setIsOpen((prev) => !prev)} /> : <PanelRightClose onClick={() => setIsOpen((prev) => !prev)} />
        }

      </div>
    </div>
  );
}
