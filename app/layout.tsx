import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "400", "600"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Four card feature section | Royer Adames",
  description: "A responsive four card feature section built for the Frontend Mentor challenge.",
  icons: { icon: "/images/favicon-32x32.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={poppins.variable}><body>{children}</body></html>;
}
