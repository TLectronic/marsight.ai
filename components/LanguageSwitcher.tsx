import React from 'react'
import { LanguagesIcon } from 'lucide-react'
import { PopoverTrigger, PopoverContent, Popover } from '@/components/ui/popover'
import { Button } from './ui/button'
import Link from 'next/link'
export default function LanguageSwitcher() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <LanguagesIcon  />
            </PopoverTrigger>
            <PopoverContent side='top' asChild className='p-0 w-28'>
                <div className='flex flex-col gap-2 w-28  p-0 '>
                    <Link className='w-full h-8 flex justify-center items-center hover:bg-gray-100' href={'/en'}>English</Link>
                    <Link className='w-full h-8 flex justify-center items-center hover:bg-gray-100' href={'/zh'}>中文</Link>
                </div>
            </PopoverContent>
        </Popover>
    )
}