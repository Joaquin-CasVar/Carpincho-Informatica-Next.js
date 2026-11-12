export const API_URL = process.env.NEXT_PUBLIC_API_URL; // Traigo url del back

export const ENDPOINTS = {
  fabricantes: 'fabricantes/',
  colores: 'colores/',
  tipos_producto: 'tipos-producto/',
  arquitecturas: 'arquitecturas/',
  sockets: 'sockets/',
  chipsets_gpu: 'chipsets-gpu/',
  tipos_memoria: 'tipos-memoria/',
  refrigeraciones: 'refrigeraciones/',
}
async function list(path) {
  let page = 1;
  let all = []
  while (true) {
    const res = await fetch(`${API_URL}${path}?page=${page}`, { cache: "no-store" });
    if (!res.ok) throw new Error(`La API respondió ${res.status} en ${path}`);
    const data = await res.json();
    if (Array.isArray(data)) return data;
    all = all.concat(data.results ?? []);
    if (!data.next) return all;
    page += 1;
  }
}

export const getFabricantes = () => list(ENDPOINTS.fabricantes)
export const getColores = () => list(ENDPOINTS.colores)
export const getTipos_producto = () => list(ENDPOINTS.tipos_producto)
export const getArquitecturas = () => list(ENDPOINTS.arquitecturas)
export const getSockets = () => list(ENDPOINTS.sockets)
export const getChipsets_gpu = () => list(ENDPOINTS.chipsets_gpu)
export const getTipos_memoria = () => list(ENDPOINTS.tipos_memoria)
export const getRefrigeraciones = () => list(ENDPOINTS.refrigeraciones)

//login de Usuario
export async function loginUsuario(username, password) {   //exportacion asincronica de funcion loginUsuario con los parametros username y password
  const response = await fetch(`${API_URL}token/`, { //peticion a la api que trae un JSON con username y password
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  const data = await response.json(); //espera respuesta del servidor 

  if (!response.ok) { //validacion 
    throw new Error(
      data.detail || 'Error al iniciar sesión'
    );
  }

  return data; //trae los datos pedidos si salio todo bien 
}


// Regitro de Usuario para uso del visitante 
export async function registrarCliente(datos) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}usuarios/`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datos),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    const errores = Object.entries(data)
      .map(([campo, mensajes]) => {
        const texto = Array.isArray(mensajes)
          ? mensajes.join(', ')
          : String(mensajes);

        return `${campo}: ${texto}`;
      })
      .join(' | ');

    throw new Error(
      errores || 'No se pudo completar el registro'
    );
  }

  return data;
}



//crea el usuario desde el admin
export async function verificarAdministrador(token) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}usuarios/`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    }
  );

  if (response.status === 401) {
    return 'sin_sesion';
  }

  if (response.status === 403) {
    return 'sin_permisos';
  }

  if (!response.ok) {
    throw new Error('No se pudieron verificar los permisos');
  }

  return 'administrador';
}


//listar usuarios

export async function crearUsuario(datos) {
  const token = sessionStorage.getItem('access');

  if (!token) {
    throw new Error('Tenés que iniciar sesión.');
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}usuarios/`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(datos),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      JSON.stringify(data)
    );
  }

  return data;
}


//funcion para obtener el usuario desde admin GET
export async function obtenerUsuario(id) {
  const token = sessionStorage.getItem('access');

  if (!token) {
    throw new Error('Tenés que iniciar sesión.');
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}usuarios/${id}/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || 'No se pudo obtener el usuario'
    );
  }

  return data;
}


// funcion para la edicion de usuario desde admin PATCH
export async function editarUsuario(id, datos) {
  const token = sessionStorage.getItem('access');

  if (!token) {
    throw new Error('Tenés que iniciar sesión.');
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}usuarios/${id}/`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(datos),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      JSON.stringify(data)
    );
  }

  return data;
}


//funcion para crear cliente 
export async function crearCliente(datos) {
  const token = sessionStorage.getItem('access');

  if (!token) {
    throw new Error('Tenés que iniciar sesión.');
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}clientes/`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(datos),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(JSON.stringify(data));
  }

  return data;
}



//Obtener cliente desde admin GET 
export async function obtenerCliente(id) {
  const token = sessionStorage.getItem('access');

  if (!token) {
    throw new Error('Tenés que iniciar sesión.');
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}clientes/${id}/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || 'No se pudo obtener el cliente'
    );
  }

  return data;
}


//editar cliente desde admin PATCH
export async function editarCliente(id, datos) {
  const token = sessionStorage.getItem('access');

  if (!token) {
    throw new Error('Tenés que iniciar sesión.');
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}clientes/${id}/`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(datos),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      JSON.stringify(data)
    );
  }

  return data;
}



//funcion para crear vendedor desde admin
export async function crearVendedor(datos) {
  const token = sessionStorage.getItem('access');

  if (!token) {
    throw new Error('Tenés que iniciar sesión.');
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}vendedores/`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(datos),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(JSON.stringify(data));
  }

  return data;
}



//obtener vendedor desde admin GET
export async function obtenerVendedor(id) {
  const token = sessionStorage.getItem('access');

  if (!token) {
    throw new Error('Tenés que iniciar sesión.');
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}vendedores/${id}/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || 'No se pudo obtener el vendedor'
    );
  }

  return data;
}


// Editar vendedor desde admin PATCH
export async function editarVendedor(id, datos) {
  const token = sessionStorage.getItem('access');

  if (!token) {
    throw new Error('Tenés que iniciar sesión.');
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}vendedores/${id}/`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(datos),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(JSON.stringify(data));
  }

  return data;
}


