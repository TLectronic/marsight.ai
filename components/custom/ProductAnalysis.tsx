import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import heygenIcon from "@/public/heygen.svg";
import Image from "next/image";
import { Target } from "lucide-react";

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
      <div className="text-2xl font-extrabold text-[#5F5E5B] flex">
        <Target className="mt-1" />
        <div className="ml-2">Product Analysis</div>
      </div>
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
          <div className='flex justify-between text-xl'>
            <div className='flex-1 flex flex-col'>
              <div className='text-center mb-8 mt-6 font-bold'>Target Users</div>

              <div className="flex-1 bg-[#f7f7f5] p-4">
                <ul className="text-sm text-left mb-10 ml-10">
                  {TargetUsers.map((user, index) => (
                    <li key={index}>· {user}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className='flex-1 flex flex-col'>
              <div className='text-center mb-8 mt-6 font-bold'>Core Features</div>

              <div className="flex-1 bg-[#f7f7f5] p-4">
                <ul className='text-sm text-left ml-7'>
                  {CoreFeatures.map((feature, index) => (
                    <li key={index}>· {feature}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className='flex-1 flex flex-col'>
              <div className='text-center mb-8 mt-6 font-bold'>Use Cases</div>

              <div className="flex-1 bg-[#f7f7f5] p-4">
                <ul className='text-sm text-left'>
                  {UseCases.map((scenario, index) => (
                    <li key={index}>· {scenario}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* </div> */}
        </CardContent>
      </Card>
    </>
  );
};

export { ProductAnalysis };