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
      }
    } catch (error) {
      console.error('Failed to get chat:', error);
    }
  }
  // 页面初始化的时候调用 getData 获得数据
  useEffect(() => {
    getData();
  }, [isSignedIn, historyId])


  // const dataofbox = {
  //   NoofKeywords: allData?.Keywords?.all_brand?.keywordsCount ?? 0,
  //   NoofClicks: allData?.Keywords?.all_brand?.OverallClicks ?? 0,
  //   OfAllTotalTraffic: allData?.Keywords?.all_brand?.OverallClicks && allData?.trafficAndEngagement?.AvgMonthVisits 
  //     ? allData.Keywords.all_brand.OverallClicks / allData.trafficAndEngagement.AvgMonthVisits 
  //     : 0,
  //   OrganicvsPaid: allData?.organic_total?.OverallClicks && allData?.paid_total?.OverallClicks 
  //     ? `${Math.round(allData.organic_total.OverallClicks / (allData.organic_total.OverallClicks + allData.paid_total.OverallClicks) * 10)}:${Math.round(allData.paid_total.OverallClicks / (allData.organic_total.OverallClicks + allData.paid_total.OverallClicks) * 10)}`
  //     : '0:0',
  // };


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
              ProductSummary={}
              TargetUsers={}
              CoreFeatures={}
              UseCases={}
            />
            <TrafficOverview
              MonthlyVisits={}
              UniqueVisitors={}
              VisitDuration={}
              PagesPerVisit={}
              BounceRate={}
              PageViews={}
            />
            <MarketingChannels 
            Social={}
            Direct={}
            DisplayAds={}
            Referrals={}
            Email={}
            OrganicSearch={}
            PaidSearch={}
            />
            <Referrals referralsData={} />
            <SearchAnalysis
              dataofbox={}
              organic={}
              paid={}
            />
            <SocialMediaAnalysis
            TotalSocialVisits={}
            Mentions={}
            TotalLikes={}
            TotalShares={}
            LineChartData={}
            PieChartData={}
            />
            <Mentions mentions={} mentionsFrom={} />
            <Influencers influencers={} />
          </div>
        </div>
      </Resizable>
      <Chat messages={messages} />
    </div>

  )
}