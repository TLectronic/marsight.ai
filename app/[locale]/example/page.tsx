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

interface ReferralsRow {
  Link: string;
  category: string;
  TrafficShare: string;
  Traffic: string;
  Change: string;
}

// 流量总览 数据
const trafficData = {
  MonthlyVisits: 2672000,
  UniqueVisitors: 1135000,
  VisitDuration: 287,
  PagesPerVisit: 4.46,
  BounceRate: 0.4487,
  PageViews: 11930000,
};

// 社交媒体提及 数据
const smMentions = {
  TotalSocialVisits: 45200,
  Mentions: 3974,
  TotalLikes: 111,
  TotalShares: 222,
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

const dataofbox = {
  NoofKeywords: '5968',
  NoofClicks: '1.190M',
  OfAllTotalTraffic: '44.56%',
  OrganicvsPaid: '8 : 2',
}

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

const organic = {
  data: [
    {
      KeywordClass: "Branded Keywords",
      data: [
        {
          Keywords: 'heygen',
          Clicks: '1060150',
          Traffic: '65.06%',
          ClicksChange: '21.76%',
          ChangeVolume: '1237740.00',
          Changeofvolume: '17.88%',
        },
        {
          Keywords: 'heygen ai',
          Clicks: '149930',
          Traffic: '9.20%',
          ClicksChange: '33.75%',
          ChangeVolume: '196180.00',
          Changeofvolume: '31.81%',
        },
      ]
    },
    {
      KeywordClass: "Non-Branded Keywords",
      data: [
        {
          Keywords: 'heygen',
          Clicks: '1060150',
          Traffic: '65.06%',
          ClicksChange: '21.76%',
          ChangeVolume: '1237740.00',
          Changeofvolume: '17.88%',
        },
        {
          Keywords: 'heygen ai',
          Clicks: '149930',
          Traffic: '9.20%',
          ClicksChange: '33.75%',
          ChangeVolume: '196180.00',
          Changeofvolume: '31.81%',
        },
        {
          Keywords: 'heygen ai',
          Clicks: '149930',
          Traffic: '9.20%',
          ClicksChange: '33.75%',
          ChangeVolume: '196180.00',
          Changeofvolume: '31.81%',
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
          Clicks: '1060150',
          Traffic: '65.06%',
          ClicksChange: '21.76%',
          ChangeVolume: '1237740.00',
          Changeofvolume: '17.88%',
        },
        {
          Keywords: 'heygen ai',
          Clicks: '149930',
          Traffic: '9.20%',
          ClicksChange: '33.75%',
          ChangeVolume: '196180.00',
          Changeofvolume: '31.81%',
        },
      ]
    },
    {
      KeywordClass: "Non-Branded Keywords",
      data: [
        {
          Keywords: 'heygen',
          Clicks: '1060150',
          Traffic: '65.06%',
          ClicksChange: '21.76%',
          ChangeVolume: '1237740.00',
          Changeofvolume: '17.88%',
        },
        {
          Keywords: 'heygen ai',
          Clicks: '149930',
          Traffic: '9.20%',
          ClicksChange: '33.75%',
          ChangeVolume: '196180.00',
          Changeofvolume: '31.81%',
        },
        {
          Keywords: 'heygen ai',
          Clicks: '149930',
          Traffic: '9.20%',
          ClicksChange: '33.75%',
          ChangeVolume: '196180.00',
          Changeofvolume: '31.81%',
        },
      ]
    },
  ]
}

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
              DesktopData={desktop}
              MobileWebData={mobileWeb}
            />
            <MarketingChannels />
            <Referrals referralsData={referralsData} />
            <SearchAnalysis
              dataofbox={dataofbox}
              organic={organic}
              paid={paid}
            />
            <SocialMediaAnalysis
              TotalSocialVisits={smMentions.TotalSocialVisits}
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