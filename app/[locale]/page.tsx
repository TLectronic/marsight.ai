import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import { redirect } from 'next/navigation';
 
export default function HomePage({params: {locale}}: {params: {locale: string}}) {
  redirect(`/${locale}/search`)
  const t = useTranslations('HomePage');
  return (
    <div>
      <h1>{t('title')}</h1>
      <Link href="/about">{t('about')}</Link>
    </div>
  );
}