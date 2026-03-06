import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { SettingsProvider } from "@/context/SettingsContext";
import { DataProvider } from "../context/DataContext";
import { AuthProvider } from "@/context/AuthContext";

import Navbar from "@/components/layout/Navbar";
     

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <SettingsProvider>
            <DataProvider>
       <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
    </DataProvider>
          </SettingsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}