import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "F1",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ margin: 0, padding: 0, height: '100vh', overflow: 'hidden' }}
      >
        <Sidebar />
        <main
          style={{
            marginLeft: 256,
            height: '100vh',
            overflowY: 'auto',
            padding: '1.5rem',
            boxSizing: 'border-box',
          }}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
