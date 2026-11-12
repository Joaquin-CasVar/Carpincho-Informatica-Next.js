import Link from "next/link";
import { LogoMarca } from "@/components/Logo";

// Página 404 general (para cualquier ruta que no exista)
export default function NotFound() {
  return (
    <section className="container-page flex flex-1 flex-col items-center justify-center gap-6 py-24 text-center">
      <LogoMarca className="size-16" />
      <p className="text-7xl font-semibold tracking-tight text-primary">404</p>
      <div>
        <h1 className="page-title">No encontramos esa página</h1>
        <p className="page-subtitle mx-auto max-w-md">
          Puede que el enlace esté mal escrito o que la página ya no exista.
        </p>
      </div>
      <Link href="/" className="btn btn-primary">
        Volver al inicio
      </Link>
    </section>
  );
}
