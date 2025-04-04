import type { ReactNode } from 'react';
// import Navigation from '@/components/Navigation';
import { clsx } from 'clsx';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
// import { Inter } from 'next/font/google';

// const inter = Inter({ subsets: ['latin'] });

type Props = {
  children: ReactNode;
  locale: string;
};

export default async function BaseLayout({ children, locale }: Props) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html className="h-full" lang={locale}>
      <body className={clsx('flex h-full flex-col')}>
        <NextIntlClientProvider messages={messages}>
          {/* <Navigation /> */}
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
