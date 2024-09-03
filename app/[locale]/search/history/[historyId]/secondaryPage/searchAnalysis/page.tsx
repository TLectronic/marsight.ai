"use client"
import React from 'react';
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from 'lucide-react';
const handleBack = () => {
    window.history.back();
};
const SearchAnalysis = () => {
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
                    <span className="text-black text-lg font-bold">Organic Traffic</span>
                </CardTitle>
            </CardHeader>
        </Card>
  );
};

export default SearchAnalysis;