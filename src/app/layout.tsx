import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Resume",
  description: "나만의 이력서를 쉽게 만들어보세요",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