// verificar quien accede, si es admin o usuario 
export async function listarUsuarios(pagina = 1) {
  const token = sessionStorage.getItem('access');

  if (!token) {
    throw new Error('Tenés que iniciar sesión.');
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}usuarios/?page=${pagina}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || 'No se pudieron obtener los usuarios'
    );
  }

  return data;
}


//listar clientes


export async function listarClientes(pagina = 1) {
  const token = sessionStorage.getItem('access');

  if (!token) {
    throw new Error('Tenés que iniciar sesión.');
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}clientes/?page=${pagina}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || 'No se pudieron obtener los clientes'
    );
  }

  return data;
}


//listar vendedores

export async function listarVendedores(pagina = 1) {
  const token = sessionStorage.getItem('access');

  if (!token) {
    throw new Error('Tenés que iniciar sesión.');
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}vendedores/?page=${pagina}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || 'No se pudieron obtener los vendedores'
    );
  }

  return data;
}




// Función reutilizable para el borrado lógico
async function desactivarRegistro(tipo, id) {
  const token = sessionStorage.getItem('access');

  if (!token) {
    throw new Error('Tenés que iniciar sesión.');
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${tipo}/${id}/`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    let mensaje = 'No se pudo desactivar el registro';

    try {
      const data = await response.json();
      mensaje = data.detail || mensaje;
    } catch {
      // El servidor no devolvió un JSON válido.
    }

    throw new Error(mensaje);
  }

  return true;
}

// Desactivar usuario
export function desactivarUsuario(id) {
  return desactivarRegistro('usuarios', id);
}

// Desactivar cliente
export function desactivarCliente(id) {
  return desactivarRegistro('clientes', id);
}

// Desactivar vendedor
export function desactivarVendedor(id) {
  return desactivarRegistro('vendedores', id);
}

// ---------------------------------------------------------------------------
// VENTAS
// ---------------------------------------------------------------------------

// Hace el fetch con el token de la sesión y devuelve el JSON (o null si no hay
// contenido). Si la API responde con error, lanza un Error con el mensaje ya
// armado y el status en error.status.
async function llamar(ruta, { method = 'GET', body } = {}) {
  const token = sessionStorage.getItem('access'); // token que guardó el login

  if (!token) {
    throw new Error('Tenés que iniciar sesión.');
  }
  const response = await fetch(`${API_URL}${ruta}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // la API pide el token para ventas
    },
    body: body ? JSON.stringify(body) : undefined, // los datos van como JSON
    cache: 'no-store',
  });

  const data = await response.json().catch(() => null); // si no hay cuerpo, queda null

  if (!response.ok) {
    // La API devuelve { detail: "mensaje" } o { campo: ["mensaje"] }
    const mensaje = data?.detail
      ? data.detail
      : data
        ? Object.entries(data)
          .map(([campo, mensajes]) => {
            const texto = Array.isArray(mensajes)
              ? mensajes.join(', ')
              : String(mensajes);

            return `${campo}: ${texto}`;
          })
          .join(' | ')
        : 'Error al comunicarse con la API';

    const error = new Error(mensaje);
    error.status = response.status; // ej. 404, para mostrar "no encontrada"
    throw error;
  }

  return data;
}


//listar ventas (más nuevas primero)
export function listarVentas(pagina = 1) {
  return llamar(`ventas/?ordering=-id&page=${pagina}`);
}


//obtener una venta con sus detalles GET
export function obtenerVenta(id) {
  return llamar(`ventas/${id}/`);
}


//crear venta POST
export function crearVenta(datos) {
  return llamar('ventas/', { method: 'POST', body: datos });
}


//editar venta PATCH
export function editarVenta(id, datos) {
  return llamar(`ventas/${id}/`, { method: 'PATCH', body: datos });
}


//dar de baja una venta (borrado lógico) DELETE
export function borrarVenta(id) {
  return llamar(`ventas/${id}/borrado_logico/`, { method: 'DELETE' });
}


//agregar un producto a una venta POST
export async function crearDetalle(datos) {
  const detalle = await llamar('detalles-venta/', {
    method: 'POST',
    body: datos,
  });

  await actualizarTotal(detalle.id, datos.venta);

  return detalle;
}


//editar un producto de una venta PATCH
export async function editarDetalle(id, datos) {
  const detalle = await llamar(`detalles-venta/${id}/`, {
    method: 'PATCH',
    body: datos,
  });

  await actualizarTotal(id, datos.venta);

  return detalle;
}


//listar todos los productos (la API los manda de a 10 por página)
export async function listarProductos() {
  const productos = [];
  let pagina = 1;
  let hayMas = true;

  while (hayMas) {
    const data = await llamar(`productos/?page=${pagina}`);

    productos.push(...data.results);
    hayMas = Boolean(data.next);
    pagina += 1;
  }

  return productos;
}


// Un detalle nuevo queda con precio_unitario y subtotal en 0 hasta llamar a
// calcular_subtotal. Esa acción del Back SUMA el subtotal al total de la venta
// cada vez que se llama (no lo recalcula), así que después se deja el total
// igual a la suma real de los subtotales. Si el Back lo corrige, sigue andando.
async function actualizarTotal(detalleId, ventaId) {
  // 1) el Back calcula precio unitario y subtotal del detalle
  await llamar(`detalles-venta/${detalleId}/calcular_subtotal/`, {
    method: 'POST',
  });

  // 2) se trae la venta con todos sus detalles
  const venta = await obtenerVenta(ventaId);

  // 3) se suman los subtotales
  const total = venta.detalles.reduce(
    (suma, detalle) => suma + Number(detalle.subtotal),
    0
  );

  // 4) se guarda ese total en la venta
  await llamar(`ventas/${ventaId}/`, {
    method: 'PATCH',
    body: { total: total.toFixed(2) },
  });
}
