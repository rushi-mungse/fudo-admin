import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ReactQueryProvider } from "@/components/react-query-provider";
import { RefreshComponent } from "@/components/refresh-component";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fudo",
  description: "Fudo Food Delivery App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AntdRegistry>
          <ReactQueryProvider>
            <ReactQueryDevtools />
            <RefreshComponent>
              <div className="bg-background relative flex min-h-screen flex-col">
                <SiteHeader />
                <main className="flex-1">{children}</main>
                <SiteFooter />
              </div>
            </RefreshComponent>
          </ReactQueryProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}