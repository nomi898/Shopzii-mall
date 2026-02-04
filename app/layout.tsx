import "./globals.css";
import BottomNavGate from "@/components/BottomNavGate";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProviderWrapper>
          {children}
          <BottomNavGate />
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
