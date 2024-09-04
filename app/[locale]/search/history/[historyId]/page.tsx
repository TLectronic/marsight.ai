"use client"
import React, { useState, useRef, useEffect } from 'react'
import { Resizable } from 're-resizable'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { Send, PaperclipIcon, Search } from 'lucide-react'
import Link from "next/link";
import * as Avatar from '@radix-ui/react-avatar';
import { Button } from "@/components/ui/button"
import { DataBox } from '@/components/ui/databox'
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { MentionBox } from "@/components/ui/mention-box"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'

import { ProductAnalysis } from '@/components/custom/ProductAnalysis'
import { TrafficOverview } from '@/components/custom/TrafficOverview'
import { MarketingChannels } from '@/components/custom/MarketingChannels'

import { GitHubLogoIcon, TriangleDownIcon, TriangleRightIcon, TwitterLogoIcon } from '@radix-ui/react-icons'

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

// 最火爆的提及 数据
const mentions = [
  {
    avatarSrc: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
    fallbackText: 'error',
    title: 'Imagine ter o seu proprio influe...',
    date: '2024-08-22 05:15',
    link: 'https://instagram.com',
    tags: '#robo #vocesabia #curiosidades #dicas'
  },
  {
    avatarSrc: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
    fallbackText: 'error',
    title: 'Odetta Rockhead-Kerr',
    date: '2024-08-12 05:00',
    link: 'https://youtube.com',
    tags: 'ROCKSTAR to get an additional 10% off.'
  },
];

// 红人的提及 数据
const mentionsFrom = [
  {
    avatarSrc: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
    fallbackText: 'error',
    title: '1',
    date: '2024-08-22 05:15',
    link: 'https://instagram.com',
    tags: '#robo #vocesabia #curiosidades #dicas'
  },
  {
    avatarSrc: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
    fallbackText: 'error',
    title: '2',
    date: '2024-08-12 05:00',
    link: 'https://youtube.com',
    tags: 'ROCKSTAR to get an additional 10% off.'
  },
];


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

// 博主表格表头数据
const tableHeader = ['', 'Profile name', '', 'Site', 'Mentions', 'Followers'];
// 博主表格内数据

const referralsData = [
  ['Producthunt.com', 'Tech News', '17.77%', '15.4k', 'New'],
  ['canva.com', 'Design', '17.77%', '15.4k', '22.82%'],
  ['g2.com', 'Tech News', '17.77%', '15.4k', '-67.93%'],
];

