"use client"
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { ArrowLeftIcon } from 'lucide-react';
import { TriangleDownIcon, TriangleRightIcon } from '@radix-ui/react-icons';
const handleBack = () => {
    window.history.back();
};
const SearchAnalysis = () => {
    const [selectedOption, setSelectedOption] = useState('Organic Traffic');
    // 大表格相关内容
    const [isExpanded, setIsExpanded] = useState(true);
    // 切换展开/折叠状态
    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    }


    return (
        <div className="bg-[#f4f4f4] w-full h-full p-4 space-y-4">
            <Card className="rounded-[24px] mx-4 ">
                <CardHeader>

                    <CardTitle className="flex items-center space-x-2">
                        <Button
                            variant="link"
                            onClick={handleBack}
                            className="bg-white text-black p-2 rounded-full flex items-center justify-center hover:bg-white hover:border-transparent focus:border-transparent"
                        >
                            <ArrowLeftIcon className="w-5 h-5" />
                        </Button>
                        <Select defaultValue="Organic Traffic" onValueChange={(value) => setSelectedOption(value)}>
                            <SelectTrigger className="text-base flex h-9 w-full items-center justify-between bg-transparent px-3 py-2 shadow-sm ring-offset-background focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1">
                                <SelectValue placeholder="Select an option" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Organic Traffic">
                                    <CardTitle>Organic Traffic</CardTitle>
                                </SelectItem>
                                <SelectItem value="Paid Traffic">
                                    <CardTitle>Paid Traffic</CardTitle>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Keywords</TableHead>
                                <TableHead>Clicks</TableHead>
                                <TableHead>Traffic</TableHead>
                                <TableHead>ClicksChange</TableHead>
                                <TableHead>ChangeVolume</TableHead>
                                <TableHead>Change of volume</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableRow>

                            <Button variant="link" onClick={toggleExpand} className='text-black hover:no-underline px-2'>
                                <div className='bg-blue-100 rounded-xl px-2'>Branded Keywords</div>
                                <div className='ml-6'>2条记录</div>
                                {isExpanded ? (<TriangleDownIcon />) : (<TriangleRightIcon />)}
                            </Button>

                        </TableRow>


                        {isExpanded && (<TableBody>
                            <TableRow>
                                <TableCell>heygen</TableCell>
                                <TableCell>1060150</TableCell>
                                <TableCell>65.06%</TableCell>
                                <TableCell>21.76%</TableCell>
                                <TableCell>1237740.00</TableCell>
                                <TableCell>17.88%</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>heygen ai</TableCell>
                                <TableCell>149930</TableCell>
                                <TableCell>9.20%</TableCell>
                                <TableCell>33.75%</TableCell>
                                <TableCell>196180.00</TableCell>
                                <TableCell>31.81%</TableCell>
                            </TableRow>
                        </TableBody>)}

                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default SearchAnalysis;