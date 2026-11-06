export default function Footer() {
  return (
    <footer className="border-t border-black/10 py-6 text-center text-sm text-zinc-600 dark:border-white/20 dark:text-zinc-400">
      © {new Date().getFullYear()} Carpincho Informática. Todos los derechos
      reservados.
    </footer>
  );
}
