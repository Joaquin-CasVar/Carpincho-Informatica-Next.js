const API_URL = process.env.NEXT_PUBLIC_API_URL; // Traigo url del back

//login de Usuario
export async function loginUsuario(username, password) {   //exportacion asincronica de funcion loginUsuario con los parametros username y password
  const response = await fetch(`${API_URL}/api/token/`, { //peticion a la api que trae un JSON con username y password
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
    `${process.env.NEXT_PUBLIC_API_URL}/api/usuarios/`,
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
    `${process.env.NEXT_PUBLIC_API_URL}/api/usuarios/`,
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
    `${process.env.NEXT_PUBLIC_API_URL}/api/usuarios/`,
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
    `${process.env.NEXT_PUBLIC_API_URL}/api/usuarios/${id}/`,
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
    `${process.env.NEXT_PUBLIC_API_URL}/api/usuarios/${id}/`,
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
    `${process.env.NEXT_PUBLIC_API_URL}/api/clientes/`,
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
    `${process.env.NEXT_PUBLIC_API_URL}/api/clientes/${id}/`,
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
    `${process.env.NEXT_PUBLIC_API_URL}/api/clientes/${id}/`,
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
    `${process.env.NEXT_PUBLIC_API_URL}/api/vendedores/`,
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
    `${process.env.NEXT_PUBLIC_API_URL}/api/vendedores/${id}/`,
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
    `${process.env.NEXT_PUBLIC_API_URL}/api/vendedores/${id}/`,
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
    `${process.env.NEXT_PUBLIC_API_URL}/api/usuarios/?page=${pagina}`,
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
    `${process.env.NEXT_PUBLIC_API_URL}/api/clientes/?page=${pagina}`,
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
    `${process.env.NEXT_PUBLIC_API_URL}/api/vendedores/?page=${pagina}`,
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


