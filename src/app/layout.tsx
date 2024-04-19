import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar"
import ReduxProvider from "@/components/ReduxProvider";
import { Toaster } from "sonner";


export const metadata: Metadata = {
  title: "Visitor Management System",
  description: "Visitor Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <Toaster richColors position="top-right" />
          <Navbar />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
