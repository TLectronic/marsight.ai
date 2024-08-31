import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import twitterIcon from '@/public/twitter.svg';
import mailIcon from '@/public/mail.svg';
import Image from "next/image";
import Link from "next/link";
export default function Page({params: {lng}}: {params: {lng: string}}) {
  return (
    <div className="w-full h-full flex justify-center items-center relative">
      <main className="-mt-60 w-[600px] flex flex-col items-center justify-start gap-8">
        <h1 className="text-blue-500 text-3xl font-bold">MARSIGHT.AI</h1>
        <p>通过数据解读任何一种产品的营销策略</p>
        <div className="w-full max-w-screen-md space-y-2">
          <form className="flex space-x-2">
            <Input
              className="flex-1"
              placeholder="Drop any product's link..."
              type="text"
            />
            <Button type="submit">Generate</Button>
          </form>
        </div>
      </main>
      <footer className="absolute bottom-14 w-10/12 flex flex-col justify-center items-center gap-8">
      <div> <Button variant={'ghost'}>
      <Image src={twitterIcon} alt="Twitter" width={20} height={20} className="w-5 h-5" />
      </Button>
      <Button variant={'ghost'}>
      <Image src={mailIcon} alt="Mail" width={24} height={24} className="w-6 h-6" />
      
      </Button></div>
     
       <div>
        <Button variant={'link'}>
          <Link href={`/${lng}/privacy`}>Privacy Policy</Link>
        </Button>
        <Button variant={'link'}>
          <Link href={`/${lng}/terms`}>Terms of Service</Link>
        </Button>
       </div>
      </footer>
    </div>
  );
}