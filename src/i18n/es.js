export default {

    app: {
        skipLink: "Saltar al contenido",
    },

    header: {
        // id is the section anchor and never translates
        nav: [
            { id: "about", label: "Sobre mí" },
            { id: "projects", label: "Proyectos" },
            { id: "skills", label: "Habilidades" },
            { id: "services", label: "Servicios" },
            { id: "process", label: "Proceso" },
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
        interestsEyebrow: "// Algunos de mis intereses",
        photoAlt: "Gustavo Arriaga",
        // split so each line can stagger in on its own
        bioLines: [
            "Estudiante de último año de Ciencias de la Computación que diseña, construye y entrega productos completos a sus clientes.",
            "Proyecto final en Diseño de Software y ya lo aplico en el mundo real.",
            "Me encargo de todo, desde el primer plan hasta el producto terminado y que aparezca en Google.",
            "Digital o físico, convierto una idea en algo real.",
            "Dime qué necesita tu negocio y te digo cómo lo construiría.",
        ],
        location: "Houston, Texas",
        school: "Universidad de Houston",
        schoolLogoAlt: "Logo de la Universidad de Houston",
        interests: ["Código", "Fitness", "Modelado", "Hardware", "Juegos", "Anime"],
    },

    projects: {
        heading: "Proyectos de desarrollo web y software",
        eyebrow: "// Algo de mi trabajo",
        viewGallery: "Ver galería",
        shots: (count) => count + " capturas",
        galleryButtonLabel: (count, title) => "Ver " + count + " capturas de " + title,
        githubLabel: (title) => "Repositorio de GitHub de " + title,
        // keyed by the project id in Projects.jsx, titles stay English as product names
        items: {
            queuesmart: {
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
