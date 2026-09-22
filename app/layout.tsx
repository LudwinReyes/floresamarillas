import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans, Caveat } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#0A0D0A",
};

export const metadata: Metadata = {
  title: "Para Pancha 💛 | Día de las Flores Amarillas",
  description: "Un jardín de tulipanes amarillos creado especialmente para ti.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🌷</text></svg>",
    apple: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🌷</text></svg>",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Para Pancha 💛",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${jakarta.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#0E100D] text-[#FFF8E7] font-sans overflow-x-hidden selection:bg-[#F6C945]/30 selection:text-[#FFF8E7]">
        {children}
      </body>
    </html>
  );
}
