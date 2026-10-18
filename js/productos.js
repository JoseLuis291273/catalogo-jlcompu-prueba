/*
  CATÁLOGO DEMO: zapatillas y relojes.
  Nombres, precios e imágenes son ilustrativos; reemplázalos con datos autorizados del cliente.
  Para cambiar una imagen, guarda el archivo en img/ y actualiza la propiedad imagen.
*/
let productos = [];

async function cargarProductos() {
    const respuesta = await fetch("js/data/productos.json");

    if (!respuesta.ok) {
        throw new Error("No se pudo cargar el archivo de productos.");
    }

    productos = await respuesta.json();

    // Adaptar los campos que Pages CMS guarda actualmente.
    productos = productos.map(producto => ({
        id: producto.id ?? producto.identificación,
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: producto.precio,
        imagen: producto.imagen,
        categoria: producto.categoria ?? producto.categoría
    }));
}

const configuracionCatalogo = {
  nombreNegocio: "Tienda Demo",
  // Sustituir por el número real del cliente: código de país + celular, solo dígitos.
  whatsapp: "519XXXXXXXX",
  moneda: "S/",
  correo: "contacto@ejemplo.com"
};
