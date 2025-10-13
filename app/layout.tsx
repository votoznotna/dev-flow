import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { ReactNode } from 'react';
import ThemeProvider from './context/Theme';
import './globals.css';
import Navbar from '@/components/navigation/navbar';

const inter = localFont({
  src: './fonts/InterVF.ttf',
  variable: '--font-inter',
  weight: '100 200 300 400 500 700 800 900',
});

const spaceGrotesk = localFont({
  src: './fonts/SpaceGroteskVF.ttf',
  variable: '--font-space-grotesk',
  weight: '300 400 500 700',
});

export const metadata: Metadata = {
  title: 'DevFlow',
  description:
    'A community-driven platform for asking and answering programming questions. Get help, share knowledge, and collaborate with developers from around the world. Explore topics in web development, mobile app development, algorithms, data structures, and more.',
  icons: {
    icon: '/images/site-logo.svg',
  },
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <link
          rel='stylesheet'
          type='text/css'
          href='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css'
        />
      </head>
      <body
        className={`${inter.className} ${spaceGrotesk.variable} antialiased`}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
