import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, ResponsiveContainer,
} from 'recharts';
import { DataBox } from '@/components/ui/databox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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

const COLORS = ['#082D64', '#FF8042', '#00C49F', '#FFBB28', '#0088FE', '#F5F5F4'];


interface SocialMediaAnalysisProps {
  Mentions: string;
  TotalLikes: string;
  TotalShares: string;
}


const SocialMediaAnalysis: React.FC<SocialMediaAnalysisProps> = ({ Mentions, TotalLikes, TotalShares }) => {
  const renderPieChart = () => (
    <ResponsiveContainer width={200} height={200}>
      <PieChart>
        <Pie
          data={pieChartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={30}
          innerRadius={10}
          fill="#8884d8"
          dataKey="value"
        >
          {pieChartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );

  const renderLineChart = () => (
    <ResponsiveContainer width={200} height={200}>
      <LineChart data={lineChartData} className='-ml-2'>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="pv" stroke="#8884d8" />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );

  return (
    <>
      <div className='text-2xl'>Social Media Analysis</div>
      <div className='flex justify-between'>
        <Card className="rounded-md w-[420px] h-[400px] p-2">
          <CardContent>
            <CardTitle className='text-xl font-normal'>Social Distribution</CardTitle>
            <div className="flex justify-between">
              <DataBox className="mt-10" spanText="Total social visits" paragraphText="45.2K" />
              {renderPieChart()}
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-md w-[420px] h-[400px] p-2">
          <CardContent>
            <CardTitle className='text-xl font-normal'>Social Media Mentions</CardTitle>
            <div className="flex justify-between w-full mb-4 mt-10">
              <DataBox
                spanText="Mentions"
                paragraphText={Mentions}
              />
              <DataBox
                spanText="total number of likes"
                paragraphText={TotalLikes}
              />
              <DataBox
                spanText="total number of shares"
                paragraphText={TotalShares}
              />
            </div>
            <div className="flex">
              {renderLineChart()}
              {renderPieChart()}
            </div>
          </CardContent>
        </Card>
      </div>
    </>

  );
};

export { SocialMediaAnalysis };
