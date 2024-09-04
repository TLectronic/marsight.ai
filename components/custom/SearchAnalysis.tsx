import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DataBox } from '@/components/ui/databox'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'
import { Button } from "@/components/ui/button"
import Link from "next/link";
import Image from "next/image";
import AIInsightsIcon from "@/public/aiinsights.svg";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { TriangleDownIcon, TriangleRightIcon } from '@radix-ui/react-icons'

// 最上面的四个盒子的数据
interface SearchAnalysisProps {
  NoofKeywords: string;
  NoofClicks: string;
  OfAllTotalTraffic: string;
  OrganicvsPaid: string;
}

// 表格里每一行的数据
interface TrafficRow {
  Keywords: string;
  Clicks: string;
  Traffic: string;
  ClicksChange: string;
  ChangeVolume: string;
  Changeofvolume: string;
}

// 一组数据
interface DataGroup {
  KeywordClass: string;
  data: TrafficRow[];
}

// 自然流量数据
interface OrganicTrafficData {
  data: DataGroup[];
}

// 付费流量数据
interface PaidTrafficData {
  data: DataGroup[];
}

// 组件接收的数据
interface SearchAnalysisComponentProps {
  dataofbox: SearchAnalysisProps;
  organic: OrganicTrafficData;
  paid: PaidTrafficData;
}

const SearchAnalysis: React.FC<SearchAnalysisComponentProps> = ({ dataofbox, organic, paid }) => {
  // 根据下拉框的选项来决定要渲染的数据
  const [selectedOption, setSelectedOption] = useState('organic');
  const dataToShow = selectedOption === 'organic' ? organic : paid;

  // 大表格相关内容
  const [isExpanded, setIsExpanded] = useState(true);
  // 切换展开/折叠状态
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  }

  return (
    <Card className="rounded-[24px]">
      <CardHeader>
        <CardTitle>Search Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex justify-between flex-wrap space-x-4 mb-4'>
          <DataBox
            spanText="No.of Keywords"
            paragraphText={dataofbox.NoofKeywords}
          />
          <DataBox
            spanText="No.of Clicks"
            paragraphText={dataofbox.NoofClicks}
          />
          <DataBox
            spanText="Of All Total Traffic"
            paragraphText={dataofbox.OfAllTotalTraffic}
          />
          <DataBox
            spanText="Organic vs. Paid"
            paragraphText={dataofbox.OrganicvsPaid}
          />
        </div>
      </CardContent>
      <CardHeader>
        <div className='flex justify-between'>
          <div>
            <Select defaultValue="organic" onValueChange={(value) => setSelectedOption(value)}>
              <SelectTrigger className="text-base flex h-9 w-full items-center justify-between bg-transparent px-3 py-2 shadow-sm ring-offset-background focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="organic">
                  <CardTitle>Organic Traffic</CardTitle>
                </SelectItem>
                <SelectItem value="paid">
                  <CardTitle>Paid Traffic</CardTitle>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            variant="link"
            asChild
            className="p-2 hover:bg-muted/50"
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
                <TableHead>Keywords</TableHead>
                <TableHead>Clicks</TableHead>
                <TableHead>Traffic</TableHead>
                <TableHead>ClicksChange</TableHead>
                <TableHead>ChangeVolume</TableHead>
                <TableHead>Change of volume</TableHead>
              </TableRow>
            </TableHeader>
            {dataToShow.data.map((datagroup, index) => (
              <>
                <TableRow key={index}>
                  <Button variant="link" onClick={toggleExpand} className='text-black hover:no-underline px-2'>
                    <div className='bg-blue-100 rounded-xl px-2'>{datagroup.KeywordClass}</div>
                    <div className='ml-6'>2条记录</div>
                    {isExpanded ? (<TriangleDownIcon />) : (<TriangleRightIcon />)}
                  </Button>
                </TableRow>
                {isExpanded && (<TableBody>
                  {datagroup.data.map((trafficrow, index) => (
                    <TableRow key={index}>
                      <TableCell>{trafficrow.Keywords}</TableCell>
                      <TableCell>{trafficrow.Clicks}</TableCell>
                      <TableCell>{trafficrow.Traffic}</TableCell>
                      <TableCell>{trafficrow.ClicksChange}</TableCell>
                      <TableCell>{trafficrow.ChangeVolume}</TableCell>
                      <TableCell>{trafficrow.Changeofvolume}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>)}
              </>
            ))}
          </Table>
        </CardContent>
        <div className="flex justify-end">
          <Button variant="link">
            <Link href="./1/secondaryPage/searchAnalysis">
              Show more search terms
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export { SearchAnalysis };