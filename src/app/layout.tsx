import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ReactQueryProvider } from "@/components/react-query-provider";
import { RefreshComponent } from "@/components/refresh-component";
import { SetCart } from "@/components/set-cart";

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
      <body className={inter.className} suppressHydrationWarning={true}>
        <SetCart />
        <AntdRegistry>
          <ReactQueryProvider>
            <RefreshComponent>{children}</RefreshComponent>
          </ReactQueryProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