export default function Component() {
  // 根据下拉框的选项来决定要渲染的数据
  const [selectedOption, setSelectedOption] = useState('popular');
  const dataToShow = selectedOption === 'popular' ? mentions : mentionsFrom;

  // 大表格相关内容
  const [isExpanded, setIsExpanded] = useState(true);
  // 切换展开/折叠状态
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  }

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



            <Card className="rounded-[24px]">
              <CardHeader>
                <CardTitle>Search Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='flex justify-between flex-wrap space-x-4 mb-4'>
                  {searchData.map((search, index) => (
                    <DataBox
                      key={index}
                      spanText={search.spanText}
                      paragraphText={search.paragraphText}
                    />
                  ))}
                </div>
              </CardContent>

              <CardHeader>
                <div className='flex justify-between'>
                  <div>
                    <Select defaultValue="organic">
                      <SelectTrigger className="text-base flex h-9 w-full items-center justify-between bg-transparent px-3 py-2 shadow-sm ring-offset-background focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="organic">
                          <CardTitle>Organic Traffic</CardTitle>
                        </SelectItem>
                        <SelectItem value="paid">
                          <CardTitle>Paid Traffic</CardTitle>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
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
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Keywords</TableHead>
                        <TableHead>Clicks</TableHead>
                        <TableHead>Traffic</TableHead>
                        <TableHead>ClicksChange</TableHead>
                        <TableHead>ChangeVolume</TableHead>
                        <TableHead>Change of volume</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableRow>

                      <Button variant="link" onClick={toggleExpand} className='text-black hover:no-underline px-2'>
                        <div className='bg-blue-100 rounded-xl px-2'>Branded Keywords</div>
                        <div className='ml-6'>2条记录</div>
                        {isExpanded ? (<TriangleDownIcon />) : (<TriangleRightIcon />)}
                      </Button>

                    </TableRow>

                    {isExpanded && (<TableBody>
                      <TableRow>
                        <TableCell>heygen</TableCell>
                        <TableCell>1060150</TableCell>
                        <TableCell>65.06%</TableCell>
                        <TableCell>21.76%</TableCell>
                        <TableCell>1237740.00</TableCell>
                        <TableCell>17.88%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>heygen ai</TableCell>
                        <TableCell>149930</TableCell>
                        <TableCell>9.20%</TableCell>
                        <TableCell>33.75%</TableCell>
                        <TableCell>196180.00</TableCell>
                        <TableCell>31.81%</TableCell>
                      </TableRow>
                    </TableBody>)}

                    <TableRow>
                      <Button variant="link" onClick={toggleExpand} className='text-black hover:no-underline px-2'>
                        <div className='bg-orange-100 rounded-xl px-2'>Non-Branded Keywords</div>
                        <div className='ml-6'>3条记录</div>
                        {isExpanded ? (<TriangleDownIcon />) : (<TriangleRightIcon />)}
                      </Button>
                    </TableRow>

                    {isExpanded && (<TableBody>
                      <TableRow>
                        <TableCell>heygen</TableCell>
                        <TableCell>1060150</TableCell>
                        <TableCell>65.06%</TableCell>
                        <TableCell>21.76%</TableCell>
                        <TableCell>1237740.00</TableCell>
                        <TableCell>17.88%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>heygen ai</TableCell>
                        <TableCell>149930</TableCell>
                        <TableCell>9.20%</TableCell>
                        <TableCell>33.75%</TableCell>
                        <TableCell>196180.00</TableCell>
                        <TableCell>31.81%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>heygen ai</TableCell>
                        <TableCell>149930</TableCell>
                        <TableCell>9.20%</TableCell>
                        <TableCell>33.75%</TableCell>
                        <TableCell>196180.00</TableCell>
                        <TableCell>31.81%</TableCell>
                      </TableRow>
                    </TableBody>)}

                  </Table>
                </CardContent>
                <div className="flex justify-end">
                  <Button variant="link">
                    <Link href="./1/secondaryPage/searchAnalysis">
                      Show more search terms
                    </Link>
                  </Button>
                </div>
              </div>

            </Card>




            <Card className="rounded-[24px]">
              <CardHeader>
                <CardTitle>Social Media Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='font-semibold leading-none tracking-tight ml-12 mb-6'>Social Distribution</div>
                <div className='flex justify-around'>
                  <DataBox
                    className='ml-20 mt-20'
                    spanText='Total social visits'
                    paragraphText='45.2K'
                  />
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
                </div>
                <div className='font-semibold leading-none tracking-tight ml-12 mt-4 mb-8'>Social Media Mentions</div>
                <div className='flex justify-between ml-12 w-4/6 mb-4'>
                  {smMentions.map((smmention, index) => (
                    <DataBox
                      key={index}
                      spanText={smmention.spanText}
                      paragraphText={smmention.paragraphText}
                    />
                  ))}
                </div>
                <div className='flex'>
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
                  <ResponsiveContainer width="100%" height={300}>
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
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[24px]">
              <CardHeader>
                <div className='flex justify-between'>
                  <div>
                    <Select defaultValue="popular" onValueChange={(value) => setSelectedOption(value)}>
                      <SelectTrigger className="text-base flex h-9 w-full items-center justify-between bg-transparent px-3 py-2 shadow-sm ring-offset-background focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="popular">
                          <CardTitle>The most popular mentions</CardTitle>
                        </SelectItem>
                        <SelectItem value="profiles">
                          <CardTitle>Mentions from the most popular public profiles</CardTitle>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

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
              <CardContent>
                <div className='grid divide-y'>
                  {dataToShow.map((data, index) => (
                    <MentionBox
                      key={index}
                      avatarSrc={data.avatarSrc}
                      fallbackText={data.fallbackText}
                      title={data.title}
                      date={data.date}
                      link={data.link}
                      tags={data.tags}
                    />
                  ))}
                </div>
                <div className='flex justify-end'>
                  <Button variant="link">
                    <Link href="./1/secondaryPage/mentions">
                      Show more Mentions
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>


            <Card className="rounded-[24px]">
              <CardHeader>
                <div className='flex justify-between'>
                  <CardTitle>Influencers</CardTitle>
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
                <Table>
                  <TableHeader>
                    <TableRow>
                      {tableHeader.map((tableheader, index) => (
                        <TableHead>{tableheader}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>1</TableCell> {/* 第一列编号 */}

                      <TableCell className="flex items-center space-x-2">
                        <Avatar.Root className="bg-blackA1 inline-flex h-[30px] w-[30px] select-none items-center justify-center overflow-hidden">
                          <Avatar.Fallback className="text-white flex h-full w-full items-center justify-center bg-black text-[15px] font-medium">
                            TM
                          </Avatar.Fallback>
                        </Avatar.Root>
                        <span className="text-[15px] font-medium">Think Media</span>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline">Button</Button> {/* 第三列按钮 */}
                      </TableCell>
                      <TableCell><TwitterLogoIcon /></TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>3030000</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2</TableCell> {/* 第一列编号 */}
                      <TableCell className="flex items-center space-x-2">
                        <Avatar.Root className="bg-blackA1 inline-flex h-[30px] w-[30px] select-none items-center justify-center overflow-hidden">
                          <Avatar.Image
                            className="h-full w-full rounded-[inherit] object-cover"
                            src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80"
                            alt="Pedro Duarte"
                          />
                          <Avatar.Fallback
                            className="text-violet11 leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium"
                            delayMs={600}
                          >
                            JD
                          </Avatar.Fallback>
                        </Avatar.Root>
                        <span className="text-[15px] font-medium">Private Label</span>

                      </TableCell>
                      <TableCell>
                        <Button variant="outline">Button</Button> {/* 第三列按钮 */}
                      </TableCell>
                      <TableCell><TwitterLogoIcon /></TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>2750000</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>3</TableCell> {/* 第一列编号 */}
                      <TableCell className="flex items-center space-x-2">
                        <Avatar.Root className="bg-blackA1 inline-flex h-[30px] w-[30px] select-none items-center justify-center overflow-hidden">
                          <Avatar.Image
                            className="h-full w-full rounded-[inherit] object-cover"
                            src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
                            alt="Colm Tuite"
                          />
                          <Avatar.Fallback
                            className="text-violet11 leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium"
                            delayMs={600}
                          >
                            CT
                          </Avatar.Fallback>
                        </Avatar.Root>
                        <span className="text-[15px] font-medium">Akalanka Ekanayake</span>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline">Button</Button> {/* 第三列按钮 */}
                      </TableCell>
                      <TableCell><GitHubLogoIcon /></TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>1880000</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <div className='flex justify-end'>
                  <Button variant="link">
                    <Link href="./1/secondaryPage/influencers">
                      Show more influencers
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>


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