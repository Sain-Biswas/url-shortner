import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import "~/app/globals.css";
import { cn } from "~/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "ZipIn",
  description: "Easy to use URL Shortener."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(geistSans.variable, geistMono.variable)}>
        {children}
      </body>
    </html>
  );
}
