'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const pestanas = [
  { href: '/about', label: 'Sobre nosotros' },
  { href: '/about/faq', label: 'Preguntas frecuentes' },
  { href: '/about/contacto', label: 'Contacto' },
];

export default function AboutLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="container-page flex flex-col gap-8 py-10">
      <nav className="flex max-w-full gap-1 self-start overflow-x-auto rounded-xl border border-border bg-muted/50 p-1">
        {pestanas.map((pestana) => (
          <Link
            key={pestana.href}
            href={pestana.href}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors ${
              pathname === pestana.href
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {pestana.label}
          </Link>
        ))}
      </nav>

      <div>
        {children}
      </div>
    </div>
  );
}
