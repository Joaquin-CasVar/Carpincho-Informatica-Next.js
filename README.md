# Carpincho Informática Web App

Aplicación frontend de una tienda de informática y hardware.
Sus funcionalidades incluyen listado, carga, actualización y borrado de productos, ventas y usuarios (Tanto vendedores como clientes). También tiene un panel de administración para gestión.

## Integrantes
- [Valentino Alcaraz](https://github.com/Alquita)
- [Joaquín Castellano](https://github.com/Joaquin-CasVar)
- [Esteban Ordoñez](https://github.com/estebanordonezz)

## Despliegue en Vercel
La aplicacione esta desplegada a través de [Vercel](https://carpincho-informatica-next-js-lemon.vercel.app)

### API backend que consume el projecto
[Repositorio](https://github.com/Joaquin-CasVar/Carpincho-Informatica-API) - [Despliegue en Render](https://carpincho-informatica-api.onrender.com)

### Prerrequisitos
- [Node.js](https://nodejs.org/en/download)

### Pasos para ejecutar la applicación localmente
1. Clonar repositorio `https://github.com/Joaquin-CasVar/Carpincho-Informatica-Next.js.git`
2. Ingresar al directorio clonado `cd Carpincho-Informatica-Next.js/`
3. Instalar dependencias `npm install`
4. Correr proyecto `npm run dev`
5. Dirigirse a `localhost:3000`

#### Varialbles de entorno necesarias
Las variables de entorno estan en el archivo `.env.example` del repositorio

#### Tablero Kanban de organización del proyecto
[GitHub Projects](https://github.com/users/Joaquin-CasVar/projects/6/views/1)

### Pasos para correr los tests
Si todavía no tenes el repositorio en tu PC con las dependencias instaladas:
1. Clonar repositorio `https://github.com/Joaquin-CasVar/Carpincho-Informatica-Next.js.git`
2. Ingresar al directorio clonado `cd Carpincho-Informatica-Next.js/`
3. Instalar dependencias `npm install`
4. Correr tests `npm run test`

Si ya tenes el repositorio
1. Correr tests `npm run test`

---

# Aplicación Funcionando
#### / (Ruta Base) 
##### Tema claro
![Ruta Base Modo Claro](https://i.imgur.com/y5DcB5J.png)

##### Tema oscuro
![Ruta Base Modo Oscuro](https://i.imgur.com/q7g7zpz.png)

#### /productos
![productos](https://i.imgur.com/Vox3oCa.png)

#### /productos/[id] (Detalle)
![productos-detalle](https://i.imgur.com/L5I4cpe.png)

#### /productos/cargar (Para carga y edición)
![productos-cargar](https://i.imgur.com/RTTObIx.png)

#### /ventas
![ventas](https://i.imgur.com/AJUWhHj.png)

#### /account/register
![Registro](https://i.imgur.com/htUhMty.png)

#### /account/login
![Inicio Sesion](https://i.imgur.com/xOZZdAj.png)

#### /estadisticas
![estadisticas](https://i.imgur.com/0rDKTlr.png)

#### /about
![about](https://i.imgur.com/cJmMKbc.png)
