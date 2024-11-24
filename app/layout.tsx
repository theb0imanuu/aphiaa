import { AuthProvider } from './context/AuthContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className="transition-colors duration-500 bg-gray-100 text-gray-800">
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
