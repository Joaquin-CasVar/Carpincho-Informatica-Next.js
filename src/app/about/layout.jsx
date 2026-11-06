
import Link from 'next/link';

export default function AboutLayout({ children }) {
  return (
    <div className="min-h-screen">
      <nav className="border-b border-gray-700 p-4">
        <div className="mx-auto flex max-w-5xl flex-wrap gap-6">
          <Link href="/about" className="hover:text-blue-500">
            Sobre nosotros
          </Link>

          <Link href="/about/faq" className="hover:text-blue-500">
            Preguntas frecuentes
          </Link>

          <Link href="/about/contacto" className="hover:text-blue-500">
            Contacto
          </Link>
        </div>
      </nav>

      <div className="mx-auto max-w-5xl p-6">
        {children}
      </div>
    </div>
  );
}
