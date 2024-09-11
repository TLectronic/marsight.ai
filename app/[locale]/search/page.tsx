"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import twitterIcon from "@/public/twitter.svg";
import mailIcon from "@/public/mail.svg";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { LinkIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import InsightsIcon from "@/public/insights.svg";
import React, { useRef, useState } from 'react'
import { useAuth } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowRightIcon } from 'lucide-react'

export default function Page({ params: { lng } }: { params: { lng: string } }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const t = useTranslations("SearchPage");
  const template = 'marsight';
  const { getToken, isSignedIn } = useAuth();
  const { user } = useUser();
  const [isDialogOpen, setDialogOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  // router钩子，用于页面跳转
  const router = useRouter();
  // 是否正在搜索，默认为否
  const [isSearching, setIsSearching] = useState(false);


  const makeDialogue = async (event: React.FormEvent) => {
    if (inputRef.current) {
      console.log(inputRef.current.value);

      var inputValue = inputRef.current.value;

      if (!/^https?:\/\//i.test(inputValue)) {
        inputValue = `http://${inputValue}`;
      }
      // 验证网址
      try {
        new URL(inputValue); // 如果 inputValue 不是合法的网址，这里会抛出异常
      } catch (_) {
        setErrorMessage("Please enter a valid URL.");
        setDialogOpen(true);
        setIsSearching(false);
        return;
      }
      event.preventDefault();

      setIsSearching(true);
      try {
        if (isSignedIn && user) {
          const jwtToken = await getToken({ template });
          console.log(jwtToken);
          const response = await axios.post(
            'http://marsight-1835320230.us-east-1.elb.amazonaws.com',
            {
              url: inputValue,
              userId: user.id,
            },
            {
              headers: {
                'Authorization': `Bearer ${jwtToken}`,
              },
            }
          );
          // 获得当前查询网址的chatId
          const chatId = response.data.chatId;
          console.log('chatId:', chatId);
          router.push(`/search/history/${chatId}`);
        }
      } catch (error) {
        console.log('error:', error);
        if (axios.isAxiosError(error)) {
          if (error.response && error.response.status === 402) {
            // 当出现 402 错误时，设置错误消息并打开 Dialog
            setErrorMessage("You need to make a payment to proceed.")
            setIsSearching(false);
            setDialogOpen(true)
          } else {
            setErrorMessage("An error occurred.")
            setDialogOpen(true)
          }
        }
      }
    }
  }

  // 搜索页
  const Search = () => {
    return <>
      <p className="text-4xl font-semibold text-center">
        <span className="block">Decipher Any Product&apos;s</span>
        <span className="block">
          <span className="block">
            <span className="text-[#4281DB]">Marketing Strategy</span> with Data
          </span>
        </span>
      </p>
      <div className="w-full max-w-screen-md space-y-2">
        <form className="flex space-x-2 relative">
          <LinkIcon className="absolute left-4 top-3" size={16} />
          <Input
            className="flex-1 pl-8"
            placeholder={t("searchPlaceholder")}
            type="text"
            ref={inputRef} // 通过 ref 访问 input
          />
          {/* <Button type="submit" onClick={() => setIsSearching(true)}>{t("decipher")}</Button> */}
          <Button className="rounded-full " type="submit" onClick={makeDialogue}>
            <ArrowRightIcon />
          </Button>
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
            <Link href={`/privacy`} className="text-xs text-[#666666]">
              {t("privacy")}
            </Link>
          </Button>
          <Button variant={"link"}>
            <Link href={`/terms`} className="text-xs text-[#666666]">
              {t("terms")}
            </Link>
          </Button>
        </div>
      </footer>
      <div>
        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Error</DialogTitle>
              <DialogDescription>{errorMessage}</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button className="btn" variant="link">OK</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

    </div>
  );
}
