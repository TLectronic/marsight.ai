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
import { GitHubLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons'
import { useParams } from 'next/navigation'
import { useAuth } from "@clerk/nextjs"
import axios from 'axios';

// 定义 allData 的类型
interface AllData {
  Keywords: {
    all_brand: {
      keywordsCount: number;
      OverallClicks: number;
    };
  };
  trafficAndEngagement: {
    AvgMonthVisits: number;
  };
  organic_total: {
    OverallClicks: number;
  };
  paid_total: {
    OverallClicks: number;
  };
}


interface ReferralsRow {
  Link: string;
  category: string;
  TrafficShare: string;
  Traffic: string;
  Change: string;
}

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
const smMentions = {
  Mentions: '3974',
  TotalLikes: '111',
  TotalShares: '222',
};

// 博主表格内数据
const referralsData: ReferralsRow[] = [
  {
    Link: 'Producthunt.com',
    category: 'Tech News',
    TrafficShare: '17.77%',
    Traffic: '15.4k',
    Change: 'New'
  },
  {
    Link: 'canva.com',
    category: 'Design',
    TrafficShare: '17.77%',
    Traffic: '15.4k',
    Change: '22.82%'
  },
  {
    Link: 'g2.com',
    category: 'Tech News',
    TrafficShare: '17.77%',
    Traffic: '15.4k',
    Change: '-67.93%'
  },
]

const organic = {
  data: [
    {
      KeywordClass: "Branded Keywords",
      data: [
        {
          Keywords: 'heygen',
          Clicks: 1060150,
          Traffic: 0.6506,
          ClicksChange: 0.217,
          ChangeVolume: 1237740.00,
          Changeofvolume: 0.1788,
        },
        {
          Keywords: 'heygen ai',
          Clicks: 1060150,
          Traffic: 0.6506,
          ClicksChange: 0.217,
          ChangeVolume: 1237740.00,
          Changeofvolume: 0.1788,
        },
      ]
    },
    {
      KeywordClass: "Non-Branded Keywords",
      data: [
        {
          Keywords: 'heygen',
          Clicks: 1060150,
          Traffic: 0.6506,
          ClicksChange: 0.217,
          ChangeVolume: 1237740.00,
          Changeofvolume: 0.1788,
        },
        {
          Keywords: 'heygen ai',
          Clicks: 1060150,
          Traffic: 0.6506,
          ClicksChange: 0.217,
          ChangeVolume: 1237740.00,
          Changeofvolume: 0.1788,
        },
        {
          Keywords: 'heygen ai',
          Clicks: 1060150,
          Traffic: 0.6506,
          ClicksChange: 0.217,
          ChangeVolume: 1237740.00,
          Changeofvolume: 0.1788,
        },
      ]
    },
  ]
}

const paid = {
  data: [
    {
      KeywordClass: "Branded Keywords",
      data: [
        {
          Keywords: 'hey',
          Clicks: 1060150,
          Traffic: 0.6506,
          ClicksChange: 0.217,
          ChangeVolume: 1237740.00,
          Changeofvolume: 0.1788,
        },
        {
          Keywords: 'heygen ai',
          Clicks: 1060150,
          Traffic: 0.6506,
          ClicksChange: 0.217,
          ChangeVolume: 1237740.00,
          Changeofvolume: 0.1788,
        },
      ]
    },
    {
      KeywordClass: "Non-Branded Keywords",
      data: [
        {
          Keywords: 'heygen',
          Clicks: 1060150,
          Traffic: 0.6506,
          ClicksChange: 0.217,
          ChangeVolume: 1237740.00,
          Changeofvolume: 0.1788,
        },
        {
          Keywords: 'heygen ai',
          Clicks: 1060150,
          Traffic: 0.6506,
          ClicksChange: 0.217,
          ChangeVolume: 1237740.00,
          Changeofvolume: 0.1788,
        },
        {
          Keywords: 'heygen ai',
          Clicks: 1060150,
          Traffic: 0.6506,
          ClicksChange: 0.217,
          ChangeVolume: 1237740.00,
          Changeofvolume: 0.1788,
        },
      ]
    },
  ]
}

// 最火爆的提及 数据
const mentions = [
  {
    id: '1',
    title: 'Imagine ter o seu proprio influe...',
    created_date: '2024-08-22 05:15',
    url: 'https://instagram.com',
    likes_count: 1,
    shares_count: 1,
    comments_count: 1,
    author: '',
    author_avatar_url: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
    author_url: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK',
    importance_label: '#robo #vocesabia #curiosidades #dicas'
  },
  {
    id: '1',
    title: 'Imagine ter o seu proprio influe...',
    created_date: '2024-08-22 05:15',
    url: 'https://instagram.com',
    likes_count: 1,
    shares_count: 1,
    comments_count: 1,
    author: '',
    author_avatar_url: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
    author_url: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK',
    importance_label: '#robo #vocesabia #curiosidades #dicas'
  },
];

// 红人的提及 数据
const mentionsFrom = [
  {
    id: '1',
    title: 'Imagine ter o seu proprio influe...',
    created_date: '2024-08-22 05:15',
    url: 'https://instagram.com',
    likes_count: 1,
    shares_count: 1,
    comments_count: 1,
    author: '',
    author_avatar_url: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
    author_url: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK',
    importance_label: '#robo #vocesabia #curiosidades #dicas'
  },
  {
    id: '1',
    title: 'Imagine ter o seu proprio influe...',
    created_date: '2024-08-22 05:15',
    url: 'https://instagram.com',
    likes_count: 1,
    shares_count: 1,
    comments_count: 1,
    author: '',
    author_avatar_url: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
    author_url: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK',
    importance_label: '#robo #vocesabia #curiosidades #dicas'
  },
];


const Influencer = [
  {
    id: 1,
    name: 'Think Media',
    profileImage: null,
    fallbackText: 'TM',
    siteIcon: <TwitterLogoIcon />,
    mentions: 1,
    followers: 3030000
  },
  {
    id: 2,
    name: 'Private Label',
    profileImage: 'https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80',
    fallbackText: 'JD',
    siteIcon: <TwitterLogoIcon />,
    mentions: 1,
    followers: 2750000
  },
  {
    id: 3,
    name: 'Akalanka Ekanayake',
    profileImage: 'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80',
    fallbackText: 'CT',
    siteIcon: <GitHubLogoIcon />,
    mentions: 1,
    followers: 1880000
  }
];

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
  const [allData, setAllData] = useState<AllData | null>(null); // Initially null
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

  const dataofbox = {
    NoofKeywords: 5968,
    NoofClicks: 1190000,
    MonthlyVisits: 4560000,
    Organic: 8,
    Paid: 2,
  }


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
            <Referrals referralsData={referralsData} />
            <SearchAnalysis
              dataofbox={dataofbox}
              organic={organic}
              paid={paid}
            />
            <SocialMediaAnalysis
              Mentions={smMentions.Mentions}
              TotalLikes={smMentions.TotalLikes}
              TotalShares={smMentions.TotalShares}
            />
            <Mentions mentions={mentions} mentionsFrom={mentionsFrom} />
            <Influencers influencers={Influencer} />
          </div>
        </div>
      </Resizable>
      <Chat messages={messages} />
    </div>

  )
}