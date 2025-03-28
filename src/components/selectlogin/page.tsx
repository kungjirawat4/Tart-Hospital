import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Selectlogin() {
  const t = useTranslations('Selectlogin');

  return (
    <>
      <div className="flex justify-center mt-8 ">
        <div className="text-center">
          <span
            style={{
              opacity: 0,
              transform: 'translateY(20px)',
              animation: 'fadeUp 2s ease-out 0.25s forwards',
            }}
            className="text-center leading-tight tracking-tighter"
          >
            <div className="flex justify-center items-center space-x-8 mb-4">
              <div>
                <Image src="/assets/Logo.png" alt="Logo" width={150} height={150} />
              </div>
              <div>
                <Image src="/assets/Logo1.png" alt="Logo1" width={150} height={150} />
              </div>
            </div>
            <h2 className="colortext text-xl font-bold mb-8">
              {t('title')}
            </h2>
            <div className="flex justify-between w-full max-w-screen-lg mx-auto">
              <div className="flex-1 flex flex-col items-center p-2">
                <div className="border-2 border-[#F4FFF3] bg-[#F4FFF3] p-4 rounded-[30px] flex items-center justify-center w-full max-w-[20rem] shadow-md font-['Noto_Sans_Thai_Looped'] transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
                  <a href="/auth/login">
                    <Image
                      src="/assets/h.svg"
                      alt="ผู้ป่วยหนัก"
                      width={344}
                      height={224}
                      className="rounded-[30px]"
                    />
                  </a>
                </div>
                <span className="text-gradient_green mt-2 text-lg font-semibold">
                  {t('ICU')}
                </span>
              </div>
              <div className="flex-1 flex flex-col items-center p-2">
                <div className="border-2 border-[#EFE2FF] bg-[#EFE2FF] p-4 rounded-[30px] flex items-center justify-center w-full max-w-[20rem] shadow-md transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
                  <a href="/PM/loginPM">
                    <Image
                      src="/assets/ya.svg"
                      alt="รับยา"
                      width={334}
                      height={224}
                      className="rounded-[30px]"
                    />
                  </a>
                </div>
                <span className="text-gradient_indigo-purple  mt-2 text-lg font-semibold">
                  {t('PM')}
                </span>
              </div>
            </div>

          </span>

        </div>
      </div>
    </>

  );
}
