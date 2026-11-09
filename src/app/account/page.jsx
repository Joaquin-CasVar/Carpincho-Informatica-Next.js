import Link from 'next/link';

export default function AccountPage() { //server component, renderiza en el servidor antes de enviarlo al navegador
  return (
    <main>
      <h1>Mi cuenta</h1>
      <p>Bienvenido a Carpincho Informática.</p>

      <Link href="/account/login">
        Iniciar sesión
      </Link>

      <br />

      <Link href="/account/register">
        Crear cuenta
      </Link>
    </main>
  );
}
