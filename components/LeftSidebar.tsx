"use client";
import React, { useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "./ui/accordion";
export default function LeftSidebar() {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div
            className={cn(
                "h-screen flex flex-col justify-between gap-4 bg-[#f4f4f4] relative",
                isOpen ? "w-[283px]" : "w-[80px]"
            )}
        >
            {/* LOGO */}
            <div className="flex flex-row p-8 justify-center items-center text-3xl text-blue-500 font-bold">
                MARSIGHT.AI
            </div>
            {/* CONTENT */}
            <div className="flex-1 h-screen overflow-scroll scrollbar-hide">
                <div className="h-16 w-full flex flex-row px-4 items-center hover:bg-gray-200 cursor-pointer">
                    搜索
                </div>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1" className="px-4">
                        <AccordionTrigger>
                            <div className="w-full h-8 flex flex-row items-center">
                                搜索历史
                            </div>
                        </AccordionTrigger>
                        <AccordionContent asChild >
                            <div className="w-full h-8 flex flex-row items-center cursor-pointer hover:bg-gray-200">
                                首次搜索记录
                            </div>

                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
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
                        <SignedOut>
                            <SignInButton>
                                <Button>SignIn</Button>
                            </SignInButton>
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </>
                ) : null}
                <Menu onClick={() => setIsOpen((prev) => !prev)} />
            </div>
        </div>
    );
}
