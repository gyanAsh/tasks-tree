import { AppSidebarContainer } from "@/components/app";
import { ThemeProvider } from "@/components/theme-provider";
import HelpBar from "@/components/top-help-bar";
import { SidebarProvider } from "@/components/ui/sidebar";
import "@/styles/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Todo Graph App",
  description: "A todo app that displays task relations in a graph",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <AppSidebarContainer />
            <HelpBar>{children}</HelpBar>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
