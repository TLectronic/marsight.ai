import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

const barChartData = [
  { name: 'Direct', uv: 44.36 },
  { name: 'Email', uv: 0.06},
  { name: 'Referrals', uv: 3.63},
  { name: 'Social', uv: 7.28},
  { name: 'Organicsearch', uv: 37.2},
  { name: 'Paidsearch', uv: 7.33},
];

const MarketingChannels = () => {
  return (
    <>
      <Card className="rounded-[24px] p-2">
        <CardHeader>
          <CardTitle className="text-xl font-extrabold text-[#4281DB]">Marketing Channels</CardTitle>
        </CardHeader>
        <CardContent className="mt-6">
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
              <Bar dataKey="uv" stackId="a" fill="#3E74FE" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </>
  )
}

export { MarketingChannels };