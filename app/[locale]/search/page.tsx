"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import twitterIcon from "@/public/twitter.svg";
import mailIcon from "@/public/mail.svg";
import Image from "next/image";
import Link from "next/link";
import { LinkIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import InsightsIcon from "@/public/insights.svg";
import React, { useState } from 'react'
import { useAuth } from "@clerk/nextjs";
import axios from "axios";


export default function Page({ params: { lng } }: { params: { lng: string } }) {
  const t = useTranslations("SearchPage");
  const template = 'markSightTest';
  const { getToken, isSignedIn } = useAuth();

  const makeDialogue = async (event: React.FormEvent) => {
    event.preventDefault(); // 阻止表单默认提交行为
    try {
      console.log('isSignIn:',isSignedIn)
      if (isSignedIn) {
        console.log('asddasd')
        const jwtToken = await getToken({ template });
        console.log(jwtToken)
        const response = await axios.post(
          'https://zyzc73u8a0.execute-api.us-east-1.amazonaws.com/Alpha/chat',
          {
            url: 'https://tailwindcss.com/',
          },
          {
            headers: {
              'Authorization': `Bearer ${jwtToken}`,
            },
          }
        );
        const data = response.data;
        console.log('data:', data);
      }
    } catch (error) {
      console.log('error')
    }
  }
  // 是否正在搜索，默认为否
  const [isSearching, setIsSearching] = useState(false);
  // 搜索页
  const Search = () => {
    return <>
      <p className="text-xl ">{t("slogan")}</p>
      <div className="w-full max-w-screen-md space-y-2">
        <form className="flex space-x-2 relative">
          <LinkIcon className="absolute left-4 top-3" size={16} />
          <Input
            className="flex-1 pl-8"
            placeholder={t("searchPlaceholder")}
            type="text"
          />
          {/* <Button type="submit" onClick={() => setIsSearching(true)}>{t("decipher")}</Button> */}
          <Button type="submit" onClick={makeDialogue}>{t("decipher")}</Button>
        </form>
      </div>
    </>
  }

  // 等待页
  const Waiting = () => {
    return <>
      <Link href="mailto:your-email@example.com">
        <Image
          src={InsightsIcon}
          alt="Mail"
          width={200}
          height={200}
          className="w-28 h-14"
        />
      </Link>
      <p className="text-xl text-center"> Depending on the size of the website &apos; s data and the data range
        select,the analysis may take up to 1 minute to process.</p >
    </>
  }
  return (
    <div className="w-full h-full flex justify-center items-center relative">
      <main className="-mt-60 w-[600px] flex flex-col items-center justify-start gap-8">
        {isSearching ? <Waiting /> : <Search />}
      </main>
      <footer className="absolute bottom-0 w-10/12 flex flex-col justify-center items-center">
        <div className="flex justify-center items-center gap-2">

          <Button
            variant="link"
            asChild
            className="p-2 transition-all duration-200 rounded-full hover:bg-gray-200"
          >
            <Link href="mailto:your-email@example.com">
              <Image
                src={twitterIcon}
                alt="Mail"
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </Link>
          </Button>
          <Button
            variant="link"
            asChild
            className="p-2 transition-all duration-200 rounded-full hover:bg-gray-200"
          >
            <Link href="mailto:your-email@example.com">
              <Image
                src={mailIcon}
                alt="Mail"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </Link>
          </Button>
        </div>

        <div className="text-xs">
          <Button variant={"link"}>
            <Link href={`/${lng}/privacy`} className="text-xs text-[#666666]">
              {t("privacy")}
            </Link>
          </Button>
          <Button variant={"link"}>
            <Link href={`/${lng}/terms`} className="text-xs text-[#666666]">
              {t("terms")}
            </Link>
          </Button>
        </div>
      </footer>
    </div>
  );
}
