"use client"
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { ResponsiveContainer } from 'recharts';

import { ArrowLeftIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
const referralsData = [
    ['Producthunt.com', 'Tech News', '17.77%', '15.4k', 'New'],
    ['canva.com', 'Design', '17.77%', '15.4k', '22.82%'],
    ['g2.com', 'Tech News', '17.77%', '15.4k', '-67.93%'],
];
const handleBack = () => {
    window.history.back();
};
const Referrals = () => {
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
                                <TableHead>category</TableHead>
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
        </Card>
    );
};

export default Referrals;