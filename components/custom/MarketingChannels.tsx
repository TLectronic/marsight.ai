import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

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
              <Bar dataKey="pv" stackId="a" fill="#A9C8FE" barSize={40} />
              <Bar dataKey="uv" stackId="a" fill="#3E74FE" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </>
  )
}

export { MarketingChannels };