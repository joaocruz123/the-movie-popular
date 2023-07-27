import { ReduxProviders } from "@/store/provider";
import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import Navibar from "@/theme/navbar";

const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TMDB - Popular Movies",
  description: "A listing of the most popular movies of the day",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={roboto.className}>
        <ReduxProviders>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <Navibar>{children}</Navibar>
          </ThemeProvider>
        </ReduxProviders>
      </body>
    </html>
  );
}
