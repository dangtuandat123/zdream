import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@/lib/fontawesome"; // Import FontAwesome config
import { Header } from "@/components/Header";
import { AuthProvider } from "@/contexts/auth-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ZDream - Tiệm Ảnh Kỹ Thuật Số",
  description: "Biến hình ảnh của bạn thành tác phẩm nghệ thuật với AI. Không cần viết prompt, chỉ cần viết prompt, chỉ cần chọn style và upload ảnh!",
  keywords: ["AI photo", "biến hình ảnh", "chỉnh sửa ảnh AI", "studio ảnh online", "ảnh đẹp"],
  authors: [{ name: "ZDream" }],
  openGraph: {
    title: "ZDream - Tiệm Ảnh Kỹ Thuật Số",
    description: "Biến hình ảnh với AI. Zero-Prompt, siêu đơn giản!",
    type: "website",
    locale: "vi_VN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans`}
      >
        <AuthProvider>
          <Header />
          <main className="pt-16">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}

