"use client";

import react from 'react';
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from 'lucide-react';
import { GitHubLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons';

const Influencers = () => {
    // 博主表格表头数据
    const tableHeader = ['', 'Profile name', '', 'Site', 'Mentions', 'Followers'];
    const handleBack = () => {
        window.history.back();
    };
    return (
        <div className="bg-[#f4f4f4] w-full h-full p-4 space-y-4">
            <Card className="rounded-[24px]">
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                        <Button
                            variant="link"
                            onClick={handleBack}
                            className="bg-white text-black p-2 rounded-full flex items-center justify-center hover:bg-white hover:border-transparent focus:border-transparent"
                        >
                            <ArrowLeftIcon className="w-5 h-5" />
                        </Button>
                        <span className="text-black text-lg font-bold">Influencers</span>
                    </CardTitle>
                </CardHeader>
                <div className='p-6'>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {tableHeader.map((tableheader, index) => (
                                    <TableHead key={index}>{tableheader}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>1</TableCell> {/* 第一列编号 */}
                                <TableCell>Think Media</TableCell>
                                <TableCell>
                                    <Button variant="outline">Button</Button> {/* 第三列按钮 */}
                                </TableCell>
                                <TableCell><TwitterLogoIcon /></TableCell>
                                <TableCell>1</TableCell>
                                <TableCell>3030000</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>2</TableCell> {/* 第一列编号 */}
                                <TableCell>Private Label</TableCell>
                                <TableCell>
                                    <Button variant="outline">Button</Button> {/* 第三列按钮 */}
                                </TableCell>
                                <TableCell><TwitterLogoIcon /></TableCell>
                                <TableCell>1</TableCell>
                                <TableCell>2750000</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>3</TableCell> {/* 第一列编号 */}
                                <TableCell>Akalanka Ekanayake</TableCell>
                                <TableCell>
                                    <Button variant="outline">Button</Button> {/* 第三列按钮 */}
                                </TableCell>
                                <TableCell><GitHubLogoIcon /></TableCell>
                                <TableCell>1</TableCell>
                                <TableCell>1880000</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </Card>
        </div>
    )
}

export default Influencers;