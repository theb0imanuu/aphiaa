import { ReactNode } from "react";
import "../globals.css";

export const metadata = {
  title: "aphiaa",
  description: "Welcome to Aphiaa",
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="transition-colors duration-500 bg-gray-100 text-gray-800">
        <header className="absolute top-10 left-10">
          <h1 className="aphiaa-title">
            aphiaa
          </h1>
        </header>
        <main className="flex items-center justify-center min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
