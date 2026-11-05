
import Link from 'next/link';
import AuthControls from '@/components/AuthControls';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-white">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
        <Link href="/" className="text-xl font-bold">
          Carpincho Informática
        </Link>

        <nav className="flex flex-wrap items-center gap-5">
          <Link href="/" className="hover:underline">
            Inicio
          </Link>

          <AuthControls />
        </nav>
      </header>

      <section className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-20 text-center">
        <h1 className="text-4xl font-bold sm:text-5xl">
          Bienvenido a Carpincho Informática
        </h1>

        <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          Tu espacio de tecnología, informática y hardware.
          Creá tu cuenta o iniciá sesión para acceder a las funcionalidades
          de la plataforma.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/account/register"
            className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
          >
            Crear cuenta
          </Link>
        </div>
      </section>

      <footer className="border-t border-zinc-200 px-6 py-5 text-center text-sm text-zinc-500 dark:border-zinc-800">
        Carpincho Informática
      </footer>
    </main>
  );
}
