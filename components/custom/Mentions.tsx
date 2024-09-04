import React, { useState } from 'react'
import Link from "next/link";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MentionBox } from "@/components/ui/mention-box"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'

import Image from "next/image";
import AIInsightsIcon from "@/public/aiinsights.svg";


const Mentions = () => {

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
    const [selectedOption, setSelectedOption] = useState('popular');
    const dataToShow = selectedOption === 'popular' ? mentions : mentionsFrom;



    return (
        <Card className="rounded-[24px]">
            <CardHeader>
                <div className='flex justify-between'>
                    <div>
                        <Select defaultValue="popular" onValueChange={(value) => setSelectedOption(value)}>
                            <SelectTrigger className="text-base flex h-9 w-full items-center justify-between bg-transparent px-3 py-2 shadow-sm ring-offset-background focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1">
                                <SelectValue placeholder="Select an option" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="popular">
                                    <CardTitle>The most popular mentions</CardTitle>
                                </SelectItem>
                                <SelectItem value="profiles">
                                    <CardTitle>Mentions from the most popular public profiles</CardTitle>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Button
                        variant="link"
                        asChild
                        className="p-2 hover:bg-muted/50"
                    >
                        <Link href="mailto:your-email@example.com">
                            <Image
                                src={AIInsightsIcon}
                                alt="Mail"
                                width={200}
                                height={200}
                                className="w-28 h-14"
                            />
                        </Link>
                    </Button>
                </div>
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
                <div className='flex justify-end'>
                    <Button variant="link">
                        <Link href="./1/secondaryPage/mentions">
                            Show more Mentions
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export { Mentions }