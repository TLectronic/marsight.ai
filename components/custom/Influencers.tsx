import React from 'react';
import Link from "next/link";
import * as Avatar from '@radix-ui/react-avatar';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import Image from "next/image";
import AIInsightsIcon from "@/public/aiinsights.svg";

interface InfluencersProps {
    influencers: {
        id: string; // 作者ID
        name: string; // 作者名字
        profileImage: string; // 作者头像URL
        siteIcon: string; // 网站图标
        siteUrl: string; // 网站要跳转到的地方
        mentions: string; // 提及数
        followers: string; // 粉丝数
    }[];
}

const Influencers: React.FC<InfluencersProps> = ({ influencers }) => {

    const tableHeader = ['', 'Profile Name', 'Site', 'Mentions', 'Followers'];
    return (
        <>
            <Card className="rounded-[24px] p-2">
                <CardHeader>
                    <div className='flex justify-between'>
                        <CardTitle className='text-xl font-extrabold text-[#4281DB]'>Influencers</CardTitle>
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
                <div className='px-6 -mt-6'>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {tableHeader.map((header, index) => (
                                    <TableHead key={index}>{header}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {influencers.map(influencer => (
                                <TableRow key={influencer.id}>
                                    <TableCell>{influencer.id}</TableCell>
                                    <TableCell className="flex items-center space-x-2">
                                        <Avatar.Root className="bg-blackA1 inline-flex h-[30px] w-[30px] select-none items-center justify-center overflow-hidden">
                                            {influencer.profileImage ? (
                                                <Avatar.Image
                                                    className="h-full w-full rounded-[inherit] object-cover"
                                                    src={influencer.profileImage}
                                                    alt={influencer.name}
                                                />
                                            ) : (
                                                <Avatar.Fallback className="text-white flex h-full w-full items-center justify-center bg-black text-[15px] font-medium">
                                                    Fail
                                                </Avatar.Fallback>
                                            )}
                                        </Avatar.Root>
                                        <span className="text-[15px] font-medium">{influencer.name}</span>
                                    </TableCell>
                                    <TableCell>
                                        <Link href={influencer.siteUrl}>
                                            <Image src={influencer.siteIcon} alt="site icon" width={150} height={150} />
                                        </Link>
                                    </TableCell>
                                    <TableCell>{influencer.mentions}</TableCell>
                                    <TableCell>{influencer.followers}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div className='flex justify-end'>
                        <Button variant="link">
                            <Link href="./1/secondaryPage/influencers">
                                Show more influencers
                            </Link>
                        </Button>
                    </div>
                </div>
            </Card>
        </>

    );
};

export { Influencers };
