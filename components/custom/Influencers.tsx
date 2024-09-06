import React from 'react';
import Link from "next/link";
import * as Avatar from '@radix-ui/react-avatar';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import Image from "next/image";
import AIInsightsIcon from "@/public/aiinsights.svg";
import { GitHubLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons';

interface Influencer {
    id: number;
    name: string;
    profileImage: string | null;
    fallbackText: string;
    siteIcon: React.ReactNode;
    mentions: number;
    followers: number;
}

interface InfluencersProps {
    influencers: Influencer[];
}

const Influencers: React.FC<InfluencersProps> = ({ influencers }) => {
    const tableHeader = ['', 'Profile Name', '', 'Site', 'Mentions', 'Followers'];

    return (
        <>
            <Card className="rounded-md">
                <CardHeader>
                    <div className='flex justify-between'>
                        <CardTitle className='text-xl font-normal'>Influencers</CardTitle>
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
                <div className='p-6'>
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
                                                    {influencer.fallbackText}
                                                </Avatar.Fallback>
                                            )}
                                        </Avatar.Root>
                                        <span className="text-[15px] font-medium">{influencer.name}</span>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="outline">Button</Button>
                                    </TableCell>
                                    <TableCell>{influencer.siteIcon}</TableCell>
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
