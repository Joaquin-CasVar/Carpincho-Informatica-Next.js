"use client";

import { createContext, useContext, useSyncExternalStore } from "react";

// Estado global del tema (claro / oscuro) para todos los componentes cliente
const ThemeContext = createContext(null);

const MODO_OSCURO_DEL_SISTEMA = "(prefers-color-scheme: dark)";

// Avisa a React cuando cambia el tema: por el botón o por el sistema
function suscribirse(callback) {
  const media = window.matchMedia(MODO_OSCURO_DEL_SISTEMA);

  function cambioDelSistema() {
    // Si la persona nunca eligió un tema, se sigue el del sistema
    if (!localStorage.getItem("tema")) {
      document.documentElement.classList.toggle("dark", media.matches);
      callback();
    }
  }

  window.addEventListener("tema-cambiado", callback);
  media.addEventListener("change", cambioDelSistema);

  return () => {
    window.removeEventListener("tema-cambiado", callback);
    media.removeEventListener("change", cambioDelSistema);
  };
}

// El tema actual es la clase "dark" del <html> (la pone el script de layout.js)
function obtenerTema() {
  return document.documentElement.classList.contains("dark")
    ? "oscuro"
    : "claro";
}

// En el servidor no hay <html> todavía: se asume claro y se corrige al hidratar
function obtenerTemaServidor() {
  return "claro";
}

export function ThemeProvider({ children }) {
  // Lee el tema actual y se actualiza solo cuando cambia (igual que AuthControls con la sesión)
  const tema = useSyncExternalStore(
    suscribirse,
    obtenerTema,
    obtenerTemaServidor
  );

  function cambiarTema() {
    const nuevoTema = tema === "oscuro" ? "claro" : "oscuro"; // el contrario del actual

    document.documentElement.classList.toggle("dark", nuevoTema === "oscuro"); // pone o saca "dark": los colores cambian solos
    localStorage.setItem("tema", nuevoTema); // se recuerda para la próxima visita
    window.dispatchEvent(new Event("tema-cambiado")); // avisa a los componentes que usan el tema
  }

  // value: lo que el Context comparte con toda la app
  return (
    <ThemeContext.Provider value={{ tema, cambiarTema }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Para usar el tema en cualquier componente cliente: const { tema, cambiarTema } = useTheme()
export function useTheme() {
  return useContext(ThemeContext);
}
