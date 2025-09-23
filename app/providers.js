'use client';
import { SessionProvider } from 'next-auth/react';
import { AppContextProvider } from '@/app/Context/AppContext';
import I18nProvider from './providers/I18nProvider';

export default function Providers({ children, session, locale }) {
  return (
    <SessionProvider session={session}>
      <I18nProvider locale={locale}>
        <AppContextProvider>
          {children}
        </AppContextProvider>
      </I18nProvider>
    </SessionProvider>
  );
}
