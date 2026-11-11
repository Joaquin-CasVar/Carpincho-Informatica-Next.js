// Marca de Carpincho Informática: un carpincho dentro de un cuadrado redondeado.
// Usa los colores del tema, así se adapta solo al modo claro y oscuro.
export function LogoMarca({ className = "size-9" }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <rect width="40" height="40" rx="11" className="fill-primary" />
      <g className="fill-primary-foreground">
        <rect x="4.5" y="14.5" width="23" height="15.5" rx="7.75" />
        <path d="M18 14.2C18 11.6 20.1 10.2 22.6 10.2H30.4C33.2 10.2 35.2 12.3 35.2 15.1V18.9C35.2 21.3 33.4 23 31 23H23.8C20.6 23 18 20.4 18 17.2Z" />
        <circle cx="21.6" cy="10.4" r="2" />
        <rect x="7.8" y="26" width="4.2" height="7.2" rx="1.7" />
        <rect x="20.2" y="25" width="4.2" height="8.2" rx="1.7" />
      </g>
      <g className="fill-primary">
        <circle cx="27" cy="14.6" r="1.25" />
        <rect x="32.1" y="13.6" width="1.3" height="2.3" rx="0.65" />
      </g>
    </svg>
  );
}

export default function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMarca />
      <span className="leading-tight">
        <span className="block text-base font-semibold tracking-tight">
          Carpincho
        </span>
        <span className="block text-xs font-medium text-muted-foreground">
          Informática
        </span>
      </span>
    </span>
  );
}
