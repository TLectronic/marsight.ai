import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ProductAnalysisProps {
  ProductUrl: string;
  ProductSummary: string;
  TargetUsers: string[];
  CoreFeatures: string[];
  UseCases: string[];
}

const ProductAnalysis: React.FC<ProductAnalysisProps> = ({
  ProductUrl,
  ProductSummary,
  TargetUsers,
  CoreFeatures,
  UseCases,
}) => {
  return (
    <Card className="rounded-[24px]">
      <CardHeader>
        <CardTitle>Product Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-base font-bold mb-2">{ProductUrl}</div>
        <div className="text-sm mb-6">{ProductSummary}</div>
        <div className='border-black border-2 h-60'>
          <div className='flex justify-between text-xl'>
            <div className='flex-1'>
              <div className='text-center mb-16'>Target Users</div>
              <ul className='text-sm ml-4'>
                {TargetUsers.map((user, index) => (
                  <li key={index}>· {user}</li>
                ))}
              </ul>
            </div>
            <div className='flex-1'>
              <div className='text-center mb-16'>Core Features</div>
              <ul className='text-sm ml-4'>
                {CoreFeatures.map((feature, index) => (
                  <li key={index}>· {feature}</li>
                ))}
              </ul>
            </div>
            <div className='flex-1'>
              <div className='text-center mb-16'>Use Cases</div>
              <ul className='text-sm ml-4'>
                {UseCases.map((scenario, index) => (
                  <li key={index}>· {scenario}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { ProductAnalysis };