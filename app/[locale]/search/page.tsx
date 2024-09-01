"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import twitterIcon from "@/public/twitter.svg";
import mailIcon from "@/public/mail.svg";
import Image from "next/image";
import Link from "next/link";
import logoIcon from "@/public/logo.png";
import { LinkIcon } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Page({ params: { lng } }: { params: { lng: string } }) {
  const t = useTranslations("SearchPage");
  return (
    <div className="w-full h-full flex justify-center items-center relative">
      <main className="-mt-60 w-[600px] flex flex-col items-center justify-start gap-8">
        {/* <Image src={logoIcon} className="w-96 object-cover" alt="logo" /> */}
        <p className="text-5xl ">{t("slogan")}</p>
        <div className="w-full max-w-screen-md space-y-2">
          <form className="flex space-x-2 relative">
            <LinkIcon className="absolute left-4 top-3" size={16} />
            <Input
              className="flex-1 pl-8"
              placeholder={t("searchPlaceholder")}
              type="text"
            />
            <Button type="submit">{t("decipher")}</Button>
          </form>
        </div>
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
