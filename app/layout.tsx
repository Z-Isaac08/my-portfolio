import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Isaac N'CHO | Software Engineer & Cybersecurity Specialist",
    template: "%s | Isaac N'CHO",
  },
  description:
    "Full-Stack Developer and Cybersecurity enthusiast building secure, scalable applications. Specializing in React, Flutter, Node.js, and AI-driven solutions.",
  keywords: [
    "Software Engineer",
    "Full-Stack Developer",
    "Cybersecurity",
    "React",
    "Next.js",
    "Flutter",
    "Node.js",
    "AI",
    "Machine Learning",
    "Isaac N'CHO",
  ],
  authors: [{ name: "Isaac N'CHO" }],
  creator: "Isaac N'CHO",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    title: "Isaac N'CHO | Software Engineer & Cybersecurity Specialist",
    description:
      "Full-Stack Developer and Cybersecurity enthusiast building secure, scalable applications.",
    siteName: "Isaac N'CHO Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Isaac N'CHO | Software Engineer & Cybersecurity Specialist",
    description:
      "Full-Stack Developer and Cybersecurity enthusiast building secure, scalable applications.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
