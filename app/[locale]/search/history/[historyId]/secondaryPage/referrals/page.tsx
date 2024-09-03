"use client"; // 添加 "use client" 指令

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { ResponsiveContainer } from 'recharts';
import { ArrowLeftIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react'; // 导入向下和向上箭头图标
import { Button } from '@/components/ui/button';

const referralsData = [
    ['Producthunt.com', 'Tech News', '17.77%', '15.4k', 'New'],
    ['canva.com', 'Design', '17.77%', '15.4k', '22.82%'],
    ['g2.com', 'Tech News', '17.77%', '15.4k', '-67.93%'],
];

const Referrals = () => {
    const [isExpanded, setIsExpanded] = useState(false); // 控制展开/折叠状态

    const handleBack = () => {
        window.history.back();
    };

    const toggleExpand = () => {
        setIsExpanded(!isExpanded); // 切换展开/折叠状态
    };

    return (
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
                    <span className="text-black text-lg font-bold">Referrals</span>
                    <Button
                        variant="link"
                        onClick={toggleExpand}
                        className="ml-2 p-2 rounded-full flex items-center justify-center hover:bg-gray-100 focus:outline-none"
                    >
                        {isExpanded ? (
                            <ChevronUpIcon className="w-5 h-5 text-black" />
                        ) : (
                            <ChevronDownIcon className="w-5 h-5 text-black" />
                        )}
                    </Button>
                </CardTitle>
            </CardHeader>
            {isExpanded && (
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Link</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Traffic Share</TableHead>
                                    <TableHead>Traffic</TableHead>
                                    <TableHead>Change</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {referralsData.map((row, rowIndex) => (
                                    <TableRow key={rowIndex}>
                                        {row.map((cell, colIndex) => (
                                            <TableCell key={colIndex}>
                                                {colIndex === 0 ? (
                                                    <a href={`https://${cell}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 no-underline">
                                                        {cell}
                                                    </a>
                                                ) : (
                                                    cell
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </ResponsiveContainer>
                </CardContent>
            )}
        </Card>
    );
};

export default Referrals;
