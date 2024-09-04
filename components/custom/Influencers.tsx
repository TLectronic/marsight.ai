import React from 'react'
import Link from "next/link";
import * as Avatar from '@radix-ui/react-avatar';
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { GitHubLogoIcon, TriangleDownIcon, TriangleRightIcon, TwitterLogoIcon } from '@radix-ui/react-icons'

import Image from "next/image";
import AIInsightsIcon from "@/public/aiinsights.svg";

const Influencers = () => {
    const tableHeader = ['', 'Profile name', '', 'Site', 'Mentions', 'Followers'];
    return (
        <Card className="rounded-[24px]">
            <CardHeader>
                <div className='flex justify-between'>
                    <CardTitle>Influencers</CardTitle>
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
                            {tableHeader.map((tableheader, index) => (
                                <TableHead>{tableheader}</TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>1</TableCell> {/* 第一列编号 */}

                            <TableCell className="flex items-center space-x-2">
                                <Avatar.Root className="bg-blackA1 inline-flex h-[30px] w-[30px] select-none items-center justify-center overflow-hidden">
                                    <Avatar.Fallback className="text-white flex h-full w-full items-center justify-center bg-black text-[15px] font-medium">
                                        TM
                                    </Avatar.Fallback>
                                </Avatar.Root>
                                <span className="text-[15px] font-medium">Think Media</span>
                            </TableCell>
                            <TableCell>
                                <Button variant="outline">Button</Button> {/* 第三列按钮 */}
                            </TableCell>
                            <TableCell><TwitterLogoIcon /></TableCell>
                            <TableCell>1</TableCell>
                            <TableCell>3030000</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>2</TableCell> {/* 第一列编号 */}
                            <TableCell className="flex items-center space-x-2">
                                <Avatar.Root className="bg-blackA1 inline-flex h-[30px] w-[30px] select-none items-center justify-center overflow-hidden">
                                    <Avatar.Image
                                        className="h-full w-full rounded-[inherit] object-cover"
                                        src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80"
                                        alt="Pedro Duarte"
                                    />
                                    <Avatar.Fallback
                                        className="text-violet11 leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium"
                                        delayMs={600}
                                    >
                                        JD
                                    </Avatar.Fallback>
                                </Avatar.Root>
                                <span className="text-[15px] font-medium">Private Label</span>

                            </TableCell>
                            <TableCell>
                                <Button variant="outline">Button</Button> {/* 第三列按钮 */}
                            </TableCell>
                            <TableCell><TwitterLogoIcon /></TableCell>
                            <TableCell>1</TableCell>
                            <TableCell>2750000</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>3</TableCell> {/* 第一列编号 */}
                            <TableCell className="flex items-center space-x-2">
                                <Avatar.Root className="bg-blackA1 inline-flex h-[30px] w-[30px] select-none items-center justify-center overflow-hidden">
                                    <Avatar.Image
                                        className="h-full w-full rounded-[inherit] object-cover"
                                        src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
                                        alt="Colm Tuite"
                                    />
                                    <Avatar.Fallback
                                        className="text-violet11 leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium"
                                        delayMs={600}
                                    >
                                        CT
                                    </Avatar.Fallback>
                                </Avatar.Root>
                                <span className="text-[15px] font-medium">Akalanka Ekanayake</span>
                            </TableCell>
                            <TableCell>
                                <Button variant="outline">Button</Button> {/* 第三列按钮 */}
                            </TableCell>
                            <TableCell><GitHubLogoIcon /></TableCell>
                            <TableCell>1</TableCell>
                            <TableCell>1880000</TableCell>
                        </TableRow>
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
    )
}
export { Influencers };