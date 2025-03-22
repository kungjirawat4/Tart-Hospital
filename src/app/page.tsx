import LocaleSwitcher from '@/components/LocaleSwitcher';
// import Image from 'next/image';
import Selectlogin from '@/components/selectlogin/page';
// import { useTranslations } from 'next-intl';

export default function HomePage() {
  // const t = useTranslations('HomePage');
  return (
    // <>
    //   <div className="mb-[2px] flex items-center ml-auto">
    //     <LocaleSwitcher />
    //   </div>
    //   {/* <h1 className="text-4xl font-semibold tracking-tight">{t('title')}</h1> */}
    //   <Selectlogin />
    // </>
    <>
      <div className="flex items-center">
        <LocaleSwitcher />
      </div>
      <Selectlogin />
    </>

  );
}
