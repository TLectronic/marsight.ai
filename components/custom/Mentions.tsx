import React, { useState } from 'react'
import Link from "next/link";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MentionBox } from "@/components/ui/mention-box"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'

import Image from "next/image";
import AIInsightsIcon from "@/public/aiinsights.svg";
interface Mention {
    avatarSrc: string;
    fallbackText: string;
    title: string;
    date: string;
    link: string;
    tags: string;
}


interface MentionsProps {
    mentions: Mention[];
    mentionsFrom: Mention[];
}

const Mentions: React.FC<MentionsProps> = ({ mentions, mentionsFrom }) => {
    const [selectedOption, setSelectedOption] = useState('popular');
    const dataToShow = selectedOption === 'popular' ? mentions : mentionsFrom;

    return (
        <>
            <Card className="rounded-[24px] p-2">
                <CardHeader>
                    <div className='flex justify-between'>
                        <div>
                            <Select defaultValue="popular" onValueChange={(value) => setSelectedOption(value)}>
                                <SelectTrigger className="text-xl flex h-9 w-full items-center justify-between bg-transparent px-3 py-2 shadow-sm ring-offset-background focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1">
                                    <SelectValue placeholder="Select an option" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="popular">
                                        <CardTitle className="font-extrabold text-xl">The most popular mentions</CardTitle>
                                    </SelectItem>
                                    <SelectItem value="profiles">
                                        <CardTitle className="font-extrabold text-xl">Mentions from the most popular public profiles</CardTitle>
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
        </>
    )
}

export { Mentions }