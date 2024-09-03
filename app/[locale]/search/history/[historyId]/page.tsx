"use client"
import React, { useState, useRef, useEffect } from 'react'
import { Resizable } from 're-resizable'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { Send, PaperclipIcon, Search } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { DataBox } from '@/components/ui/databox'
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { MentionBox } from "@/components/ui/mention-box"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'

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
  { name: 'A', value: 4000 },
  { name: 'B', value: 3000 },
  { name: 'C', value: 2000 },
  { name: 'D', value: 2780 },
  { name: 'E', value: 1890 },
]

const pieChartData = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
]

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
const trafficData = [
  {
    spanText: 'Monthly Visits',
    paragraphText: '2.672M',
  },
  {
    spanText: 'Unique Visitors',
    paragraphText: '1.135M',
  },
  {
    spanText: 'Visit Duration',
    paragraphText: '00:04:47',
  },
  {
    spanText: 'Pages Per Visit',
    paragraphText: '4.46',
  },
  {
    spanText: 'Bounce Rate',
    paragraphText: '44.87%',
  },
  {
    spanText: 'Page Views',
    paragraphText: '11.93M',
  },
];

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

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const referralsData = [
  ['Producthunt.com', 'Tech News', '17.77%', '15.4k', 'New'],
  ['canva.com', 'Design', '17.77%', '15.4k', '22.82%'],
  ['g2.com', 'Tech News', '17.77%', '15.4k', '-67.93%'],
];

export default function Component() {
  // 根据下拉框的选项来决定要渲染的数据
  const [selectedOption, setSelectedOption] = useState('popular');
  const dataToShow = selectedOption === 'popular' ? mentions : mentionsFrom;

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
          width: '50%',
          height: '100%',
        }}
        minWidth="30%"
        maxWidth="70%"
        enable={{ right: true }}
        handleComponent={{
          right: <div className="w-1 h-full bg-gray-300 cursor-col-resize hover:bg-gray-400 transition-colors" />
        }}
      >
        <div className="h-full overflow-auto">
          <div className="p-4 space-y-4 min-w-[500px]">
            <Card className="rounded-[24px]">
              <CardHeader>
                <CardTitle>Product Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-base font-bold mb-2">heygen.com</div>
                <div className="text-sm mb-6">
                  heygen is an innovative video platform that harnesses the power of generative ai to streamline your video creation process.
                </div>
                <div className='border-black border-2 h-60'>

                  <div className='flex justify-between text-xl'>
                    <div className='flex-1'>
                      <div className='text-center mb-16'>Target Users</div>
                      <ul className='text-sm ml-4'>
                        <li>· Businesses of all sizes</li>
                        <li>· Marketers</li>
                        <li>· Sales teams</li>
                      </ul>
                    </div>

                    <div className='flex-1'>
                      <div className='text-center mb-16'>Core Features</div>
                      <ul className='text-sm ml-4'>
                        <li>· Text-to-Video Conversion</li>
                        <li>· 100+ Customizable Avatars</li>
                        <li>· 300+ Voices in 40+ Languages</li>
                      </ul>
                    </div>

                    <div className='flex-1'>
                      <div className='text-center mb-16'>Application Scenarios</div>
                      <ul className='text-sm ml-4'>
                        <li>· Markerting Campaigns</li>
                        <li>· Product Demonstrations</li>
                        <li>· Social Media Content</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[24px]">
              <CardHeader>
                <CardTitle>Traffic Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='flex justify-between flex-wrap space-x-4 mb-4'>
                  {trafficData.map((traffic, index) => (
                    <DataBox
                      key={index}
                      spanText={traffic.spanText}
                      paragraphText={traffic.paragraphText}
                    />
                  ))}
                </div>
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
              </CardContent>
            </Card>

            <Card className="rounded-[24px]">
              <CardHeader>
                <CardTitle>Marketing Channels</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={barChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="rounded-[24px]">
              <CardHeader>
                <CardTitle>Referrals</CardTitle>
              </CardHeader>
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
                <CardTitle>Organic Traffic</CardTitle>
              </CardHeader>
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
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
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
                  <Button variant="link">Show more Mentions</Button>
                </div>
              </CardContent>
            </Card>


            <Card className="rounded-[24px]">
              <CardHeader>
                <CardTitle>Influencers</CardTitle>
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
                      <TableCell>Think Media</TableCell>
                      <TableCell>
                        <Button variant="outline">Button</Button> {/* 第三列按钮 */}
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>3030000</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2</TableCell> {/* 第一列编号 */}
                      <TableCell>Private Label</TableCell>
                      <TableCell>
                        <Button variant="outline">Button</Button> {/* 第三列按钮 */}
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>2750000</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>3</TableCell> {/* 第一列编号 */}
                      <TableCell>Akalanka Ekanayake</TableCell>
                      <TableCell>
                        <Button variant="outline">Button</Button> {/* 第三列按钮 */}
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>1880000</TableCell>
                    </TableRow>

                  </TableBody>
                </Table>
                <div className='flex justify-end'>
                  <Button variant="link">Show more influencers</Button>
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