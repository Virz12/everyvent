import type { Metadata } from "next";
import '@/app/ui/globals.css'
import { geistSans } from '@/app/ui/fonts'
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next"
import Head from "next/head";

export const metadata: Metadata = {
  title: "Everyvent - Plan Your Events",
  description: "Everyvent is a platform that allows you to create, manage, and share events effortlessly. Whether it's a small gathering or a large conference, Everyvent has got you covered.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <Head>
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Virgi Riyadi" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://everyvent.vercel.app/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body
        className={`${geistSans.className} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
