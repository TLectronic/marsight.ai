"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { ResponsiveContainer } from 'recharts';
import { ArrowLeftIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const referralsData = [
    {
        link: 'Producthunt.com',
        category: 'Tech News',
        trafficShare: '17.77%',
        traffic: '15.4k',
        change: 'New',
        details: ['https://Producthunt.com', 'https://Producthunt.com', 'https://Producthunt.com']
    },
    {
        link: 'canva.com',
        category: 'Design',
        trafficShare: '17.77%',
        traffic: '15.4k',
        change: '22.82%',
        details: ['https://canva.com', 'https://canva.com', 'https://canva.com']
    },
    {
        link: 'g2.com',
        category: 'Tech News',
        trafficShare: '17.77%',
        traffic: '15.4k',
        change: '-67.93%',
        details: ['https://g2.com', 'https://g2.com', 'https://g2.com']
    }
];

const Referrals = () => {
    const [expandedRowIndex, setExpandedRowIndex] = useState<number | null>(null);

    const handleBack = () => {
        window.history.back();
    };

    const handleExpand = (rowIndex: number) => {
        setExpandedRowIndex(expandedRowIndex === rowIndex ? null : rowIndex);
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
                </CardTitle>
            </CardHeader>
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
                                <React.Fragment key={rowIndex}>
                                    <TableRow>
                                        <TableCell>
                                            <div className="flex items-center space-x-2">
                                                <Button
                                                    onClick={() => handleExpand(rowIndex)}
                                                    variant='link'
                                                    className="p-1 rounded-full flex items-center justify-center hover:bg-gray-100 focus:outline-none"
                                                >
                                                    {expandedRowIndex === rowIndex ? (
                                                        <ChevronUpIcon className="w-5 h-5 text-black" />
                                                    ) : (
                                                        <ChevronDownIcon className="w-5 h-5 text-black" />
                                                    )}
                                                </Button>
                                                <a href={`https://${row.link}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 no-underline">
                                                    {row.link}
                                                </a>
                                            </div>
                                        </TableCell>
                                        <TableCell>{row.category}</TableCell>
                                        <TableCell>{row.trafficShare}</TableCell>
                                        <TableCell>{row.traffic}</TableCell>
                                        <TableCell>{row.change}</TableCell>
                                    </TableRow>
                                    {expandedRowIndex === rowIndex && (
                                        <TableRow>
                                            <TableCell colSpan={5}>
                                                <div className="ml-8">
                                                    {row.details.map((detail, detailIndex) => (
                                                        <div key={detailIndex} className="border-b border-gray-200 py-2">
                                                            <a href={detail} target="_blank" rel="noopener noreferrer" className="text-blue-500 no-underline">
                                                                {detail}
                                                            </a>
                                                        </div>
                                                    ))}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </React.Fragment>
                            ))}
                        </TableBody>
                    </Table>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

export default Referrals;
