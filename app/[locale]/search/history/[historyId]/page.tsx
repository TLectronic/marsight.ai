"use client"
import React, { useEffect, useState } from 'react'
import { Resizable } from 're-resizable'
import { Influencers } from '@/components/custom/Influencers'
import { Mentions } from '@/components/custom/Mentions'
import { SocialMediaAnalysis } from '@/components/custom/SocialMediaAnalysis'
import { ProductAnalysis } from '@/components/custom/ProductAnalysis'
import { TrafficOverview } from '@/components/custom/TrafficOverview'
import { MarketingChannels } from '@/components/custom/MarketingChannels'
import { Referrals } from '@/components/custom/Referrals'
import { SearchAnalysis } from '@/components/custom/SearchAnalysis'
import { Chat } from '@/components/custom/Chat';
import { useParams } from 'next/navigation'
import { useAuth } from "@clerk/nextjs"
import axios from 'axios';


const messages = [
  { role: 'assistant', content: '您好！我是AI助手。您有什么想问的吗？' },
]
//SearchAnalysis四个盒子
interface SearchAnalysisProps {
  NoofKeywords: number;
  NoofClicks: number;
  MonthlyVisits: number;
  Organic: number;
  Paid: number;
}
//TrafficRow表格数据
interface TrafficRow {
  Keywords: string;
  Clicks: number;
  Traffic: number;
  ClicksChange: number;
  ChangeVolume: number;
  Changeofvolume: number;
}
interface DataGroup {
  KeywordClass: string;
  data: TrafficRow[];
}

// 自然流量数据
interface OrganicTrafficData {
  data: DataGroup[];
}

// 付费流量数据
interface PaidTrafficData {
  data: DataGroup[];
}



const [SearchAnalysisData, setSearchAnalysisData] = useState<SearchAnalysisProps | null>(null);
const [organicTrafficData, setOrganicTrafficData] = useState<OrganicTrafficData | null>(null);
const [paidTrafficData, setPaidTrafficData] = useState<PaidTrafficData | null>(null);


export default function Component() {
  // 当前页面的chatId
  const { historyId } = useParams()
  // 登录认证内容
  const template = 'markSightTest'
  const { getToken, isSignedIn } = useAuth();
  // 当前页面的所有数据
  const [allData, setAllData] = useState(null);
  // 获得当前页面需要渲染的信息
  const getData = async () => {
    try {
      if (isSignedIn) {
        const jwtToken = await getToken({ template });
        const response = await axios.get(
          `https://zyzc73u8a0.execute-api.us-east-1.amazonaws.com/Alpha/chat?chatId=${historyId}`,
          {
            headers: {
              'Authorization': `Bearer ${jwtToken}`,
            },
          }
        );
        console.log("返回的数据:", response.data);
        setAllData(response.data)
        if(allData){
          setSearchAnalysisData({
            NoofKeywords: allData.report.Keywords.all_brand.keywordsCount,
            NoofClicks: allData.report.Keywords.all_brand.OverallClicks,
            MonthlyVisits: allData.report.trafficAndEngagement.AvgMonthVisits,
            Organic: allData.report.organic_total.OverallClicks,
            Paid: allData.report.paid_total.OverallClicks,
          }),
          setOrganicTrafficData({

          }),
          setPaidTrafficData({
            
          })
        }
      }
    } catch (error) {
      console.error('Failed to get chat:', error);
    }
  }
  // 页面初始化的时候调用 getData 获得数据
  useEffect(() => {
    getData();
  }, [isSignedIn, historyId])


  return (
    <div className="flex h-screen overflow-hidden bg-[#ffffff] p-4">
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
          <div className='sticky top-0 bg-white z-10 text-xl font-extrabold text-[#5F5E5B] border-b w-full pb-3 pl-6 relative'>
            Marketing Strategy
          </div>
          <div className="p-4 space-y-4 min-w-[500px]">

            <ProductAnalysis
              ProductSummary={ }
              TargetUsers={ }
              CoreFeatures={ }
              UseCases={ }
            />
            <TrafficOverview
              MonthlyVisits={ }
              UniqueVisitors={ }
              VisitDuration={ }
              PagesPerVisit={ }
              BounceRate={ }
              PageViews={ }
            />
            <MarketingChannels
              Social={ }
              Direct={ }
              DisplayAds={ }
              Referrals={ }
              Email={ }
              OrganicSearch={ }
              PaidSearch={ }
            />
            <Referrals referralsData={ } />
            <SearchAnalysis
              dataofbox={SearchAnalysisData}
              organic={ }
              paid={ }
            />
            <SocialMediaAnalysis
              TotalSocialVisits={ }
              Mentions={ }
              TotalLikes={ }
              TotalShares={ }
              LineChartData={ }
              PieChartData={ }
            />
            <Mentions mentions={ } mentionsFrom={ } />
            <Influencers influencers={ } />
          </div>
        </div>
      </Resizable>
      <Chat messages={messages} />
    </div>

  )
}