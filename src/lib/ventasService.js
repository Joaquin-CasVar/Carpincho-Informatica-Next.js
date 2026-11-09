// Servicio de ventas. Por ahora SIMULA el guardado: cuando exista el login y el
// cliente de API, solo hay que reemplazar el cuerpo de estas funciones por
// llamadas con axios (POST/PUT a /ventas/ y /detalles-venta/).
// Los errores que devuelva la API se esperan en error.response.data (formato axios).

const simularRequest = (datos) =>
  new Promise((resolve) => {
    setTimeout(() => resolve({ data: datos }), 600);
  });

// payload: { cliente, vendedor, metodo_pago, fecha }
export async function crearVenta(payload) {
  return simularRequest({ id: Date.now(), ...payload });
}

export async function editarVenta(id, payload) {
  return simularRequest({ id, ...payload });
}

// payload: { venta, producto, cantidad }
export async function crearDetalle(payload) {
  return simularRequest({ id: Date.now(), ...payload });
}

export async function editarDetalle(id, payload) {
  return simularRequest({ id, ...payload });
}
