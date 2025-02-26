import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const rubikFont = Rubik({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "just css filters",
  description: "created by alien ^v^",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${rubikFont.className} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
