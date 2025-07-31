import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>
    <SessionProvider>
      <Header />
    </SessionProvider>
    <div className="pt-16">
      {children}
    </div>
    <Footer />
  </>;
}
