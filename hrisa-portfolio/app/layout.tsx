import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hrisa | Mahdi Sellami - ML Engineer & Full-Stack Developer",
  description: "Portfolio of Mahdi Sellami - ML/AI Engineer, Full-Stack Developer, and entrepreneur. Specializing in agentic systems, RAG, MLOps, and production AI solutions.",
  keywords: ["ML Engineer", "AI Engineer", "Full-Stack Developer", "RAG Systems", "Agentic AI", "MLOps", "Python", "React", "Next.js"],
  authors: [{ name: "Mahdi Sellami" }],
  creator: "Mahdi Sellami",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hrisa.com",
    title: "Hrisa | Mahdi Sellami",
    description: "ML/AI Engineer, Full-Stack Developer, and entrepreneur building production AI systems.",
    siteName: "Hrisa",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hrisa | Mahdi Sellami",
    description: "ML/AI Engineer, Full-Stack Developer, and entrepreneur building production AI systems.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
