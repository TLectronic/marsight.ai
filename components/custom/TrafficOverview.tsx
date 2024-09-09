import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { DataBox } from '@/components/ui/databox'
import { PersonIcon, Share2Icon, HeartIcon, BellIcon, ClockIcon, ReaderIcon, EyeOpenIcon, BarChartIcon, ExternalLinkIcon } from '@radix-ui/react-icons';
import { ChartColumn } from "lucide-react";

interface TrafficOverviewProps {
  MonthlyVisits: number;
  UniqueVisitors: number;
  VisitDuration: number;
  PagesPerVisit: number;
  BounceRate: number;
  PageViews: number;
}

const lineChartData = [
  { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Jul', uv: 3490, pv: 4300, amt: 2100 },
]

// 工具函数
const formatNumberInMillions = (num: number) => (num / 1_000_000).toFixed(3) + 'M';
const formatBounceRate = (rate: number) => (rate * 100).toFixed(2) + '%';
const formatDuration = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const TrafficOverview: React.FC<TrafficOverviewProps> = ({
  MonthlyVisits,
  UniqueVisitors,
  VisitDuration,
  PagesPerVisit,
  BounceRate,
  PageViews
}) => {
  return (
    <>
      <div className="text-2xl font-extrabold text-[#5F5E5B] flex">
        <ChartColumn className="mt-1" />
        <div className="ml-2">Traffic Analysis</div>
      </div>
      <Card className="rounded-[24px] p-2">
        <CardHeader>
          <CardTitle className='text-xl font-extrabold text-[#4281DB]'>Traffic Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex justify-start flex-wrap mb-10 mt-2 space-x-6'>
            <DataBox
              spanText="Monthly Visits"
              paragraphText={formatNumberInMillions(MonthlyVisits)}
              icon={<EyeOpenIcon />}
            />
            <DataBox
              spanText="Unique Visitors"
              paragraphText={formatNumberInMillions(UniqueVisitors)}
              icon={<PersonIcon />}
            />
            <DataBox
              spanText="Visit Duration"
              paragraphText={formatDuration(VisitDuration)}
              icon={<ClockIcon />}
            />
            <DataBox
              spanText="Pages Per Visit"
              paragraphText={PagesPerVisit.toString()}
              icon={<ReaderIcon />}
            />
            <DataBox
              spanText="Bounce Rate"
              paragraphText={formatBounceRate(BounceRate)}
              icon={<ExternalLinkIcon />}
            />
            <DataBox
              spanText="Page Views"
              paragraphText={formatNumberInMillions(PageViews)}
              icon={<BarChartIcon />}
            />
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="pv" stroke="#4281DB" strokeWidth={3} />
              {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </>
  );
};

export { TrafficOverview };