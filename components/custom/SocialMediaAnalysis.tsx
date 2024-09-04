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


interface SocialMediaMention {
  spanText: string;
  paragraphText: string;
}

interface SocialMediaAnalysisProps {
  smMentions: SocialMediaMention[];
}

const SocialMediaAnalysis: React.FC<SocialMediaAnalysisProps> = ({ smMentions }) => {
  const renderPieChart = () => (
    <ResponsiveContainer width={600} height={300}>
      <PieChart>
        <Pie
          data={pieChartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          innerRadius={50}
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
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={lineChartData}>
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
    <Card className="rounded-[24px]">
      <CardHeader>
        <CardTitle>Social Media Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="font-semibold leading-none tracking-tight ml-12 mb-6">Social Distribution</div>
        <div className="flex justify-around">
          <DataBox className="ml-20 mt-20" spanText="Total social visits" paragraphText="45.2K" />
          {renderPieChart()}
        </div>
        <div className="font-semibold leading-none tracking-tight ml-12 mt-4 mb-8">Social Media Mentions</div>
        <div className="flex justify-between ml-12 w-4/6 mb-4">
          {smMentions.map((smmention, index) => (
            <DataBox key={index} spanText={smmention.spanText} paragraphText={smmention.paragraphText} />
          ))}
        </div>
        <div className="flex">
          {renderLineChart()}
          {renderPieChart()}
        </div>
      </CardContent>
    </Card>
  );
};

export { SocialMediaAnalysis };
