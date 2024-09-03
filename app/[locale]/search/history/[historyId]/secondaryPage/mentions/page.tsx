"use client";

import React, { useState } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'
import { MentionBox } from '@/components/ui/mention-box';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from 'lucide-react';

// 最火爆的提及 数据
const mentions = [
  {
    avatarSrc: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
    fallbackText: 'error',
    title: 'Imagine ter o seu proprio influe...',
    date: '2024-08-22 05:15',
    link: 'https://instagram.com',
    tags: '#robo #vocesabia #curiosidades #dicas'
  },
  {
    avatarSrc: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
    fallbackText: 'error',
    title: 'Odetta Rockhead-Kerr',
    date: '2024-08-12 05:00',
    link: 'https://youtube.com',
    tags: 'ROCKSTAR to get an additional 10% off.'
  },
];

// 红人的提及 数据
const mentionsFrom = [
  {
    avatarSrc: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
    fallbackText: 'error',
    title: '1',
    date: '2024-08-22 05:15',
    link: 'https://instagram.com',
    tags: '#robo #vocesabia #curiosidades #dicas'
  },
  {
    avatarSrc: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
    fallbackText: 'error',
    title: '2',
    date: '2024-08-12 05:00',
    link: 'https://youtube.com',
    tags: 'ROCKSTAR to get an additional 10% off.'
  },
];
const handleBack = () => {
  window.history.back();
};
const Mentions = () => {
  const [selectedOption, setSelectedOption] = useState('popular');
  const dataToShow = selectedOption === 'popular' ? mentions : mentionsFrom;

  return (
    <div className="bg-[#f4f4f4] w-full h-full p-4 space-y-4">
      <Card className="rounded-[24px] mx-4 ">
        <CardHeader>
        <CardTitle className="flex items-center space-x-2">
        <Button
            variant="link"
            onClick={handleBack}
            className="bg-white text-black p-2 rounded-full flex items-center justify-center hover:bg-gray-100 focus:outline-none"
          >
            <ArrowLeftIcon className="w-5 h-9" />
          </Button>
          <Select defaultValue="popular" onValueChange={(value) => setSelectedOption(value)}>
            <SelectTrigger className="text-base flex h-9 items-center bg-transparent px-3 py-2 shadow-sm ring-offset-background focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">
                The most popular mentions
              </SelectItem>
              <SelectItem value="profiles">
                Mentions from the most popular public profiles
              </SelectItem>
            </SelectContent>
          </Select>

        </CardTitle>
          
        </CardHeader>
        <CardContent>
          <div className='grid divide-y'>
            {dataToShow.map((data, index) => (
              <MentionBox
                key={index}
                avatarSrc={data.avatarSrc}
                fallbackText={data.fallbackText}
                title={data.title}
                date={data.date}
                link={data.link}
                tags={data.tags}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Mentions;