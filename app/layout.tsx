import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Goodwill India | The Film Experience",
  description: "13 people. 13 causes. One film. An invitation-only India journey through Goodwill India, service, story and human connection.",
  openGraph: {
    title: "Goodwill India | The Film Experience",
    description: "13 people. 13 causes. One film. A cinematic journey through India with Goodwill India.",
    type: "website",
    images: ["/og-preview.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Goodwill India | The Film Experience",
    description: "13 people. 13 causes. One film.",
    images: ["/og-preview.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,500&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
