// app/layout.tsx
import { AuthProvider } from './authContext';
import './globals.css'; // Se você estiver usando um arquivo CSS global

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
