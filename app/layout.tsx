import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from './context/AuthContext';
import Header from "./components/layout/header"
import Footer from "./components/layout/footer"
import { ThemeProvider } from "./context/ThemeContext";
 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "aizh's cozy hearth",
  description: "safe place for all",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     
    <html lang="en">
      <body className={inter.className}>
      <ThemeProvider> 
      <AuthProvider>
       <Header />
      {children}
       <Footer />
       </AuthProvider>
       </ThemeProvider>
      </body>
    </html>
    
  );
}

 
