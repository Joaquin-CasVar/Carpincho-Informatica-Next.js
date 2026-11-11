import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/context/ThemeContext";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Carpincho Informática',
  description: 'Tienda de informática, tecnología y hardware.',
};

// Se ejecuta antes de pintar la página: aplica el tema guardado (o el del
// sistema la primera vez) para que no haya un parpadeo de claro a oscuro.
const scriptTema = `(function () {
  try {
    var guardado = localStorage.getItem('tema');
    var oscuro = guardado
      ? guardado === 'oscuro'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (oscuro) document.documentElement.classList.add('dark');
  } catch (e) {}
})();`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Así lo recomienda la guía de Next "Preventing flash before hydration" */}
        <script dangerouslySetInnerHTML={{ __html: scriptTema }} />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <Header />
          <main className="flex flex-1 flex-col">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
