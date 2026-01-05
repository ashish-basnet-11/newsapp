// app/(reader)/layout.tsx
import { Navbar } from "@/components/Navbar/Navbar";

export default function ReaderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main>
        {children}
      </main>
      {/* You could also add your public Footer here */}
    </>
  );
}