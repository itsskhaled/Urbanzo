import { Audiowide, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./Components/NavBar";

import LayoutSmoother from "./LayoutSmoother";
import { Providers } from "./Providers";


const audiowide = Audiowide({
  subsets: ["latin"],
  weight: "400",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Urbanzo",
  description: "Urbanzo — Your destination for modern streetwear fashion. Discover a bold collection of jackets, bags, and everyday essentials crafted for men and women who love style, comfort, and urban energy.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={audiowide.className}>
        <Providers>
          <NavBar />
          <LayoutSmoother>{children}</LayoutSmoother>
        </Providers>
      </body>
    </html>
  );
}
