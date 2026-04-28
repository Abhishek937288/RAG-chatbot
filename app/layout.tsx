import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { Navigation } from "@/components/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="min-h-full flex flex-col">
          <Navigation />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}