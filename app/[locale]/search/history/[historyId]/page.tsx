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
  // Traffic Overview 需要的数据类型
  interface TrafficOverviewProps {
    MonthlyVisits: number;
    UniqueVisitors: number;
    VisitDuration: number;
    PagesPerVisit: number;
    BounceRate: number;
    PageViews: number;
    DesktopData: {
      Key: string;
      Value: number;
    }[];
    MobileWebData: {
      Key: string;
      Value: number;
    }[];
  }

  // MarketingChannels 需要的数据类型
  interface MarketingChannelsProps {
    Social: number;
    Direct: number;
    DisplayAds: number;
    Referrals: number;
    Email: number;
    OrganicSearch: number;
    PaidSearch: number;
  }

  const [frontTraffic, setFrontTraffic] = useState<TrafficOverviewProps | null>(null);
  const [frontMarketingChannels, setFrontMarketingChannels] = useState<MarketingChannelsProps | null>(null);














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
        // 得到后端的shit
        setAllData(response.data)


        if (allData) {
          // 开始分割这坨shit
          setFrontTraffic({
            MonthlyVisits: allData.report.trafficAndEngagement.total.AvgMonthVisits,
            UniqueVisitors: allData.report.trafficAndEngagement.total.UniqueUsers,
            VisitDuration: allData.report.trafficAndEngagement.total.AvgVisitDuration,
            PagesPerVisit: allData.report.trafficAndEngagement.total.PagesPerVisit,
            BounceRate: allData.report.trafficAndEngagement.total.BounceRate,
            PageViews: allData.report.trafficAndEngagement.total.TotalPagesViews,
            DesktopData: allData.report.trafficAndEngagement.daily.Desktop,
            MobileWebData: allData.report.trafficAndEngagement.daily.MobileWeb,
          })

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

          setFrontMarketingChannels({
            Social: allData.report.marketingChannels.Social,
            Direct: allData.report.marketingChannels.Direct,
            DisplayAds: allData.report.marketingChannels.DisplayAds,
            Referrals: allData.report.marketingChannels.Referrals,
            Email: allData.report.marketingChannels.Email,
            OrganicSearch: allData.report.marketingChannels.OrganicSearch,
            PaidSearch: allData.report.marketingChannels.PaidSearch,
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
              MonthlyVisits={frontTraffic?.MonthlyVisits}
              UniqueVisitors={frontTraffic?.UniqueVisitors}
              VisitDuration={frontTraffic?.VisitDuration}
              PagesPerVisit={frontTraffic?.PagesPerVisit}
              BounceRate={frontTraffic?.BounceRate}
              PageViews={frontTraffic?.PageViews}
              DesktopData={frontTraffic?.DesktopData}
              MobileWebData={frontTraffic?.MobileWebData}
            />
            <MarketingChannels
              Social={frontMarketingChannels?.Social}
              Direct={frontMarketingChannels?.Direct}
              DisplayAds={frontMarketingChannels?.DisplayAds}
              Referrals={frontMarketingChannels?.Referrals}
              Email={frontMarketingChannels?.Email}
              OrganicSearch={frontMarketingChannels?.OrganicSearch}
              PaidSearch={frontMarketingChannels?.PaidSearch}
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