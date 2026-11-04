import Link from "next/link";

export default function VentasLayout({ children }) {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-6 py-12">
      <div className="flex items-center justify-between border-b border-black/10 pb-4 dark:border-white/20">
        <h1 className="text-3xl font-semibold tracking-tight">Ventas</h1>
        <nav className="flex gap-6">
          <Link
            href="/ventas"
            className="text-zinc-600 transition-colors hover:text-foreground dark:text-zinc-400"
          >
            Listado
          </Link>
          <Link
            href="/ventas/create"
            className="text-zinc-600 transition-colors hover:text-foreground dark:text-zinc-400"
          >
            Nueva venta
          </Link>
        </nav>
      </div>
      {children}
    </div>
  );
}
