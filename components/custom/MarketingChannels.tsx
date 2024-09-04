import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

const barChartData = [
  { name: 'Direct', uv: 22.36, pv: 22.00 },
  { name: 'Email', uv: 0.03, pv: 0.03 },
  { name: 'Referrals', uv: 1.63, pv: 2.00 },
  { name: 'Social', uv: 3.28, pv: 4.00 },
  { name: 'Organicsearch', uv: 20.23, pv: 17.00 },
  { name: 'Paidsearch', uv: 4.33, pv: 3.00 },
];

const MarketingChannels = () => {
  return (
    <Card className="rounded-[24px]">
      <CardHeader>
        <CardTitle>Marketing Channels</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis
              tickFormatter={(value) => `${value}%`}
              domain={[0, 50]} // Adjusted for better visualization
            />
            <Tooltip
              formatter={(value) => `${value}%`}
              labelFormatter={(label) => `Channel: ${label}`}
            />
            <Legend />
            <Bar dataKey="pv" stackId="a" fill="#87CEFA" barSize={40} />
            <Bar dataKey="uv" stackId="a" fill="#00008B" barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export { MarketingChannels };