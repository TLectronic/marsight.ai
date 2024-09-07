import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link";
import Image from "next/image";
import AIInsightsIcon from "@/public/aiinsights.svg";
import { ResponsiveContainer } from 'recharts'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { useAuth } from "@clerk/nextjs"
import axios from "axios";
import { headers } from "next/headers";

interface ReferralsRow {
  Link: string;
  category: string;
  TrafficShare: string;
  Traffic: string;
  Change: string;
}

interface ReferralsProps {
  referralsData: ReferralsRow[];
}

const Referrals: React.FC<ReferralsProps> = ({ referralsData }) => {
  const { getToken, isSignedIn } = useAuth();
  const template = 'markSightTest'

  const handleAIInsights = async () => {
    try {
      if (isSignedIn) {
        const jwtToken = await getToken({ template });
        console.log(jwtToken);
        const response = axios.post('https://zyzc73u8a0.execute-api.us-east-1.amazonaws.com/Alpha/chat/insight', {
          chatId: '75f58af9-6c03-11ef-a80e-93948447c487',
          type: '123',
        },
          {
            headers: {
              'Authorization': `Bearer ${jwtToken}`,
            }
          });
        console.log("返回的AIInsights:", response);
      }
    } catch (error) {
      console.error("Failed to post:", error);
    }
  }


  return (
    <>
      <Card className="rounded-[24px] p-2">
        <CardHeader>
          <div className='flex justify-between'>
            <CardTitle className='text-xl font-extrabold'>Referrals</CardTitle>
            <Button
              variant="link"
              asChild
              className="p-2 hover:bg-muted/50"
              onClick={handleAIInsights}
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
          <CardContent>
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
                    <TableCell>
                      <a
                        href={`https://${row.Link}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 no-underline"
                      >
                        {row.Link}
                      </a>
                    </TableCell>
                    <TableCell>{row.category}</TableCell>
                    <TableCell>{row.TrafficShare}</TableCell>
                    <TableCell>{row.Traffic}</TableCell>
                    <TableCell>{row.Change}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <div className="flex justify-end">
            <Button variant="link">
              <Link href="./1/secondaryPage/referrals" >
                Show more details
              </Link>
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
};

export { Referrals };

