
const preguntas = [
  {
    pregunta: '¿Qué productos ofrece Carpincho Informática?',
    respuesta:
      'La tienda cuenta con un catálogo de productos informáticos, como procesadores, placas de video y otros componentes.',
  },
  {
    pregunta: '¿Cómo puedo consultar los productos?',
    respuesta:
      'Podés navegar por el catálogo de la tienda y consultar la información disponible de cada producto.',
  },
  {
    pregunta: '¿Necesito una cuenta para comprar?',
    respuesta:
      'El sistema contempla cuentas de clientes. Los requisitos de autenticación para realizar compras dependerán de la implementación del proceso de ventas.',
  },
  {
    pregunta: '¿Qué métodos de pago aceptan?',
    respuesta:
      'Los métodos de pago todavía no fueron definidos para el proyecto. Esta información se actualizará cuando estén disponibles.',
  },
  {
    pregunta: '¿Realizan envíos?',
    respuesta:
      'Las condiciones de envío todavía no fueron definidas. Podés consultar la sección de contacto para obtener más información.',
  },
  {
    pregunta: '¿Cómo puedo comunicarme con la tienda?',
    respuesta:
      'Podés ingresar a la sección Contacto, donde encontrarás el formulario de consultas.',
  },
];

export default function FAQPage() {
  return (
    <main className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Preguntas frecuentes
        </h1>

        <p className="mt-2">
          Encontrá respuestas a las consultas más comunes.
        </p>
      </div>

      <section className="space-y-3">
        {preguntas.map((item) => (
          <details
            key={item.pregunta}
            className="rounded-lg border p-4"
          >
            <summary className="cursor-pointer font-semibold">
              {item.pregunta}
            </summary>

            <p className="mt-3">
              {item.respuesta}
            </p>
          </details>
        ))}
      </section>
    </main>
  );
}
