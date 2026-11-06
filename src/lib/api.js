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

