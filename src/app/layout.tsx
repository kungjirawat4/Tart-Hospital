// import type { ReactNode } from 'react';
// import clsx from 'clsx';
// import { NextIntlClientProvider } from 'next-intl';
// import { getLocale, getMessages } from 'next-intl/server';

// import '@/styles/globals.css';

// type Props = {
//   children: ReactNode;
// };

// export default async function LocaleLayout({ children }: Props) {
//   const locale = await getLocale();

//   // Providing all messages to the client
//   // side is the easiest way to get started
//   const messages = await getMessages();

//   return (
//     <html lang={locale}>
//       <head>
//         <title>TART HOSPITAL</title>
//       </head>
//       <body
//         className={clsx(
//           'flex min-h-[100vh] flex-col bg-slate-100',

//         )}
//       >
//         <NextIntlClientProvider messages={messages}>
//           <div id="root">{children}</div>
//         </NextIntlClientProvider>
//       </body>
//     </html>
//   );
// }

import type { ReactNode } from 'react';
import Footer from '@/components/footer';
import meta from '@/libs/meta';
import Providers from '@/libs/provider';
import { logo, siteName } from '@/libs/setting';
import { TailwindIndicator } from '@/providers/tailwind-indicator';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import '@/styles/globals.css';

type Props = {
  children: ReactNode;
};
export const metadata = meta({
  title: `${siteName}`,
  description: `บริษัท เอ ไอ สมาร์ทเทค จำกัด`,
  openGraphImage: logo,
});
export default async function LocaleLayout({ children }: Props) {
  const locale = await getLocale();

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <div className="flex flex-col min-h-screen">
            <main className="flex-grow">
              <Providers>
                {children}
                <TailwindIndicator />
              </Providers>
            </main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

// import Footer from '@/components/footer';
// import meta from '@/libs/meta';
// import Providers from '@/libs/provider';

// import { logo, siteName } from '@/libs/setting';
// import { TailwindIndicator } from '@/providers/tailwind-indicator';
// import '@/styles/globals.css';

// export const metadata = meta({
//   title: `${siteName}`,
//   description: `บริษัท เอ ไอ สมาร์ทเทค จำกัด`,
//   openGraphImage: logo,
// });

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body suppressHydrationWarning>
//         <div className="flex flex-col min-h-screen">
//           <main className="flex-grow">
//             <Providers>
//               {children}
//               <TailwindIndicator />
//             </Providers>
//           </main>
//           <Footer />
//         </div>
//       </body>
//     </html>
//   );
// }
