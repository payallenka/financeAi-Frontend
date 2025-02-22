import type { Metadata } from "next";
import "./globals.css"
import Navbar from "../app/components/Navbar";

export const metadata: Metadata = {
  title: "AI Personal Finance Assistant",
  description: "Track your expenses with AI-powered categorization",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <Navbar />
        <main className="max-w-4xl mx-auto p-6">{children}</main>
      </body>
    </html>
  );
}
