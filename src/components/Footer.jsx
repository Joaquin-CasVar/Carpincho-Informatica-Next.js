import Link from "next/link";
import Logo from "@/components/Logo";

const columnas = [
  {
    titulo: "Tienda",
    links: [
      { href: "/productos", label: "Productos" },
      { href: "/ventas", label: "Ventas" },
      { href: "/estadisticas", label: "Estadísticas" },
    ],
  },
  {
    titulo: "Ayuda",
    links: [
      { href: "/about", label: "Sobre nosotros" },
      { href: "/about/faq", label: "Preguntas frecuentes" },
      { href: "/about/contacto", label: "Contacto" },
    ],
  },
  {
    titulo: "Cuenta",
    links: [
      { href: "/account/login", label: "Iniciar sesión" },
      { href: "/account/register", label: "Registrarse" },
      { href: "/admin", label: "Panel de gestión" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-muted/40">
      <div className="container-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <Logo />
          <p className="max-w-xs text-sm text-muted-foreground">
            Tienda de informática y hardware. Todo lo que necesitás para armar,
            mejorar o reemplazar tu equipo.
          </p>
        </div>

        {columnas.map((columna) => (
          <div key={columna.titulo}>
            <h3 className="text-sm font-semibold">{columna.titulo}</h3>
            <ul className="mt-3 space-y-2">
              {columna.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border">
        <p className="container-page py-6 text-sm text-muted-foreground">
          © {new Date().getFullYear()} Carpincho Informática. Todos los
          derechos reservados.
        </p>
      </div>
    </footer>
  );
}
