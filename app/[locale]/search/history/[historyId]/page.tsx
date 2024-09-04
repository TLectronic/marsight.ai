"use client"
import React, { useState, useRef, useEffect } from 'react'
import { Resizable } from 're-resizable'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { Send, PaperclipIcon, Search } from 'lucide-react'
import Link from "next/link";
import { Button } from "@/components/ui/button"
import { DataBox } from '@/components/ui/databox'
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { ProductAnalysis } from '@/components/custom/ProductAnalysis'
import { TrafficOverview } from '@/components/custom/TrafficOverview'
import { MarketingChannels } from '@/components/custom/MarketingChannels'
import { Influencers } from '@/components/custom/Influencers'
import { Mentions } from '@/components/custom/Mentions'
import { SocialMediaAnalysis } from '@/components/custom/SocialMediaAnalysis'

import Image from "next/image";
import AIInsightsIcon from "@/public/aiinsights.svg";

const lineChartData = [
  { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Jul', uv: 3490, pv: 4300, amt: 2100 },
]

const barChartData = [
  { name: 'Direct', uv: 22.36, pv: 22.00 },
  { name: 'Email', uv: 0.03, pv: 0.03 },
  { name: 'Referrals', uv: 1.63, pv: 2.00 },
  { name: 'Social', uv: 3.28, pv: 4.00 },
  { name: 'Organicsearch', uv: 20.23, pv: 17.00 },
  { name: 'Paidsearch', uv: 4.33, pv: 3.00 },
];

const pieChartData = [
  { name: 'Youtube', value: 62.6 },
  { name: 'Instagram', value: 8.76 },
  { name: 'Facebook', value: 6.57 },
  { name: 'WhatsApp Webapp', value: 6.3 },
  { name: 'VKontakte', value: 3.27 },
  { name: 'Others', value: 12.5 },
]

const COLORS = ['#082D64', '#FF8042', '#00C49F', '#FFBB28', '#0088FE', '#F5F5F4']


// 搜索分析 数据
const searchData = [
  {
    spanText: 'No.of Keywords',
    paragraphText: '5968',
  },
  {
    spanText: 'No.of Clicks',
    paragraphText: '1.190M',
  },
  {
    spanText: 'Of All Total Traffic',
    paragraphText: '44.56%',
  },
  {
    spanText: 'Organic vs . Paid',
    paragraphText: '8 : 2',
  },
];

// 流量总览 数据
const trafficData = {
  MonthlyVisits: "2.672M",
  UniqueVisitors: "1.135M",
  VisitDuration: "00:04:47",
  PagesPerVisit: "4.46",
  BounceRate: "44.87%",
  PageViews: "11.93M",
};

// 社交媒体提及 数据
const smMentions = [
  {
    spanText: 'Mentions',
    paragraphText: '3974',
  },
  {
    spanText: 'total number of likes',
    paragraphText: '111',
  },
  {
    spanText: 'total number of shares',
    paragraphText: '222',
  },
];

// 博主表格内数据

const referralsData = [
  ['Producthunt.com', 'Tech News', '17.77%', '15.4k', 'New'],
  ['canva.com', 'Design', '17.77%', '15.4k', '22.82%'],
  ['g2.com', 'Tech News', '17.77%', '15.4k', '-67.93%'],
];

export default function Component() {

  const [messages, setMessages] = useState([
    { role: 'assistant', content: '您好！我是AI助手。您有什么想问的吗？' }
  ])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<any>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { role: 'user', content: input }])
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'assistant', content: `这是对"${input}"的模拟回复。这是一个较长的回复，用于测试文本换行功能。它应该在宽度变小时自动换行，以保持良好的可读性。` }])
      }, 1000)
      setInput('')
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#f4f4f4]">
      <Resizable
        defaultSize={{
          width: '70%',
          height: '100%',
        }}
        enable={{ right: false }}
        handleComponent={{
          right: <div className="w-1 h-full bg-gray-300 cursor-col-resize hover:bg-gray-400 transition-colors" />
        }}
      >
        <div className="h-full overflow-auto">
          <div className="p-4 space-y-4 min-w-[500px]">

            <ProductAnalysis
              ProductUrl='heygen.com'
              ProductSummary='heygen is an innovative video platform that harnesses the power of generative ai to streamline your video creation process.'
              TargetUsers={["Businesses of all sizes", "Marketers", "Sales teams"]}
              CoreFeatures={["Text-to-Video Conversion", "100+ Customizable Avatars", "300+ Voices in 40+ Languages"]}
              UseCases={["Marketing Campaigns", "Product Demonstrations", "Social Media Content"]}
            />
            <TrafficOverview
              MonthlyVisits={trafficData.MonthlyVisits}
              UniqueVisitors={trafficData.UniqueVisitors}
              VisitDuration={trafficData.VisitDuration}
              PagesPerVisit={trafficData.PagesPerVisit}
              BounceRate={trafficData.BounceRate}
              PageViews={trafficData.PageViews}
            />
            <MarketingChannels />

            <Card className="rounded-[24px]">
              <CardHeader>
                <div className='flex justify-between'>
                  <CardTitle>Referrals</CardTitle>
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
                  <ResponsiveContainer width="100%" height={300}>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Link</TableHead>
                          <TableHead>category</TableHead>
                          <TableHead>Traffic Share</TableHead>
                          <TableHead>Traffic</TableHead>
                          <TableHead>Change</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {referralsData.map((row, rowIndex) => (
                          <TableRow key={rowIndex}>
                            {row.map((cell, colIndex) => (
                              <TableCell key={colIndex}>
                                {colIndex === 0 ? (
                                  <a href={`https://${cell}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 no-underline">
                                    {cell}
                                  </a>
                                ) : (
                                  cell
                                )}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ResponsiveContainer>
                </CardContent>
                <div className="flex justify-end">
                  <Button variant="link">
                    <Link href="./1/secondaryPage/referrals" >
                      Show more details
                    </Link>
                  </Button>
                </div>

              </div>

            </Card>

            <SocialMediaAnalysis />

            <Mentions />

            <Influencers />

          </div>
        </div>
      </Resizable>

      <div className="flex-1 flex flex-col bg-white">
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
              >
                <div
                  className={`max-w-[70%] p-2 rounded-lg ${message.role === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800'
                    }`}
                >
                  <p className="break-words">{message.content}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        <div className="p-4 border-t border-gray-200">
          <div className="relative">
            <Textarea
              placeholder="输入您的问题..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
              className="pr-24 min-h-[100px] resize-none"
              rows={4}
            />
            <div className="absolute bottom-2 right-2 flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <PaperclipIcon className="h-4 w-4" />
              </Button>
              <Button onClick={handleSend} className="bg-black text-white hover:bg-gray-800">
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}