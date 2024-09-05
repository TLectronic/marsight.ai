"use client"
import { Check } from "lucide-react"
import { useTranslations } from "next-intl"
import axios from 'axios';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import OrderPage from "@/components/OrderPgae"
import { useEffect, useRef } from "react"
import { useClerk } from "@clerk/nextjs"
export default function Component() {
  const t = useTranslations("PricesPage")
  const currentAmountRef = useRef<number>(1)
  const { session } = useClerk();
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        if (session) {
          const jwtToken = await session.getToken();

          const response = await axios.get('http://127.0.0.1:4523/m1/5082879-4744979-default/purchase', {
            headers: {
              'Authorization': `Bearer ${jwtToken}`,
            },
          });

          const data = response.data;
          console.log('data:', data);
        }
      } catch (error) {
        console.error('Failed to fetch prices:', error);
      }
    };

    fetchPrices();
  }, [session]);


  const handlePurchase = async () => {

    try {
      if (session) {
        const jwtToken = await session.getToken();

        const response = await axios.post(
          'http://127.0.0.1:4523/m1/5082879-4744979-default/purchase/checkout',
          {
            priceId: '90', 
          },
          {
            headers: {
              'Authorization': `Bearer ${jwtToken}`,
            },
          }
        );

        const data = response.data;
        console.log('Purchase successful:', data);
      }
    } catch (error) {
      console.error('Failed to make purchase:', error);
      console.log('sadsadasd')
    } 
  };


  return (
    <div className="bg-white min-h-screen p-4 flex items-center justify-center">

      <div className="max-w-7xl mx-auto">
        <h1 className="text-center mb-16 font-bold">
          <span className="text-4xl text-black tracking-[0.15em] align-middle" style={{ fontWeight: 900 }}>MARSIGHT.AI</span>
          <span className="text-2xl text-blue-400 align-middle" style={{ fontWeight: 500 }}> Pro</span>
          <Button onClick={handlePurchase}>dsadsdadsadas</Button>
        </h1>


        <Dialog>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

            {/* No.1 */}
            <div
              key={t('liteTitle')}
              className={`bg-white rounded-xl shadow-lg overflow-hidden flex flex-col w-64`}
            >
              <div className="p-4 flex-grow">
                <h2 className="text-xl font-bold mb-1">{t('liteTitle')}</h2>
                <p className="text-gray-600 text-sm mb-3">{t('liteDescription')}</p>
                <div className="relative text-3xl font-bold mb-3">

                  <div className="relative text-3xl font-bold mb-3">
                    <div className="relative text-3xl font-bold mb-3">
                      {'$1.99'}
                      <div className="absolute top-0 left-20 text-xs" style={{ textDecoration: 'line-through', textDecorationThickness: '2px' }}>
                        $30
                      </div>
                      <div className="absolute text-xl left-20 text-xs top-4">
                        /Mo
                      </div>
                    </div>
                  </div>

                </div>

                <DialogTrigger asChild>
                  <button
                    className={`w-full py-2 rounded-lg text-sm font-semibold bg-purple-100 text-purple-600`}
                    onClick={() => {
                      currentAmountRef.current = 2.99
                    }}
                  >
                    {t('start')}
                  </button>
                </DialogTrigger>

                <div className="mt-4">
                  <h3 className="font-semibold text-sm mb-2">{t('includes')}</h3>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center">
                      <Check className="text-green-500 mr-1 flex-shrink-0" size={14} />
                      <span>{t('threeWebsite')}</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="text-green-500 mr-1 flex-shrink-0" size={14} />
                      <span>{t('oneUser')}</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="text-green-500 mr-1 flex-shrink-0" size={14} />
                      <span>{t('oneHistory')}</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="text-green-500 mr-1 flex-shrink-0" size={14} />
                      <span>{t('unlimited')}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* No.2 */}
            <div
              key={t('popularTitle')}
              className={`bg-white rounded-xl shadow-lg overflow-hidden flex flex-col lg:-mt-4 lg:mb-4 w-64`}
            >
              <div className="bg-blue-900 text-white text-center py-1 text-sm font-semibold">
                Most Popular
              </div>
              <div className="p-4 flex-grow">
                <h2 className="text-xl font-bold mb-1">{t('popularTitle')}</h2>
                <p className="text-gray-600 text-sm mb-3">{t('popularDescription')}</p>
                <div className="text-3xl font-bold mb-3">{'$9'}</div>
                <DialogTrigger asChild>
                  <Button
                    className={`w-full py-2 rounded-lg text-sm font-semibold bg-blue-900 hover:bg-blue-950 text-white`}
                    onClick={() => {
                      currentAmountRef.current = 4.99
                    }}
                  >
                    {t('start')}
                  </Button>
                </DialogTrigger>
                <div className="mt-4">
                  <h3 className="font-semibold text-sm mb-2">{t('includes')}</h3>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center">
                      <Check className="text-green-500 mr-1 flex-shrink-0" size={14} />
                      <span>{t('sixWebsite')}</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="text-green-500 mr-1 flex-shrink-0" size={14} />
                      <span>{t('oneUser')}</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="text-green-500 mr-1 flex-shrink-0" size={14} />
                      <span>{t('oneHistory')}</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="text-green-500 mr-1 flex-shrink-0" size={14} />
                      <span>{t('unlimited')}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* No.3 */}
            <div
              key={t('agencyTitle')}
              className={`bg-white rounded-xl shadow-lg overflow-hidden flex flex-col w-64`}
            >
              <div className="p-4 flex-grow">
                <h2 className="text-xl font-bold mb-1">{t('agencyTitle')}</h2>
                <p className="text-gray-600 text-sm mb-3">{t('agencyDescription')}</p>
                <div className="text-3xl font-bold mb-3">{'$1.99'}</div>
                <DialogTrigger asChild>
                  <Button
                    className={`w-full py-2 rounded-lg text-sm font-semibold`}
                    onClick={() => {
                      currentAmountRef.current = 10.99
                    }}
                  >
                    {t('start')}
                  </Button>
                </DialogTrigger>
                <div className="mt-4">
                  <h3 className="font-semibold text-sm mb-2">{t('includes')}</h3>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center">
                      <Check className="text-green-500 mr-1 flex-shrink-0" size={14} />
                      <span>{t('fifteenWebsite')}</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="text-green-500 mr-1 flex-shrink-0" size={14} />
                      <span>{t('oneUser')}</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="text-green-500 mr-1 flex-shrink-0" size={14} />
                      <span>{t('oneHistory')}</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="text-green-500 mr-1 flex-shrink-0" size={14} />
                      <span>{t('unlimited')}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* No.4 */}
            <div
              key={t('enterpriseTitle')}
              className={`bg-white rounded-xl shadow-lg overflow-hidden flex flex-col w-64`}
            >
              <div className="p-4 flex-grow">
                <h2 className="text-xl font-bold mb-1">{t('enterpriseTitle')}</h2>
                <p className="text-gray-600 text-sm mb-3">{t('enterpriseDescription')}</p>
                <div className="text-3xl font-bold mb-3">{t('letsTalk')}</div>
                <Button
                  className={`w-full py-2 rounded-lg text-sm font-semibold`}
                >
                  {t('start')}
                </Button>
                <div className="mt-4">
                  <h3 className="font-semibold text-sm mb-2">{t('includes')}</h3>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center">
                      <Check className="text-green-500 mr-1 flex-shrink-0" size={14} />
                      <span>{t('customerManager')}</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="text-green-500 mr-1 flex-shrink-0" size={14} />
                      <span>{t('Insights')}</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="text-green-500 mr-1 flex-shrink-0" size={14} />
                      <span>{t('DataSupport')}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <DialogContent>
            <OrderPage amount={currentAmountRef.current} />
          </DialogContent>

        </Dialog>
      </div>
    </div>
  )
}

