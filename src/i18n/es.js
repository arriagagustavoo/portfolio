export default {

    app: {
        skipLink: "Saltar al contenido",
    },

    header: {
        // id is the section anchor and never translates. `to` makes it a route instead
        nav: [
            { id: "about", label: "Sobre mí" },
            { id: "projects", label: "Trabajo" },
            { id: "services", label: "Servicios" },
            { id: "process", label: "Proceso" },
            { id: "dev", label: "Dev", to: "/dev" },
            { id: "contact", label: "Contacto" },
        ],
        logoAlt: "Gustavo Arriaga",
        menuLabel: "Abrir menú",
        themeLabel: "Cambiar tema",
        // written in the language it switches to, which is how language pickers are meant to read
        languageLabel: "View in English",
        languageCode: "EN",
    },

    meta: {
        home: {
            title: "Gustavo Arriaga — Desarrollador y diseñador web en Houston",
            description: "Desarrollador y diseñador web freelance en Houston. Sitios web, software a medida, branding y SEO local, y modelado e impresión 3D para pequeños negocios.",
        },
        dev: {
            title: "Dev — Gustavo Arriaga",
            description: "El lado técnico: el stack completo con el que construyo, más los proyectos de escuela y personales detrás del trabajo con clientes.",
        },
        privacy: {
            title: "Política de Privacidad — Gustavo Arriaga",
            description: "Qué recopila este sitio, quién lo maneja y por cuánto tiempo se guarda.",
        },
        notFound: {
            title: "Página no encontrada — Gustavo Arriaga",
            description: "Esta página no existe.",
        },
    },

    hero: {
        eyebrow: "// Hola, soy",
        status: "Acepto proyectos",
        // the h1's real text, since the visible copy scrambles and is aria-hidden
        headingSuffix: " — Sitios web, software, diseño e impresión 3D en Houston",
        services: [
            "Software a medida full-stack",
            "Diseño gráfico y SEO",
            "Modelos e impresión 3D",
        ],
        badges: ["Freelancer", "Diseñador", "Ingeniero", "Creador"],
        // exactly three words: each one owns a class the colour cycle keys off
        motto: ["Diseña.", "Crea.", "Lanza."],
        primaryCta: "Mira mi trabajo",
        secondaryCta: "Contáctame",
    },

    about: {
        heading: "Sobre Gustavo Arriaga",
        leadEyebrow: "// Conóceme",
        whyEyebrow: "// Por qué trabajar conmigo",
        interestsEyebrow: "// Algunos de mis intereses",
        photoAlt: "Gustavo Arriaga",
        // split so each line can stagger in on its own
        bioLines: [
            "Construyo sitios web y software a la medida para negocios del área de Houston.",
            "Trabajo con clientes donde sea. Me enorgullece poder entregar mi trabajo en inglés y español, a distancia.",
            "En la universidad disfrutaba los proyectos prácticos que se parecían a cómo se hacen las cosas en el mundo real, pero nunca me gustó que solo estaba persiguiendo una calificación y que el trabajo nunca se usara.",
            "Así que empecé a construir cosas que la gente sí usara, y construí mi propio portal de clientes, contratos y facturación para operar en forma.",
            "Lo que me importa es que funcione, y que no acabes pagándole a alguien más para arreglarlo después.",
            "Sea digital o físico, dime qué necesita tu negocio y te digo cómo lo construiría.",
        ],
        freelancing: "Freelance desde 2026",
        location: "Houston, Texas",
        school: "Universidad de Houston",
        degree: "Lic. en Ciencias de la Computación, Diseño de Software",
        schoolLogoAlt: "Logo de la Universidad de Houston",
        quote: {
            text: "Mientras esté vivo, tengo infinitas oportunidades.",
            source: "— Monkey D. Luffy, One Piece",
        },
        reasons: [
            {
                title: "Una sola persona, de principio a fin",
                body: "El trabajo se queda entre tú y yo. No tienes que preocuparte por terceros.",
            },
            {
                title: "Uso mi propio software",
                body: "Construí mi propio portal de clientes seguro y mis documentos personalizados para usarlos en mi negocio.",
            },
            {
                title: "Trabajo totalmente a la medida",
                body: "Trabajo hecho para tu negocio. Construido desde cero para lo que necesitas.",
            },
            {
                title: "Bilingüe",
                body: "Entiendo al público y puedo adaptar todo para usuarios en inglés y español.",
            },
        ],
        interests: ["Código", "Diseño", "Fitness", "Modelado", "Hardware", "Juegos", "Anime"],
    },

    projects: {
        work: {
            heading: "Proyectos de desarrollo web y software",
            eyebrow: "// Algo de mi trabajo",
        },
        dev: {
            heading: "Proyectos de software personales y de escuela",
            eyebrow: "// Fuera del trabajo con clientes",
        },
        viewGallery: "Ver galería",
        readCaseStudy: "Ver caso de estudio",
        featured: "Destacado",
        moreWork: "Mira más de mi trabajo",
        caseStudyButton: "Ver caso de estudio",
        moreSkills: (count) => "+" + count + " más",
        shots: (count) => count + " capturas",
        galleryButtonLabel: (count, title) => "Ver " + count + " capturas de " + title,
        caseStudyLabel: (title) => "Leer el caso de estudio de " + title,
        githubLabel: (title) => "Repositorio de GitHub de " + title,
        // keyed by the project id in Projects.jsx, titles stay English as product names
        items: {
            clientportal: {
                pitch: "Propuestas, contratos, facturas y avances en un solo lugar, con cada documento tomado de una sola ficha de proyecto.",
                points: [
                    "Los clientes aprueban propuestas y firman contratos con su nombre escrito",
                    "Avances con fotos, archivos y mensajes en un solo lugar",
                    "Un lado administrativo para proyectos, pagos y las cuentas",
                    "El lado del cliente se lee en inglés o español",
                ],
                description: "Un portal donde entran mis clientes de freelance. Aprueban propuestas, firman contratos, pagan facturas, ven el avance y envían archivos en un solo lugar, y el lado de administración detrás lleva los proyectos, los documentos, los pagos y la contabilidad.",
                coverAlt: "Portada de Client Portal que dice 'Makes running a business easy.'",
                alts: [
                    "Pantalla de acceso del cliente que pide el correo con el que se compartió el proyecto",
                    "Panel del cliente con la etapa del proyecto, lo pagado y lo pendiente, documentos, avance y mensajes",
                    "La propuesta como la lee el cliente, con los controles para aprobar o pedir cambios",
                    "Contrato de servicio firmado que muestra a ambas partes y el registro de la aprobación",
                    "La factura como la ve el cliente, con el monto a pagar y cómo pagarlo",
                    "Historial de avance con capturas del sitio, cada una con una reacción y un campo de comentario",
                    "Hilo de mensajes entre el cliente y yo",
                    "Archivos que el cliente ha enviado, junto a los puntos de la lista que responden",
                    "Lista de lanzamiento con lo que ya está hecho y lo que sigue pendiente",
                    "Página de mantenimiento con el plan mensual y su historial de facturas",
                    "Panel de administración con todos los proyectos activos, la actividad reciente y lo que necesita respuesta",
                    "Resumen de administración de un solo proyecto",
                    "Todos los documentos de un proyecto con su estado y su versión",
                    "Editor de propuestas junto a una vista previa en vivo del documento que genera",
                    "Editor de contratos junto a su vista previa en vivo",
                    "Publicando una actualización de avance con varias fotos adjuntas",
                    "El hilo de mensajes desde el lado de administración",
                    "Archivos que subió el cliente, desde el lado de administración",
                    "Pagos, facturas, gastos y costos recurrentes de un proyecto",
                    "Lista de lanzamiento y preparación de la entrega desde administración",
                    "Contabilidad de todos los proyectos, con el dinero que entra y el que sale",
                    "Registro de auditoría de cada acción tomada en cada proyecto",
                    "El formulario que crea un proyecto nuevo y el acceso de su cliente",
                ],
            },
            queuesmart: {
                pitch: "Una aplicación web de gestión de filas hecha por un equipo de cuatro. Yo construí el lado administrativo: el panel, las filas y los servicios.",
                description: "Sitio web fullstack. Funcionalidad completa tanto para usuarios como para administradores. Autenticación, interacciones en tiempo real y almacenamiento en base de datos.",
                coverAlt: "Portada de QueueSmart que dice 'smarter way to wait in line'",
                alts: [
                    "Pantalla de inicio de sesión con campos de correo y contraseña",
                    "Formulario de registro de cuenta",
                    "Pantalla de acceso no autorizado para una ruta bloqueada",
                    "Panel del usuario con la fila actual, notificaciones y servicios activos",
                    "Uniéndose a una fila desde la lista de servicios disponibles",
                    "Estado de la fila en vivo con posición y espera estimada",
                    "Historial del usuario de visitas anteriores",
                    "Formulario de comentarios del usuario con calificación por estrellas",
                    "Panel del administrador con un resumen de la actividad de las filas",
                    "Tabla de gestión de filas con personas esperando, espera estimada y prioridad",
                    "Editando una entrada de la fila desde la tabla de gestión",
                    "Lista de gestión de todos los servicios reservables",
                    "Creando un servicio nuevo",
                    "Editando un servicio existente",
                    "Vista de reportes de la actividad de las filas",
                    "Reporte exportado a CSV y abierto en una hoja de cálculo",
                    "Reporte exportado como documento PDF",
                    "Vista de comentarios del administrador con todos los envíos y la calificación promedio",
                ],
            },
            documents: {
                pitch: "La propuesta, el contrato y la factura que envío a mis clientes, como páginas para llenar que se imprimen como PDF limpios.",
                description: "Plantillas de propuesta, contrato y factura que comparten un solo conjunto de datos. Los datos del cliente y los montos se escriben una vez y se llevan a las tres, con autoguardado y salida en PDF lista para imprimir.",
                coverAlt: "Portada de Bracketed que dice 'Fill the brackets. Skip the paperwork.'",
                alts: [
                    "Menú principal del portal de documentos, página 1",
                    "Menú principal del portal de documentos, página 2",
                    "Propuesta de proyecto, página 1",
                    "Propuesta de proyecto, página 2",
                    "Contrato del cliente, página 1",
                    "Contrato del cliente, página 2",
                    "Factura, página 1",
                    "Factura, página 2",
                ],
            },
            rideshare: {
                description: "Interfaz fullstack para simular el uso de una base de datos SQL relacional a través de transacciones y reservaciones",
                coverAlt: "Portada de RideShare que dice 'Reliable booking. Safe travels.'",
                alts: [
                    "Página de reservaciones antes de registrar cualquier viaje",
                    "Página de reservaciones con datos de viajes y transacciones",
                ],
            },
            maze: {
                description: "Juego interactivo totalmente en 3D hecho con Python y OpenGL. Algoritmo propio para generar laberintos al azar.",
                coverAlt: "Portada de Labyrinth que dice 'Lost in space. Try and escape the labyrinth.'",
                alts: [
                    "Vista inicial de un laberinto 3D generado al azar",
                    "Mejora azul de velocidad que aumenta el movimiento del jugador",
                    "Mejora verde de salto alto que da una vista aérea del laberinto",
                    "Trampa roja que reduce el movimiento del jugador",
                    "Trampa rosa que gira la cámara para desorientar al jugador",
                ],
            },
            unity: {
                description: "Personajes originales y recursos propios. Animaciones dibujadas cuadro por cuadro, integradas en el motor Unity y con controles de teclado.",
                coverAlt: "Portada de Faceoff que dice 'frame-by-frame', con los dos personajes enfrentados",
                alts: [
                    "Escena del nivel armada en el editor de Unity",
                    "Video del juego con el jugador avanzando por el nivel",
                    "Animación del personaje principal en reposo, dibujada cuadro por cuadro",
                    "Ciclo de caminata del personaje principal",
                    "Animación de ataque del personaje principal",
                    "Animación del enemigo en reposo",
                    "Animación de movimiento del enemigo",
                    "Animación de ataque del enemigo",
                ],
            },
            mri: {
                description: "Interfaz en Matlab para simular una resonancia magnética digital con parámetros y valores propios",
                coverAlt: "Portada de MRI Scanner que dice 'Matlab GUI. Custom data. Accurate results.'",
                alts: [
                    "Interfaz del escáner con el fantoma rectangular y adquisición cartesiana configurada",
                    "Fantoma rectangular, reconstrucción cartesiana y mapa de diferencias con perfiles de señal",
                    "Interfaz del escáner con el fantoma circular y adquisición radial configurada",
                    "Fantoma circular, reconstrucción radial y mapa de diferencias con perfiles de señal",
                ],
            },
        },
    },

    lightbox: {
        shots: (count) => count + " capturas",
        galleryLabel: (title) => "Capturas de " + title,
        expandLabel: (alt) => "Ampliar: " + alt,
        closeGallery: "Cerrar galería",
        closeExpanded: "Cerrar imagen ampliada",
        previous: "Captura anterior",
        next: "Captura siguiente",
        previousLabel: "‹ Anterior",
        nextLabel: "Siguiente ›",
    },

    caseStudy: {
        eyebrow: "// Caso de estudio",
        back: "Volver al trabajo",
        next: "Siguiente caso de estudio",
        stackHeading: "Construido con",
        galleryCta: (count) => "Ver las " + count + " capturas",
        // the shots are seeded with invented businesses, and saying so keeps the page honest
        galleryNote: "Las capturas usan negocios ficticios de demostración, no datos de clientes reales.",
        ctaText: "¿Te interesa algo así?",
        ctaLabel: "Empezar un proyecto",
        items: {
            documents: {
                meta: {
                    title: "Bracketed — Caso de estudio — Gustavo Arriaga",
                    description: "Bracketed es la propuesta, el contrato y la factura que envío a mis clientes: plantillas para llenar en HTML simple que se imprimen como PDF limpios.",
                },
                linked: {
                    heading: "Llena los corchetes",
                    body: "La propuesta, el contrato y la factura como empiezan. Cada [ corchete ] es un campo donde haces clic y escribes encima. Los que significan lo mismo en los tres, como el nombre del cliente y el precio, están marcados para llenarse desde un archivo guardado.",
                    labels: ["Propuesta", "Contrato", "Factura"],
                },
                summary: [
                    "Bracketed es la propuesta, el contrato y la factura que envío a mis clientes. Cada uno es una página para llenar: haces clic en un [ corchete ] y escribes encima, agregas o quitas líneas, y lo imprimes como PDF tamaño carta. Lo diseñé en Figma y lo construí para que coincida.",
                    "También es donde empezó la idea detrás de mi portal de clientes. Los tres documentos comparten campos, así que los datos del cliente y el precio se escriben una vez, se guardan en un archivo y se cargan en el siguiente documento. El portal después lo hizo automático. Lo construí yo solo, es para mi propio uso y no está publicado en ningún lado.",
                ],
                sections: [
                    {
                        heading: "Por qué lo construí",
                        body: "Todo cliente necesita los mismos tres documentos. Quería que se vieran como mi trabajo, que llenarlos tomara minutos, y que salieran como un PDF limpio cada vez.",
                    },
                    {
                        heading: "Cómo se usa",
                        body: "No hay nada que instalar. Se abre en un navegador.",
                        points: [
                            "Abres un documento y haces clic en cualquier [ corchete ] para escribir encima",
                            "Agregas o quitas líneas con los botones en pantalla",
                            "Guardas los datos del cliente y los cargas en el siguiente documento",
                            "Imprimes a PDF y se lo envías al cliente",
                        ],
                    },
                    {
                        heading: "Lo que trae",
                        body: "Tres documentos y un menú de inicio que los enlaza, más algunas cosas que lo hacen práctico.",
                        points: [
                            "Autoguardado, para que recargar la página no borre el formulario",
                            "El texto fijo, como los términos del contrato y los datos bancarios, se edita ahí mismo y se guarda de vuelta en el archivo",
                            "Páginas tamaño carta o una sola página larga al imprimir",
                        ],
                    },
                    {
                        heading: "Qué significa para ti",
                        body: "Tus documentos se ven igual cada vez y llegan como un PDF limpio. Los números de tu propuesta y de tu factura coinciden, porque salieron del mismo lugar.",
                    },
                    {
                        heading: "Cómo está construido",
                        body: "HTML, CSS y JavaScript simples. Sin framework, sin paso de compilación, sin instalar nada. Un script compartido de unas 800 líneas maneja la edición, el guardado y la impresión. Los tamaños están en puntos para que el diseño coincida uno a uno con el de Figma. El diseño de impresión usa una tabla para que el encabezado y el pie se repitan en cada página y nunca tapen texto.",
                    },
                ],
            },
            queuesmart: {
                meta: {
                    title: "QueueSmart — Caso de estudio — Gustavo Arriaga",
                    description: "Una aplicación web de gestión de filas construida por un equipo de cuatro para un curso de Diseño de Software. Yo construí el lado administrativo: el panel, la gestión de filas y la de servicios.",
                },
                linked: {
                    heading: "El lado administrativo",
                    body: "El panel y la tabla de gestión de filas, que son las partes que construí. Desde aquí un administrador puede abrir, pausar o cerrar una fila, atender a la siguiente persona, o gestionar a alguien que ya está esperando.",
                    labels: ["Panel", "Gestión de filas"],
                },
                summary: [
                    "Una aplicación web de gestión de filas de mi curso de Diseño de Software en la Universidad de Houston, construida por un equipo de cuatro. Las personas se forman en una fila para un servicio, ven su posición y el tiempo estimado de espera, y reciben avisos. Los administradores manejan las filas detrás.",
                    "Yo construí el lado administrativo: el panel, la gestión de filas y la de servicios, la API detrás de ellos, los datos de demostración y la mayoría de las pruebas de las rutas de filas y servicios. Mis compañeros construyeron las cuentas, el lado del usuario, el cálculo del tiempo de espera y la mayor parte del diseño visual. Es un trabajo de la escuela, no de un cliente, y no está publicado.",
                ],
                sections: [
                    {
                        heading: "La tarea",
                        body: "Nos dieron una aplicación de filas para construir y nos pidieron que funcionara por completo con tecnologías reales, no una maqueta. Así que tiene cuentas reales, una base de datos real, una API real y un conjunto de pruebas detrás.",
                    },
                    {
                        heading: "Lo que hacen los usuarios",
                        body: "Cualquiera puede registrarse e iniciar sesión, y usar la fila como lo haría un cliente.",
                        points: [
                            "Formarse en una fila para cualquier servicio disponible",
                            "Ver su posición y el tiempo estimado de espera, actualizado cada 5 segundos",
                            "Recibir avisos del administrador",
                            "Salirse de la fila si lo necesitan",
                            "Calificar su visita después, y revisar su historial",
                        ],
                    },
                    {
                        heading: "Lo que hacen los administradores",
                        body: "Este es el lado en el que trabajé.",
                        points: [
                            "Vigilar todas las filas desde un solo panel",
                            "Atender a la siguiente persona, subir o bajar a alguien, o quitarlo",
                            "Abrir, pausar o cerrar una fila",
                            "Crear, editar y borrar los servicios para los que la gente se forma",
                        ],
                    },
                    {
                        heading: "Por qué está en esta página",
                        body: "No es trabajo de un cliente y no voy a fingir que lo es. Sí muestra lo que necesitan la mayoría de las herramientas de un negocio pequeño: cuentas, un administrador que puede cambiar datos en vivo con seguridad, y pruebas para que un cambio no rompa lo que ya funciona.",
                    },
                    {
                        heading: "Cómo está construido",
                        body: "React y Vite en el front end. Node y Express con MongoDB detrás. Las cuentas usan JWT y bcrypt, y la API revisa el rol del usuario antes de cada ruta, así que las acciones de administrador son solo para administradores. Jest y Supertest corren 63 pruebas contra una base de datos en memoria.",
                    },
                ],
            },
            clientportal: {
                meta: {
                    title: "Client Portal — Caso de estudio — Gustavo Arriaga",
                    description: "Un portal de clientes construido para operar mi propio negocio freelance: propuestas, contratos, facturas, avance y archivos en un solo lugar, sobre Next.js y Supabase.",
                },
                linked: {
                    heading: "Una ficha, todos los documentos",
                    body: "Un proyecto de demostración, visto en dos documentos. El cliente, el precio de $2,800, el anticipo de $1,200 y el plan mensual de $150 se escribieron una sola vez, en el proyecto. La propuesta y el contrato los tomaron de ahí.",
                    labels: ["Propuesta", "Contrato"],
                },
                summary: [
                    "El software que construí para operar mi negocio freelance. Los clientes entran para aprobar propuestas y contratos, seguir su proyecto y ver lo que llevan pagado. El lado administrativo maneja los proyectos, los documentos, los pagos y las cuentas.",
                    "Lo importante es que todo está conectado. Cada proyecto tiene una sola ficha, y la propuesta, el contrato, la factura y el documento de entrega toman sus datos de ahí. Escribes un precio, una fecha o los datos del cliente una vez y se llena en todos lados. Si lo cambias en un documento, todos los borradores sin enviar se actualizan. Cuando se envía un documento se guarda como versión, así que nada de lo que el cliente ya vio cambia a sus espaldas.",
                ],
                sections: [
                    {
                        heading: "Por qué lo construí",
                        body: "Tener un negocio significa papeleo. Propuestas, contratos, facturas, archivos, avances. Llevar todo eso por correo se vuelve un desorden rápido, y el cliente se queda adivinando en qué va su proyecto. Escribir el mismo precio en tres documentos distintos también es como se cometen errores. Quería un solo lugar para todo, así que lo construí.",
                    },
                    {
                        heading: "Lo que ve un cliente",
                        body: "Entra con un código por correo, así que no hay contraseña que recordar, y todo lo de su proyecto está en un solo panel.",
                        points: [
                            "Un recorrido del proyecto paso a paso, y lo pagado contra lo pendiente",
                            "Propuestas y contratos para aprobar con su nombre escrito, o devolver con cambios",
                            "Facturas, y un PDF firmado de todo lo que aprueba",
                            "Avances con fotos, y un lugar para subir archivos",
                            "Mensajes guardados junto al proyecto",
                            "Todo el portal en inglés o español, a su elección",
                        ],
                    },
                    {
                        heading: "Qué significa para ti",
                        body: "Siempre sabes en qué va tu proyecto, y no andas buscando un contrato o una factura en el correo. Tus datos se escriben una vez, así que los números de tu propuesta, contrato y factura siempre coinciden. También es la prueba más clara que te puedo mostrar de lo que sé construir.",
                    },
                    {
                        heading: "Cómo está construido",
                        body: "Next.js y TypeScript sobre Supabase y Postgres. Sesiones con JWT, validación con Zod en cada entrada, PDFs firmados generados con Puppeteer, y 43 pruebas de punta a punta con Playwright sobre los dos lados. Alrededor de cuarenta rutas entre el lado del cliente y el administrativo.",
                    },
                ],
            },
        },
    },

    dev: {
        eyebrow: "// El lado dev",
        title: "El lado técnico",
        lead: "Todo lo que sostiene el trabajo con clientes: el stack con el que construyo, y los proyectos de escuela y personales donde lo aprendí.",
        outro: "¿Lo quieres aplicado a tu negocio?",
        back: "Ver lo que ofrezco",
    },

    skills: {
        heading: "Habilidades y tecnologías",
        eyebrow: "// Habilidades",
        // the skill names themselves are exact-match keys into skillIcons and never translate
        categories: {
            languages: "Lenguajes",
            web: "Desarrollo Web",
            creative: "Trabajo creativo",
            tools: "Herramientas",
        },
    },

    services: {
        heading: "Servicios freelance de desarrollo web, diseño e impresión 3D",
        eyebrow: "// Servicios",
        packagesEyebrow: "// Paquetes web",
        startingFrom: "Desde",
        packagesNote: "LAS OPCIONES NO SE LIMITAN A ESTOS PAQUETES. Son estimados aproximados. Definamos lo que necesitas.",
        packagesTerms: "Todos los paquetes incluyen mantenimiento mensual desde el día del lanzamiento: disponibilidad, corrección de errores y ajustes pequeños. Tu dominio, hosting y cuentas quedan a tu nombre todo el tiempo.",
        previousPackage: "Paquete anterior",
        nextPackage: "Paquete siguiente",
        cards: [
            {
                tag: "Freelance",
                title: "Productos de software",
                description: "Sitios web, aplicaciones y herramientas a medida.",
            },
            {
                tag: "Que te encuentren",
                title: "Diseño y SEO",
                description: "Branding, gráficos y SEO local.",
            },
            {
                tag: "Hecho a pedido",
                title: "Modelado e impresión 3D",
                description: "Diseños CAD, prototipos y productos terminados, impresiones a medida.",
            },
            {
                tag: "Hablemos",
                title: "Abierto a todo",
                description: "Escríbeme por cualquier servicio, esté en la lista o no.",
            },
        ],
        // plain language on purpose: the client has to see what the extra money buys
        packages: [
            {
                id: "basic",
                name: "Básico",
                price: "Desde $600",
                monthly: "$30/mes",
                summary: "Un sitio que le muestra a la gente quién eres, qué haces y cómo contactarte.",
                includes: [
                    "Hecho a la medida de tu marca",
                    "Página pública estática: sin páginas de administración",
                    "Formulario de contacto que llega directo a tu correo",
                    "Tu sitio escrito para que Google pueda leer los datos del negocio desde el código",
                    "Adaptado a celular y computadora",
                ],
                note: "Sin base de datos. Poner tu negocio en Google Maps con reseñas es la configuración de SEO de abajo.",
            },
            {
                id: "standard",
                name: "Estándar",
                price: "Desde $1500",
                monthly: "$45/mes",
                summary: "Todo lo del Básico, y el sitio empieza a trabajar en lugar de solo estar ahí.",
                includes: [
                    "Todo lo del Básico",
                    "Páginas públicas y privadas",
                    "Páginas de administración para entrar y gestionar. Ej: reservaciones, pedidos, mensajes, registros",
                    "Un backend, es decir que el sitio tiene lógica propia y guarda datos en su propia base de datos",
                    "Autenticación y acceso seguro a información privada",
                ],
                note: "Aquí es donde el sitio deja de ser un folleto y pasa a ser parte del negocio.",
            },
            {
                id: "premium",
                name: "Premium",
                price: "Desde $2300",
                monthly: "$70/mes",
                summary: "Todo lo del Estándar, diseñado desde cero, con la marca y tu ficha de Google resueltas.",
                includes: [
                    "Todo lo del Estándar",
                    "Branding a medida en todos los productos, con los archivos a tu nombre",
                    "La configuración de SEO de abajo",
                    "Cuentas de usuario y accesos personalizados",
                    "Conexiones con servicios externos",
                    "Correcciones y comunicación prioritarias",
                ],
                note: "Un diseño único que llega a nuevos usuarios. El sitio se conecta con otras herramientas en vez de funcionar aislado",
            },
        ],
        // one price each, and a status line, because the single two-price card read as a word dump
        addons: [
            {
                id: "seo-setup",
                name: "Configuración SEO",
                price: "Desde $100",
                status: "Ya incluido en Premium",
                summary: "Un trabajo único que pone tu negocio en Google Maps y en los resultados locales. Reclamo y lleno tu Perfil de Negocio de Google, y hago que tus datos coincidan en Google, Yelp, Facebook y donde sea que aparezcas. Deja que tus clientes dejen una reseña con un solo clic.",
            },
            {
                id: "seo-care",
                name: "Cuidado SEO",
                price: "$15/mes",
                status: "No viene en ningún paquete. Agrégalo a cualquiera.",
                summary: "Mensual y recurrente. Mantengo tu perfil al día, te ayudo a responder reseñas y te mando un reporte claro de las llamadas, clics e indicaciones que generó. Sin escribir artículos y sin comprar enlaces, y nadie te puede prometer honestamente una posición en Google.",
            },
        ],
    },

    process: {
        heading: "Cómo trabajamos juntos, garantías, formas de pago y preguntas frecuentes",
        leadEyebrow: "// Cómo funciona",
        guaranteeEyebrow: "// Lo que se te garantiza",
        paymentEyebrow: "// Pagos",
        faqEyebrow: "// Preguntas frecuentes",
        steps: [
            {
                number: "01",
                title: "Contacto",
                body: "Dime qué necesita tu negocio, en palabras sencillas. Yo armo la propuesta.",
            },
            {
                number: "02",
                title: "Documentos",
                body: "Recibes el alcance, el precio y el plazo por escrito antes de empezar. Se firma un contrato.",
            },
            {
                number: "03",
                title: "Desarrollo",
                body: "Lo construyo y te voy mostrando el avance. Mantengo la comunicación en todo momento.",
            },
            {
                number: "04",
                title: "Entrega",
                body: "Pago. Las cuentas quedan a tu nombre, te explico todo y sigo disponible.",
            },
        ],
        // every line here comes from the signed contract, not from marketing copy
        guarantees: [
            {
                title: "El dominio y el hosting son tuyos",
                body: "Registrados a tu nombre, con tu método de pago. Yo tengo acceso de administrador para hacer el trabajo, pero las cuentas son tuyas.",
            },
            {
                title: "Sin cobros sorpresa",
                body: "Cualquier cosa fuera de lo acordado se cotiza por escrito primero, y no se empieza hasta que lo apruebes.",
            },
            {
                title: "Puedes irte con todo",
                body: "Cualquiera de los dos puede terminar con 30 días de aviso. Tus cuentas, exportaciones de datos y registros se te entregan.",
            },
            {
                title: "Tus datos siguen siendo tuyos",
                body: "La información que recopila tu sitio y los documentos que genera te pertenecen.",
            },
        ],
        paymentPoints: [
            "Un anticipo (%) al firmar, el resto contra entrega.",
            "Zelle, transferencia bancaria o cheque.",
            "El mantenimiento mensual viene incluido en todos los paquetes y empieza en el lanzamiento: disponibilidad, corrección de errores y ajustes pequeños. Las funciones nuevas se cotizan aparte.",
        ],
        faqs: [
            {
                question: "¿Necesito saber algo técnico?",
                answer: "No. Si puedes describir qué hace tu negocio y qué quieres que la gente pueda hacer en el sitio, con eso basta. Yo me encargo del resto, y te explico la parte que quieras entender.",
            },
            {
                question: "¿Cuánto tiempo toma?",
                answer: "Depende del paquete y de qué tan rápido me llegue el contenido de tu parte. Recibes un plazo en la propuesta antes de empezar, así que nunca te quedas adivinando.",
            },
            {
                question: "¿Y si ya tengo un dominio?",
                answer: "Entonces lo usamos. Si todavía no tienes uno, se registra a tu nombre y no al mío.",
            },
            {
                question: "¿Solo trabajas con negocios en Houston?",
                answer: "No. Houston es donde estoy y con los negocios locales es con quien más trabajo, pero el trabajo en sí es remoto de todos modos.",
            },
            {
                question: "¿Qué pasa después del lanzamiento?",
                answer: "Sigue funcionando, y yo lo sigo cuidando. El mensual cubre disponibilidad, corrección de errores y ajustes pequeños, y empieza el día que sales en vivo. No te quedas solo con el sitio, ni tampoco andas persiguiéndome.",
            },
            {
                question: "¿Tengo que pagar mensualmente?",
                answer: "Sí. Es parte de todos los paquetes, no un extra. Un sitio que nadie cuida se descompone en silencio: los formularios dejan de enviar, los datos se quedan viejos y las actualizaciones de seguridad se acumulan hasta que algo falla. El mensual es lo que evita eso. Aun así no es un amarre. Cualquiera de los dos puede terminar con 30 días de aviso, y tu dominio, hosting y cuentas están a tu nombre todo el tiempo, así que nunca dependes de mí para conservar tu propio sitio.",
            },
            {
                question: "¿Qué hace realmente el complemento de SEO?",
                answer: "Te pone en Google Maps y en los resultados locales. Reclamo y lleno tu Perfil de Negocio de Google, me aseguro de que tu nombre, dirección y teléfono coincidan en todos lados, y dirijo tus reseñas al lugar correcto. Mes a mes lo mantengo al día y te mando un reporte claro de las llamadas, clics e indicaciones que generó. Lo que no incluye es escribir artículos ni comprar enlaces, y nadie te puede prometer honestamente una posición específica en Google.",
            },
            {
                question: "¿Puedo agregar cosas después?",
                answer: "Sí. Las funciones nuevas se cotizan aparte, así tú decides si vale la pena en vez de encontrártela en una factura.",
            },
            {
                question: "¿Qué necesitas de mí para empezar?",
                answer: "Qué hace tu negocio, el branding que ya tengas, y el texto e imágenes que quieres en el sitio. Si no los tienes, producirlos es parte de lo que cubren los paquetes más altos.",
            },
        ],
    },

    contact: {
        heading: "Contacta a Gustavo Arriaga",
        leadEyebrow: "// Trabajemos juntos",
        formEyebrow: "// Empieza un proyecto",
        findEyebrow: "// Encuéntrame en",
        reachEyebrow: "// Contáctame",
        // two lines, scrambled separately, and a literal ghost copy holds the box width
        headlineFirst: "VAMOS A",
        headlineSecond: "CREAR.",
        backToTop: "Volver arriba",
        copied: (value) => "Copiado " + value,
        copyFailed: (value) => "No se pudo copiar. Es " + value,
    },

    contactForm: {
        nameLabel: "Nombre",
        emailLabel: "Correo",
        phoneLabel: "Teléfono",
        phoneOptional: "opcional",
        typeLabel: "Tipo de proyecto",
        messageLabel: "Mensaje",
        // id is what gets emailed, so the inbox stays english whatever the visitor reads
        projectTypes: [
            { id: "Software Products", label: "Productos de software" },
            { id: "Design & SEO", label: "Diseño y SEO" },
            { id: "3D Modeling & Printing", label: "Modelado e impresión 3D" },
            { id: "Something else", label: "Otra cosa" },
        ],
        submit: "Enviar",
        sending: "Enviando...",
        promise: "Respondo en menos de 24 horas.",
        successTitle: "Mensaje enviado.",
        successLine: (firstName) => "Gracias " + firstName + ". Respondo en menos de 24 horas.",
        failSend: "No se pudo enviar. Puedes escribirme a gus@arriagagustavoo.com.",
        failNetwork: "No se envió. Revisa tu conexión, o escríbeme a gus@arriagagustavoo.com.",
        errors: {
            nameEmpty: "Dime cómo llamarte.",
            emailEmpty: "Necesito un correo para responderte.",
            emailInvalid: "Eso no parece una dirección de correo.",
            messageEmpty: "Cuéntame un poco del proyecto.",
            messageShort: "Con unas palabras más puedo darte una respuesta real.",
        },
    },

    footer: {
        emailMe: "Escríbeme",
        rights: "TODOS LOS DERECHOS RESERVADOS",
        privacy: "Política de Privacidad",
    },

    stickyContact: {
        label: "Ir al formulario de contacto",
    },

    privacy: {
        title: "Política de Privacidad",
        updated: "Última actualización: 14 de agosto de 2026",
        intro: "Este sitio es un portafolio personal de Gustavo Arriaga en Houston, Texas. Recopila lo menos posible, y nada en absoluto a menos que tú decidas enviarlo.",
        formHeading: "Qué recopila el formulario de contacto",
        formIntro: "Si envías el formulario de contacto, se manda lo que hayas escrito en estos campos:",
        formFields: [
            "Tu nombre",
            "Tu dirección de correo",
            "Tu teléfono, solo si decides ponerlo",
            "El tipo de proyecto que seleccionaste",
            "Tu mensaje",
        ],
        formUse: "Eso llega a mi correo para poder responderte. Lo uso para contestarte y para hablar del trabajo que me pediste. No lo vendo, no lo rento ni lo agrego a ninguna lista de correos, y no hay boletín al que te puedan suscribir.",
        processorsHeading: "Quién más lo maneja",
        processors: "El formulario lo entrega Web3Forms, que procesa el envío y me lo reenvía por correo. El sitio está alojado en Vercel, y el dominio pasa por Cloudflare. Cada uno maneja los datos en tránsito bajo sus propios términos de privacidad.",
        analyticsHeading: "Analítica y cookies",
        analytics: "Este sitio usa Vercel Analytics y Vercel Speed Insights para contar visitas y medir el rendimiento de carga. Los dos funcionan sin cookies y no arman un perfil tuyo ni te siguen a otros sitios. No hay Google Analytics, ni píxel de publicidad, ni cookie de rastreo, y por eso nunca se te pidió aceptar una.",
        storage: "Lo único que se guarda en tu navegador es tu preferencia de tema claro u oscuro, en el almacenamiento local para que el sitio la recuerde en tu próxima visita. Nunca sale de tu dispositivo. Si borras los datos de tu navegador, se elimina.",
        retentionHeading: "Cuánto tiempo se guarda",
        retention: "Los envíos del formulario se quedan en mi correo hasta que ya no sirven. Si quieres que borre el tuyo, pídemelo y lo elimino.",
        questionsHeading: "Preguntas",
        questions: "Escribe a gus@arriagagustavoo.com y te respondo.",
        // only the translated policy carries a governing-language note
        governing: "Esta es una traducción de cortesía. En caso de discrepancia, la versión en inglés es la que rige.",
        back: "Volver al sitio",
    },

    notFound: {
        title: "Esta página no existe.",
        body: "El enlace está mal o algo que estaba aquí se movió. Nada en el sitio apunta a esta dirección, así que lo más probable es que se haya escrito mal.",
        back: "Volver al sitio",
    },

}
