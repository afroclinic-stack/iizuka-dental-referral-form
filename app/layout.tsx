import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "患者紹介フォーム | いいづか歯科医院",
  description: "医科から歯科への患者紹介フォーム（糖尿病・全身疾患患者）",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
