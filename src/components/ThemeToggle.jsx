"use client";

import { useTheme } from "@/context/ThemeContext";
import Icon from "@/components/Icon";

// Botón del header que alterna entre modo claro y oscuro (usa el ThemeContext)
export default function ThemeToggle() {
  const { tema, cambiarTema } = useTheme();
  const oscuro = tema === "oscuro";

  return (
    <button
      type="button"
      onClick={cambiarTema}
      className="btn btn-ghost btn-icon"
      aria-label={oscuro ? "Activar modo claro" : "Activar modo oscuro"}
      title={oscuro ? "Modo claro" : "Modo oscuro"}
    >
      <Icon name={oscuro ? "sol" : "luna"} className="size-5" />
    </button>
  );
}
