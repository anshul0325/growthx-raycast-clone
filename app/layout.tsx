import type { Metadata } from "next";
import "./globals.css";
import AgentationWrapper from "@/components/AgentationWrapper";

export const metadata: Metadata = {
  title: "Raycast - Your shortcut to everything",
  description:
    "A collection of powerful productivity tools all within an extendable launcher. Fast, ergonomic and reliable.",
  openGraph: {
    title: "Raycast - Your shortcut to everything",
    description:
      "A collection of powerful productivity tools all within an extendable launcher. Fast, ergonomic and reliable.",
    siteName: "Raycast",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Raycast - Your shortcut to everything",
    description:
      "A collection of powerful productivity tools all within an extendable launcher. Fast, ergonomic and reliable.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <AgentationWrapper />
      </body>
    </html>
  );
}
