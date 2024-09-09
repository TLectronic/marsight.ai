import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import heygenIcon from "@/public/heygen.svg";
import Image from "next/image";

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
    <>
      <div className="text-2xl font-extrabold text-[#5F5E5B]">Product Analysis</div>
      <Card className="rounded-[24px] p-2">
        <CardContent>
          <div className="text-base font-bold mb-2 mt-2 flex items-center">
            <Image
              src={heygenIcon}
              alt="Mail"
              width={24}
              height={24}
              className="w-32 mb-2 mt-2"
            />
            {/* <div className="font-normal">{ProductUrl}</div> */}
          </div>
          <div className="text-sm leading-relaxed mt-2 mb-2">{ProductSummary}</div>
          <div className='border-black border-2 mt-2 mb-2'>
            <div className='flex justify-between text-xl'>

              <div className='flex-1'>
                <div className='text-center mb-8 mt-6 font-bold'>Target Users</div>
                <ul className="text-sm text-left mb-10 ml-10">
                  {TargetUsers.map((user, index) => (
                    <li key={index}>· {user}</li>
                  ))}
                </ul>
              </div>

              <div className='flex-1'>
                <div className='text-center mb-8 mt-6 font-bold'>Core Features</div>
                <ul className='text-sm text-left ml-7'>
                  {CoreFeatures.map((feature, index) => (
                    <li key={index}>· {feature}</li>
                  ))}
                </ul>
              </div>

              <div className='flex-1'>
                <div className='text-center mb-8 mt-6 font-bold'>Use Cases</div>
                <ul className='text-sm text-left ml-10'>
                  {UseCases.map((scenario, index) => (
                    <li key={index}>· {scenario}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export { ProductAnalysis };