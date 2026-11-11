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
  const tema = useSyncExternalStore(
    suscribirse,
    obtenerTema,
    obtenerTemaServidor
  );

  function cambiarTema() {
    const nuevoTema = tema === "oscuro" ? "claro" : "oscuro";

    document.documentElement.classList.toggle("dark", nuevoTema === "oscuro");
    localStorage.setItem("tema", nuevoTema);
    window.dispatchEvent(new Event("tema-cambiado"));
  }

  return (
    <ThemeContext.Provider value={{ tema, cambiarTema }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
