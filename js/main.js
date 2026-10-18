
// ============================================================
// 1. ELEMENTOS HTML
// Buscamos los elementos de la página con los que trabajaremos.
// ============================================================

// Contenedor donde se mostrarán todas las tarjetas de productos.
const contenedorProductos = document.getElementById("listaProductos");

// Campo donde el visitante escribe el nombre del producto que busca.
const campoBusqueda = document.getElementById("buscarProducto");

// Mensaje que aparece cuando no hay productos que coincidan.
const mensajeSinResultados = document.getElementById("mensajeSinResultados");

// Lista desplegable para filtrar los productos por categoría.
const filtroCategoria = document.getElementById("filtroCategoria");


// ============================================================
// 2. FORMATEAR EL PRECIO
// Convierte el precio en un texto con la moneda configurada.
// Ejemplo: S/ 149.90
// ============================================================

function formatoPrecio(precio) {
    return `${configuracionCatalogo.moneda} ${Number(precio).toFixed(2)}`;
}


// ============================================================
// 3. CREAR EL ENLACE DE WHATSAPP
// Prepara el mensaje que se enviará al consultar un producto.
// ============================================================

function crearEnlaceWhatsApp(producto) {

    // Número de WhatsApp definido en la configuración del catálogo.
    const telefono = configuracionCatalogo.whatsapp;

    // Mensaje personalizado con el nombre y precio del producto.
    const mensaje =
        `Hola, quisiera consultar por ${producto.nombre}. ` +
        `Precio de referencia: ${formatoPrecio(producto.precio)}. ` +
        `¿Me brindan más información?`;

    // Codificamos el mensaje para incluirlo correctamente en la URL.
    return `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
}


// ============================================================
// 4. CREAR LA TARJETA DE UN PRODUCTO
// Construye la tarjeta con fotografía, categoría, nombre,
// descripción, precio y botón de consulta.
// ============================================================

function crearTarjeta(producto) {

    // --------------------------------------------------------
    // 4.1. COLUMNA DE BOOTSTRAP
    // Adapta el ancho de cada producto al tamaño de pantalla.
    // --------------------------------------------------------

    const columna = document.createElement("div");

    // 12 columnas en celular, 6 en pantallas pequeñas,
    // 4 en pantallas grandes y 3 en pantallas extra grandes.
    columna.className = "col-12 col-sm-6 col-lg-4 col-xl-3";


    // --------------------------------------------------------
    // 4.2. TARJETA PRINCIPAL
    // Contenedor que agrupa toda la información del producto.
    // --------------------------------------------------------

    const tarjeta = document.createElement("article");
    tarjeta.className = "product-card h-100";


    // --------------------------------------------------------
    // 4.3. ÁREA DE LA IMAGEN
    // Aquí se coloca la fotografía correspondiente al producto.
    // La ruta se obtiene de producto.imagen.
    // --------------------------------------------------------

    const imagenWrap = document.createElement("div");
    imagenWrap.className = "product-image-wrap";

    // Creamos la etiqueta HTML de la fotografía.
    const imagen = document.createElement("img");

    // Clase CSS que controla el tamaño y la apariencia de la foto.
    imagen.className = "product-image";

    // Ruta de la fotografía definida en productos.js.
    // Ejemplo: img/zapatillas-urbanas.jpg
    imagen.src = producto.imagen;

    // Texto alternativo para accesibilidad.
    imagen.alt = producto.nombre;

    // Carga la imagen cuando sea necesaria para mejorar el rendimiento.
    imagen.loading = "lazy";


    // --------------------------------------------------------
    // 4.4. IMAGEN DE RESPALDO
    // Si la fotografía no existe o no puede cargarse,
    // mostramos un marcador en lugar de dejar un espacio vacío.
    // --------------------------------------------------------

    imagen.addEventListener("error", () => {

        // Retiramos la imagen que produjo el error.
        imagen.remove();

        // Creamos el marcador de fotografía faltante.
        const marcadorImagen = document.createElement("div");
        marcadorImagen.className = "product-placeholder";

        marcadorImagen.innerHTML =
            '<span class="placeholder-icon">◇</span>' +
            '<span>Foto de producto</span>';

        // Insertamos el marcador en el área de la imagen.
        imagenWrap.appendChild(marcadorImagen);

    }, { once: true });

    // Agregamos la imagen al contenedor de fotografía.
    imagenWrap.appendChild(imagen);


    // --------------------------------------------------------
    // 4.5. CUERPO DE LA TARJETA
    // Contiene los textos, el precio y el botón de WhatsApp.
    // --------------------------------------------------------

    const cuerpo = document.createElement("div");

    // Clases de Bootstrap para organizar el contenido en vertical.
    cuerpo.className = "card-body d-flex flex-column";


    // --------------------------------------------------------
    // 4.6. CATEGORÍA DEL PRODUCTO
    // Ejemplos: Zapatillas, Relojes, Accesorios.
    // --------------------------------------------------------

    const categoria = document.createElement("p");
    categoria.className = "product-category mb-2";
    categoria.textContent = producto.categoria;


    // --------------------------------------------------------
    // 4.7. NOMBRE DEL PRODUCTO
    // --------------------------------------------------------

    const nombre = document.createElement("h3");
    nombre.className = "h6 product-name";
    nombre.textContent = producto.nombre;


    // --------------------------------------------------------
    // 4.8. DESCRIPCIÓN DEL PRODUCTO
    // Información breve que explica sus características.
    // --------------------------------------------------------

    const descripcion = document.createElement("p");
    descripcion.className = "product-description";
    descripcion.textContent = producto.descripcion;


    // --------------------------------------------------------
    // 4.9. PRECIO DEL PRODUCTO
    // El precio se muestra usando la función formatoPrecio().
    // mt-auto ayuda a alinear los precios en la parte inferior.
    // --------------------------------------------------------

    const precio = document.createElement("p");
    precio.className = "product-price mt-auto mb-3";
    precio.textContent = formatoPrecio(producto.precio);


    // --------------------------------------------------------
    // 4.10. BOTÓN DE CONSULTA POR WHATSAPP
    // Abre WhatsApp con un mensaje sobre el producto elegido.
    // --------------------------------------------------------

    const botonWhatsApp = document.createElement("a");

    // Estilos de Bootstrap y CSS personalizado.
    botonWhatsApp.className = "btn btn-whatsapp w-100";

    // Enlace generado para el producto actual.
    botonWhatsApp.href = crearEnlaceWhatsApp(producto);

    // Abre WhatsApp en una pestaña nueva.
    botonWhatsApp.target = "_blank";

    // Medida de seguridad para enlaces que abren otra pestaña.
    botonWhatsApp.rel = "noopener";

    // Texto visible del botón.
    botonWhatsApp.textContent = "Consultar por WhatsApp";

    // Descripción accesible para lectores de pantalla.
    botonWhatsApp.setAttribute(
        "aria-label",
        `Consultar ${producto.nombre} por WhatsApp`
    );


    // --------------------------------------------------------
    // 4.11. UNIR LOS ELEMENTOS DE LA TARJETA
    // Orden de visualización: categoría, nombre, descripción,
    // precio y botón.
    // --------------------------------------------------------

    cuerpo.append(
        categoria,
        nombre,
        descripcion,
        precio,
        botonWhatsApp
    );

    // La tarjeta contiene primero la imagen y luego los textos.
    tarjeta.append(imagenWrap, cuerpo);

    // La tarjeta se coloca dentro de la columna de Bootstrap.
    columna.appendChild(tarjeta);

    // Devolvemos la columna completa para mostrarla en la página.
    return columna;
}


// ============================================================
// 5. MOSTRAR Y FILTRAR PRODUCTOS
// Lee la búsqueda y la categoría seleccionada.
// Después muestra únicamente los productos coincidentes.
// ============================================================

function mostrarProductos() {

    // Obtenemos el texto escrito en el buscador.
    // trim() elimina espacios al principio y al final.
    // toLocaleLowerCase() permite buscar sin distinguir mayúsculas.
    const termino = campoBusqueda.value
        .trim()
        .toLocaleLowerCase("es");

    // Obtenemos la categoría seleccionada en el filtro.
    const categoriaSeleccionada = filtroCategoria.value;


    // --------------------------------------------------------
    // 5.1. FILTRAR LA LISTA DE PRODUCTOS
    // Comprobamos si cada producto coincide con la búsqueda
    // y con la categoría seleccionada.
    // --------------------------------------------------------

    const filtrados = productos.filter(producto => {

        // Buscamos el término en el nombre, la descripción
        // y la categoría del producto.
        const textoProducto =
            `${producto.nombre} ${producto.descripcion} ${producto.categoria}`
                .toLocaleLowerCase("es");

        const coincideTexto = textoProducto.includes(termino);

        // Si se selecciona "Todos", no limitamos por categoría.
        // En caso contrario, exigimos que coincida la categoría.
        const coincideCategoria =
            categoriaSeleccionada === "Todos" ||
            producto.categoria === categoriaSeleccionada;

        // El producto debe cumplir ambas condiciones.
        return coincideTexto && coincideCategoria;
    });


    // --------------------------------------------------------
    // 5.2. LIMPIAR LOS RESULTADOS ANTERIORES
    // Evita que las tarjetas se dupliquen al buscar o filtrar.
    // --------------------------------------------------------

    contenedorProductos.replaceChildren();


    // --------------------------------------------------------
    // 5.3. MOSTRAR LOS PRODUCTOS ENCONTRADOS
    // Creamos una tarjeta por cada producto filtrado.
    // --------------------------------------------------------

    filtrados.forEach(producto => {

        const tarjetaProducto = crearTarjeta(producto);

        contenedorProductos.appendChild(tarjetaProducto);
    });


    // --------------------------------------------------------
    // 5.4. MENSAJE CUANDO NO HAY RESULTADOS
    // Se muestra si la búsqueda no encuentra productos.
    // --------------------------------------------------------

    mensajeSinResultados.classList.toggle(
        "d-none",
        filtrados.length > 0
    );
}


// ============================================================
// 6. EVENTOS DEL BUSCADOR Y DEL FILTRO
// Ejecutan la búsqueda cuando el usuario interactúa.
// ============================================================

// Actualiza los resultados cada vez que se escribe.
campoBusqueda.addEventListener("input", mostrarProductos);

// Actualiza los resultados cuando cambia la categoría.
filtroCategoria.addEventListener("change", mostrarProductos);


// ============================================================
// 7. AÑO AUTOMÁTICO DEL PIE DE PÁGINA
// Coloca el año actual en el elemento HTML correspondiente.
// ============================================================

const anioActual = document.getElementById("anioActual");

if (anioActual) {
    anioActual.textContent = new Date().getFullYear();
}


// ============================================================
// 8. BOTÓN GENERAL DE CONTACTO POR WHATSAPP
// Configura el enlace de contacto general de la página.
// No corresponde a un producto específico.
// ============================================================

const contactoWhatsApp = document.getElementById("contactoWhatsApp");

// Preparamos un mensaje general de consulta.
const mensajeContacto =
    "Hola, quisiera información sobre sus productos.";

// Asignamos el número y el mensaje al enlace de contacto.
contactoWhatsApp.href =
    `https://wa.me/${configuracionCatalogo.whatsapp}` +
    `?text=${encodeURIComponent(mensajeContacto)}`;


const portadaWhatsApp = document.getElementById("portadaWhatsApp");

if (portadaWhatsApp && typeof configuracionCatalogo !== "undefined") {
    portadaWhatsApp.href =
        `https://wa.me/${configuracionCatalogo.whatsapp}`;
    portadaWhatsApp.target = "_blank";
    portadaWhatsApp.rel = "noopener";
}



// ============================================================
// 9. CARGA INICIAL DEL CATÁLOGO
// Muestra los productos al abrir la página.
// ============================================================

mostrarProductos();


/* =========================================
   CONFIGURAR WHATSAPP FLOTANTE
   ========================================= */

const whatsappFlotante = document.getElementById("whatsappFlotante");

if (whatsappFlotante) {
    const numeroWhatsApp = configuracionCatalogo.whatsapp;
    const mensajeWhatsApp = encodeURIComponent(
        "Hola, quisiera información sobre sus productos."
    );

    whatsappFlotante.href =
        `https://wa.me/${numeroWhatsApp}?text=${mensajeWhatsApp}`;
}


/* =========================================
   FORMULARIO DE CONTACTO - DEMO
   Abre WhatsApp y limpia los campos
   ========================================= */

const formularioContacto = document.getElementById("formularioContacto");
const contactoResultado = document.getElementById("contactoResultado");

if (formularioContacto) {
    formularioContacto.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const nombre = document.getElementById("contactoNombre").value.trim();
        const empresa = document.getElementById("contactoEmpresa").value.trim();
        const correo = document.getElementById("contactoCorreo").value.trim();
        const producto = document.getElementById("contactoProducto").value;
        const consulta = document.getElementById("contactoMensaje").value.trim();

        const mensaje = [
            "Hola, quisiera realizar una consulta.",
            "",
            `Nombre: ${nombre}`,
            empresa ? `Empresa: ${empresa}` : "",
            correo ? `Correo: ${correo}` : "",
            `Producto de interés: ${producto}`,
            `Consulta: ${consulta}`,
            "",
            "Enviado desde el catálogo demo."
        ].filter(Boolean).join("\n");

        const numeroWhatsApp = configuracionCatalogo.whatsapp;
        const enlaceWhatsApp =
            `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

        // Abrir WhatsApp con los datos de la consulta
        window.open(enlaceWhatsApp, "_blank", "noopener,noreferrer");

        // Limpiar los campos del formulario
        formularioContacto.reset();

        // Quitar el borde de foco de los campos
        formularioContacto.querySelectorAll(":focus").forEach(function (campo) {
            campo.blur();
        });
       
    });
}


/* Ocultar el mensaje después de unos segundos */

if (contactoResultado) {
    contactoResultado.addEventListener("click", function () {
        contactoResultado.hidden = true;
    });
}

setTimeout(function () {
    contactoResultado.hidden = true;
}, 5000);


/* =========================================
   CERRAR EL MENÚ MÓVIL AL ELEGIR UNA OPCIÓN
   ========================================= */

const menuPrincipal = document.getElementById("menuPrincipal");

if (menuPrincipal) {
    const enlacesMenu = menuPrincipal.querySelectorAll(".nav-link");

    enlacesMenu.forEach(function (enlace) {
        enlace.addEventListener("click", function () {
            // Solo cerrar si el menú está desplegado en móvil.
            if (
                window.innerWidth < 992 &&
                menuPrincipal.classList.contains("show")
            ) {
                const instanciaMenu =
                    bootstrap.Collapse.getOrCreateInstance(menuPrincipal);

                instanciaMenu.hide();
            }
        });
    });
}
