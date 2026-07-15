import type { Metadata } from "next";
import {
  Inter,
  JetBrains_Mono,
  Noto_Sans_JP,
  Noto_Serif_JP,
} from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/components/lang-provider";
import { site } from "@/content/site";

/**
 * Font stack ported from the Claude-Design Terminal Home prototype.
 *   - Inter: UI copy (was: Geist)
 *   - JetBrains Mono: every monospace line in the terminal UI
 *   - Noto Sans JP: Japanese copy (available as the `font-jp` utility)
 *
 * next/font/google self-hosts the woff2 files so there are no runtime
 * Google Fonts requests in production.
 */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const notoSansJp = Noto_Sans_JP({
  variable: "--font-noto-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

/* refined serif for the big Japanese display headlines (liquid-glass
   world); same Noto family as the sans, so it loads reliably here */
const notoSerifJp = Noto_Serif_JP({
  variable: "--font-serif-jp",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: site.url,
    title: site.title,
    description: site.description,
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${notoSansJp.variable} ${notoSerifJp.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
