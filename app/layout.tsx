import "./globals.css";
import BottomNavGate from "@/components/BottomNavGate";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <BottomNavGate />
      </body>
    </html>
  );
}
