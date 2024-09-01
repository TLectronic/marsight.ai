import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import twitterIcon from "@/public/twitter.svg";
import mailIcon from "@/public/mail.svg";
import Image from "next/image";
import Link from "next/link";
import logoIcon from "@/public/logo.png";
import { LinkIcon } from "lucide-react";
export default function Page({ params: { lng } }: { params: { lng: string } }) {
  return (
    <div className="w-full h-full flex justify-center items-center relative">
      <main className="-mt-60 w-[600px] flex flex-col items-center justify-start gap-8">
        <Image src={logoIcon} className="w-96 object-cover" alt="logo" />
        <p>通过数据解读任何一种产品的营销策略</p>
        <div className="w-full max-w-screen-md space-y-2">
          <form className="flex space-x-2 relative">
            <LinkIcon className="absolute left-4 top-3" size={16} />
            <Input
              className="flex-1 pl-8"
              placeholder="Drop any product's link..."
              type="text"
            />
            <Button type="submit">Decipher</Button>
          </form>
        </div>
      </main>
      <footer className="absolute bottom-0 w-10/12 flex flex-col justify-center items-center">
        <div>
          <Button variant={"ghost"}>
            <Image
              src={twitterIcon}
              alt="Twitter"
              width={16}
              height={16}
              className="w-4 h-4"
            />
          </Button>
          <Button variant={"ghost"}>
            <Image
              src={mailIcon}
              alt="Mail"
              width={20}
              height={20}
              className="w-5 h-5"
            />
          </Button>
        </div>

        <div className="text-xs">
          <Button variant={"link"}>
            <Link href={`/${lng}/privacy`} className="text-xs">Privacy Policy</Link>
          </Button>
          <Button variant={"link"}>
            <Link href={`/${lng}/terms`} className="text-xs">Terms of Service</Link>
          </Button>
        </div>
      </footer>
    </div>
  );
}
