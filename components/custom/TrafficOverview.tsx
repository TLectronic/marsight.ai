import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { DataBox } from '@/components/ui/databox'
import { PersonIcon, Share2Icon, HeartIcon, BellIcon, ClockIcon, ReaderIcon, EyeOpenIcon, BarChartIcon, ExternalLinkIcon } from '@radix-ui/react-icons';

interface TrafficOverviewProps {
  MonthlyVisits: string;
  UniqueVisitors: string;
  VisitDuration: string;
  PagesPerVisit: string;
  BounceRate: string;
  PageViews: string;
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
      <div className="text-2xl font-extrabold text-blue-700">Traffic Analysis</div>
      <Card className="rounded-[24px] p-2">
        <CardHeader>
          <CardTitle className='text-xl font-extrabold '>Traffic Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex justify-between flex-wrap space-x-4 mb-10 mt-2'>
            <DataBox
              spanText="Monthly Visits"
              paragraphText={MonthlyVisits}
              icon={<EyeOpenIcon />}
            />
            <DataBox
              spanText="Unique Visitors"
              paragraphText={UniqueVisitors}
              icon={<PersonIcon />}
            />
            <DataBox
              spanText="Visit Duration"
              paragraphText={VisitDuration}
              icon={<ClockIcon />}
            />
            <DataBox
              spanText="Pages Per Visit"
              paragraphText={PagesPerVisit}
              icon={<ReaderIcon />}
            />
            <DataBox
              spanText="Bounce Rate"
              paragraphText={BounceRate}
              icon={<ExternalLinkIcon />}
            />
            <DataBox
              spanText="Page Views"
              paragraphText={PageViews}
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