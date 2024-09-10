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
  TotalSocialVisits: number;
  Mentions: number;
  TotalLikes: number;
  TotalShares: number;
}

const lineChartData = [
  { date_from: '2024-01-01', date_to: '2024-01-31', results_nb: 2400 },
  { date_from: '2024-02-01', date_to: '2024-02-28', results_nb: 1398 },
  { date_from: '2024-03-01', date_to: '2024-03-31', results_nb: 9800 },
  { date_from: '2024-04-01', date_to: '2024-04-30', results_nb: 3908 },
  { date_from: '2024-05-01', date_to: '2024-05-31', results_nb: 4800 },
  { date_from: '2024-06-01', date_to: '2024-06-30', results_nb: 3800 },
  { date_from: '2024-07-01', date_to: '2024-07-31', results_nb: 4300 },
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

const SocialMediaAnalysis: React.FC<SocialMediaAnalysisProps> = ({ TotalSocialVisits, Mentions, TotalLikes, TotalShares }) => {
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'; // 超过百万显示为M
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'; // 超过千显示为K
    }
    return num.toString(); // 小于1000则正常显示
  };


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
  const formattedLineChartData = lineChartData.map((entry) => ({
    name: `${entry.date_from} - ${entry.date_to}`,
    number: entry.results_nb,
  }));
  

  const renderLineChart = () => (
    <ResponsiveContainer height={400} width={750}>
      <LineChart data={formattedLineChartData} className='-ml-2'>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="number" stroke="#4281DB" strokeWidth={3} />
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
            <DataBox className="mt-16" spanText="Total social visits" paragraphText={formatNumber(TotalSocialVisits)} icon={<PersonIcon />} />
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
