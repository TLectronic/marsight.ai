"use client"
import { Check } from "lucide-react"
import { useTranslations } from "next-intl"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import OrderPage from "@/components/OrderPgae"
import { useRef } from "react"
export default function Component() {
  const t = useTranslations("PricesPage")
  const currentAmountRef = useRef<number>(1)
  return (
    <div className="bg-white min-h-screen p-4 flex items-center justify-center">

      <div className="max-w-7xl mx-auto">
        <h1 className="text-center mb-16 font-bold">
          <span className="text-4xl text-black tracking-[0.15em] align-middle" style={{ fontWeight: 900 }}>MARSIGHT.AI</span>
          <span className="text-2xl text-blue-400 align-middle" style={{ fontWeight: 500 }}> Pro</span>
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
              <div className="bg-purple-600 text-white text-center py-1 text-sm font-semibold">
                Most Popular
              </div>
              <div className="p-4 flex-grow">
                <h2 className="text-xl font-bold mb-1">{t('popularTitle')}</h2>
                <p className="text-gray-600 text-sm mb-3">{t('popularDescription')}</p>
                <div className="text-3xl font-bold mb-3">{'$9'}</div>
                <DialogTrigger asChild>
                  <button
                    className={`w-full py-2 rounded-lg text-sm font-semibold bg-purple-600 text-white`}
                    onClick={() => {
                      currentAmountRef.current = 4.99
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
                  <button
                    className={`w-full py-2 rounded-lg text-sm font-semibold bg-purple-100 text-purple-600`}
                    onClick={() => {
                      currentAmountRef.current = 10.99
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
                <button
                  className={`w-full py-2 rounded-lg text-sm font-semibold bg-purple-100 text-purple-600`}
                >
                  {t('start')}
                </button>
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

