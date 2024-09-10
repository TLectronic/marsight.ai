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
import { Value } from '@radix-ui/react-select'

// Product Analysis 数据
const ProductAnalysisData = {
  ProductSummary: 'heygen is an innovative video platform that harnesses the power of generative ai to streamline your video creation process.',
  TargetUsers: ['Businesses of all sizes', 'Marketers', 'Sales teams'],
  CoreFeatures: ['Text-to-Video Conversion', '100+ Customizable Avatars', '300+ Voices in 40+ Languages'],
  UseCases: ['Marketing Campaigns', 'Product Demonstrations', 'Social Media Content'],
}

// Traffic Overview 数据
const TrafficOverviewData = {
  MonthlyVisits: 2672000,
  UniqueVisitors: 1135000,
  VisitDuration: 287,
  PagesPerVisit: 4.46,
  BounceRate: 0.4487,
  PageViews: 11930000,
};

// Traffic Overview 中 desktop 数据
const desktop = [
  {
    Key: 'Monday',
    Value: 200,
  },
  {
    Key: 'Tuesday',
    Value: 300,
  },
  {
    Key: 'Wednesday',
    Value: 250,
  },
  {
    Key: 'Thursday',
    Value: 400,
  },
  {
    Key: 'Friday',
    Value: 350,
  },
  {
    Key: 'Saturday',
    Value: 600,
  },
  {
    Key: 'Sunday',
    Value: 700,
  },
];

// Traffic Overview 中 mobile 数据
const mobileWeb = [
  {
    Key: 'Monday',
    Value: 300,
  },
  {
    Key: 'Tuesday',
    Value: 200,
  },
  {
    Key: 'Wednesday',
    Value: 400,
  },
  {
    Key: 'Thursday',
    Value: 100,
  },
  {
    Key: 'Friday',
    Value: 50,
  },
  {
    Key: 'Saturday',
    Value: 300,
  },
  {
    Key: 'Sunday',
    Value: 800,
  },
];

// Marketing Channels 数据
const MarketingChannelsData = {
  Social: 7.28,
  Direct: 44.36,
  DisplayAds: 0.0,
  Referrals: 3.63,
  Email: 0.06,
  OrganicSearch: 37.2,
  PaidSearch: 7.33,
}

// Referrals 数据
const ReferralsData = [
  {
    Link: 'Producthunt.com',
    category: 'Tech News',
    TrafficShare: 0.1777,
    Traffic: 15400,
    Change: 0.2323,
  },
  {
    Link: 'canva.com',
    category: 'Design',
    TrafficShare: 0.1777,
    Traffic: 15400,
    Change: 0.2282,
  },
  {
    Link: 'g2.com',
    category: 'Tech News',
    TrafficShare: 0.1777,
    Traffic: 15400,
    Change: -0.6793,
  },
]

// Search Analysis 中的 Search Overview的数据
const SearchOverviewData = {
  NoofKeywords: 5968,
  NoofClicks: 1190000,
  MonthlyVisits: 4560000,
  Organic: 8,
  Paid: 2,
}

// Organic Traffic 数据
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

// Paid Traffic 数据
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

// Social Media Analysis 中四个盒子的数据
const SocialMediaAnalysisData = {
  TotalSocialVisits: 45200,
  Mentions: 3974,
  TotalLikes: 111,
  TotalShares: 222,
};




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

// Influencers 的数据
const Influencer = [
  {
    id: '1',
    profileImage: "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80",
    name: 'Think Media',
    siteIcon: 'https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png',
    siteUrl: 'https://space.bilibili.com/3493093607213343',
    mentions: '1',
    followers: '3030000'
  },
  {
    id: '2',
    profileImage: 'https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80',
    name: 'Private Label',
    siteIcon: 'https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png',
    siteUrl: 'https://space.bilibili.com/396388451?spm_id_from=333.337.0.0',
    mentions: '1',
    followers: '2750000'
  },
  {
    id: '3',
    profileImage: 'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80',
    name: 'Akalanka Ekanayake',
    siteIcon: 'https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png',
    siteUrl: 'https://space.bilibili.com/502500883?spm_id_from=333.999.0.0',
    mentions: '1',
    followers: '1880000'
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
  const [allData, setAllData] = useState({});
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
        console.log("返回的数据:", response);
        setAllData(response)
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
              ProductSummary={ProductAnalysisData.ProductSummary}
              TargetUsers={ProductAnalysisData.TargetUsers}
              CoreFeatures={ProductAnalysisData.CoreFeatures}
              UseCases={ProductAnalysisData.UseCases}
            />
            <TrafficOverview
              MonthlyVisits={TrafficOverviewData.MonthlyVisits}
              UniqueVisitors={TrafficOverviewData.UniqueVisitors}
              VisitDuration={TrafficOverviewData.VisitDuration}
              PagesPerVisit={TrafficOverviewData.PagesPerVisit}
              BounceRate={TrafficOverviewData.BounceRate}
              PageViews={TrafficOverviewData.PageViews}
              DesktopData={desktop}
              MobileWebData={mobileWeb}
            />
            <MarketingChannels
              Social={MarketingChannelsData.Social}
              Direct={MarketingChannelsData.Direct}
              DisplayAds={MarketingChannelsData.DisplayAds}
              Referrals={MarketingChannelsData.Referrals}
              Email={MarketingChannelsData.Email}
              OrganicSearch={MarketingChannelsData.OrganicSearch}
              PaidSearch={MarketingChannelsData.PaidSearch}
            />
            <Referrals referralsData={ReferralsData} />
            <SearchAnalysis
              dataofbox={SearchOverviewData}
              organic={organic}
              paid={paid}
            />
            <SocialMediaAnalysis
              TotalSocialVisits={SocialMediaAnalysisData.TotalSocialVisits}
              Mentions={SocialMediaAnalysisData.Mentions}
              TotalLikes={SocialMediaAnalysisData.TotalLikes}
              TotalShares={SocialMediaAnalysisData.TotalShares}
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