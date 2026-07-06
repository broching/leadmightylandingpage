import type { Metadata } from "next";
import { Inter, Fira_Code, Bricolage_Grotesque, Caveat } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import "./landing.css";

// Body face + utility mono for the marketing surface.
const fontSans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const fontMono = Fira_Code({ subsets: ["latin"], variable: "--font-mono" });

// Display face — a characterful grotesque that carries the "Mighty" personality.
const fontDisplay = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

// A single handwritten face, used once — the signed note from the team.
const fontHand = Caveat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-hand",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LeadMighty — Software that makes business mighty",
  description:
    "LeadMighty builds a growing suite of B2B SaaS products on one shared spine. Starting with LeadMightyHR — the all-in-one HR platform for modern teams.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${fontSans.variable} ${fontMono.variable} ${fontDisplay.variable} ${fontHand.variable}`}
      >
        <div className="lm-root">{children}</div>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
