import Link from "next/link";
import AuthControls from "@/components/AuthControls";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/productos", label: "Productos" },
  { href: "/ventas", label: "Ventas" },
  { href: "/contacto", label: "Contacto" },
  { href: "/estadisticas", label: "Estadisticas" },
];

export default function Header() {
  return (
    <header className="border-b border-black/10 dark:border-white/20">
      <nav className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold">
          Carpincho Informática
        </Link>
        <ul className="flex gap-6">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-zinc-600 transition-colors hover:text-foreground dark:text-zinc-400"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <AuthControls />
      </nav>
    </header>
  );
}
