import React from "react";
import { LanguagesIcon } from "lucide-react";
import {
  PopoverTrigger,
  PopoverContent,
  Popover,
} from "@/components/ui/popover";
import {useNavigator} from 'next/navigator'
import Head from ''
import cnIcon from "@/public/cn.svg";
import enIcon from "@/public/us.svg";
import Link from "next/link";
import Image from "next/image";
export default function LanguageSwitcher() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <LanguagesIcon />
      </PopoverTrigger>
      <PopoverContent side="top" asChild className="p-0 w-28">
        <div className="flex flex-col gap-2 w-28  p-0 ">
          <Link
            className="w-full h-8 flex items-center hover:bg-gray-100 gap-2 pl-2"
            href={"/en"}
          >
            <Image
              src={enIcon}
              alt=""
              width={16}
              height={16}
              className="w-4 h-4"
            /> English
          </Link>
          <Link
            className="w-full h-8 flex  items-center hover:bg-gray-100 gap-2 pl-2"
            href={"/zh"}
          >
            <Image
              src={cnIcon}
              alt=""
              width={16}
              height={16}
              className="w-4 h-4"
            />
            中文
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
}
