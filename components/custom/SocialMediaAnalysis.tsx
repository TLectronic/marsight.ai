import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, ResponsiveContainer, LegendProps
} from 'recharts';
import { DataBox } from '@/components/ui/databox';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { PersonIcon, Share2Icon, HeartIcon, BellIcon } from '@radix-ui/react-icons';
import { Share2 } from "lucide-react";

interface SocialMediaAnalysisProps {
  Mentions: string;
  TotalLikes: string;
  TotalShares: string;
}

const lineChartData = [
  { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Jul', uv: 3490, pv: 4300, amt: 2100 },
];

const pieChartData = [
  { name: 'Youtube', value: 62.6 },
  { name: 'Instagram', value: 8.76 },
  { name: 'Facebook', value: 6.57 },
  { name: 'WhatsApp Webapp', value: 6.3 },
  { name: 'VKontakte', value: 3.27 },
  { name: 'Others', value: 12.5 },
];

const COLORS = ['#082D64', '#FF8042', '#00C49F', '#FFBB28', '#0088FE', '#E6E9EC'];

const CustomLegend = (props: LegendProps) => {
  const { payload } = props;
  if (!payload) return null;

  const total = pieChartData.reduce((sum, entry) => sum + entry.value, 0);

  return (
    <ul>
      {payload.map((entry, index) => {
        const data = pieChartData.find(data => data.name === entry.value);
        const value = data ? data.value : 0;
        const percentage = total > 0 ? ((value / total) * 100).toFixed(2) : '0.00';
        return (
          <li key={`item-${index}`} style={{ marginBottom: '5px' }}>
            <span style={{ color: entry.color }}>{entry.value}</span> : {percentage}%
          </li>
        );
      })}
    </ul>
  );
};

const SocialMediaAnalysis: React.FC<SocialMediaAnalysisProps> = ({ Mentions, TotalLikes, TotalShares }) => {
  const totalSocialVisits= '45.2K';
  const renderPieChart = () => (
    <ResponsiveContainer width={400} height={200}>
      <PieChart>
        <Pie
          data={pieChartData}
          cx="40%"
          cy="50%"
          labelLine={false}
          outerRadius={50}
          innerRadius={30}
          fill="#8884d8"
          dataKey="value"
        >
          {pieChartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend content={CustomLegend as any} layout="vertical" align="right" verticalAlign="middle" />
      </PieChart>
    </ResponsiveContainer>
  );

  const renderLineChart = () => (
    <ResponsiveContainer height={400} width={750}>
      <LineChart data={lineChartData} className='-ml-2'>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="pv" stroke="#4281DB" strokeWidth={3} />
      </LineChart>
    </ResponsiveContainer>
  );

  return (
    <>
      <div className='text-2xl font-extrabold text-[#5F5E5B] flex'>
        <Share2 className="mt-1" />
        <div className="ml-2">Social Media Analysis</div>
      </div>

      <Card className="rounded-[24px] p-2 pt-6">
        <CardContent>
          <CardTitle className="text-xl font-extrabold text-[#4281DB]">Social Distribution</CardTitle>
          <div className="flex justify-around">
            {/* DataBox 上部内容 */}
            <DataBox className="mt-16" spanText="Total social visits" paragraphText={totalSocialVisits}  icon={<PersonIcon />} />
            {/* 饼图 */}
            <div>
              {renderPieChart()}
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="rounded-[24px] p-2 pt-6">
        <CardContent>
          <CardTitle className='text-xl font-extrabold text-[#4281DB]'>Social Media Mentions</CardTitle>
          <div className="flex justify-start w-full mb-10 mt-10 space-x-20">
            <DataBox
              spanText="Mentions"
              paragraphText={Mentions}
              icon={<BellIcon />}
            />
            <DataBox
              spanText="total number of likes"
              paragraphText={TotalLikes}
              icon={<HeartIcon />}
            />
            <DataBox
              spanText="total number of shares"
              paragraphText={TotalShares}
              icon={<Share2Icon />}
            />
          </div>
          <div>
            {renderLineChart()}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export { SocialMediaAnalysis };
