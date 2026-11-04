// Hito 2 · Consultas

 // Convierte un importe escrito como texto ("2,50") en número (2.5).
 /** @param {string} texto Importe con coma o punto decimal*/
 /** @returns {number} El importe como número*/
 /** @throws {Error} "Importe no válido" si está vacío o no es un número*/
 /** @example aNumero("2,50")*/
function aNumero(texto) {
  const limpio = String(texto).trim().replace(",", ".");
  const numero = Number(limpio);
  if (limpio === "" || Number.isNaN(numero)) {
    throw new Error("Importe no válido");
  }
  return numero;
}

/**
 * Busca un libro por su id.
 * @param {number} id Id del libro
 * @returns {Array|undefined} La fila del libro, o undefined si no existe
 * @example buscarPorId(3)[L_TITULO] // "Niebla"
 */
function buscarPorId(id) {
  return libros.find((libro) => libro[L_ID] === id);
}

 // Filtra los libros de un género.
 /** @param {string} genero Género buscado*/
 /** @returns {Array[]} Libros de ese género*/
function librosDeGenero(genero) {
  return libros.filter((libro) => libro[L_GENERO] === genero);
}

 // Ordena los libros por año y, si empatan, por título.
 // Copia la lista con slice antes de ordenar para no modificar el original.
 /** @returns {Array[]} Libros ordenados*/
function librosOrdenados() {
  return libros
    .slice()
    .sort((a, b) => a[L_ANIO] - b[L_ANIO] || a[L_TITULO].localeCompare(b[L_TITULO], "es"));
}

 // Comprueba si hay algún libro publicado antes de un año.
 /** @param {number} anio Año de corte*/
 /** @returns {boolean} true si existe al menos uno anterior*/
function hayLibroAnteriorA(anio) {
  return libros.some((libro) => libro[L_ANIO] < anio);
}


 // Suma las fianzas de los libros que están prestados ahora.
 /** @returns {number} Total redondeado a 2 decimales*/
function totalFianzasPrestados() {
  const sinDevolver = prestamos.filter((p) => !p[P_DEVUELTO]);
  const total = sinDevolver.reduce(
    (suma, p) => suma + aNumero(buscarPorId(p[P_LIBRO])[L_FIANZA]),
    0
  );
  return Math.round(total * 100) / 100;
}


 // Lista de autores sin repetir, sin vacíos y ordenada.
 /** @returns {string[]} Autores en orden alfabético*/
function autoresSinRepetir() {
  const autores = [];
  for (const libro of libros) {
    const autor = libro[L_AUTOR];
    if (autor !== "" && !autores.includes(autor)) {
      autores.push(autor);
    }
  }
  return autores.sort((a, b) => a.localeCompare(b, "es")); //Compara dos textos según las reglas de un idioma
}

// Crea un índice id -> fila para buscar sin recorrer la lista.
/** @param {Array[]} lista Lista de filas*/
/** @param {number} posId Posición del id en cada fila*/
/** @returns {Map<number, Array>} Índice id -> fila*/
function crearIndice(lista, posId) {
  return new Map(lista.map((fila) => [fila[posId], fila]));
}

const indiceLibros = crearIndice(libros, L_ID);
const indiceSocios = crearIndice(socios, S_ID);

 // Busca un libro por su id usando el índice.
 /** @param {number} id Id del libro*/
 /** @param {Map} [indice=indiceLibros] Índice id -> libro*/
 /** @returns {Array|undefined} La fila del libro, o undefined por si no existe*/
function buscarLibro(id, indice = indiceLibros) {
  return indice.get(id);
}

 // Busca un socio por su id usando el índice.
 /** @param {number} id Id del socio*/
 /** @param {Map} [indice=indiceSocios] Índice id -> socio*/
 /** @returns {Array|undefined} La fila del socio*/
function buscarSocio(id, indice = indiceSocios) {
  return indice.get(id);
}

 // Agrupa los títulos de los libros por género.
 /** @param {Array[]} [lista=libros] Lista de libros a agrupar*/
 /** @returns {Map<string, string[]>} Map género -> lista de títulos*/
function librosPorGenero(lista = libros) {
  const grupos = new Map();
  for (const libro of lista) {
    const genero = libro[L_GENERO];
    if (!grupos.has(genero)) {
      grupos.set(genero, []);
    }
    grupos.get(genero).push(libro[L_TITULO]);
  }
  return grupos;
}

 // Géneros distintos que hay en una lista de libros.
 /** @param {Array[]} [lista=libros] Lista de libros*/
 /** @returns {Set<string>} Conjunto de géneros sin repetir*/
function generos(lista = libros) {
  return new Set(lista.map((libro) => libro[L_GENERO]));
}

 // Crea un generador de ids: recuerda el último y da el siguiente.
 /** @param {number} ultimo Último id ya usado*/
 /** @returns {function(): number} Función que devuelve un id nuevo cada vez*/
function crearGeneradorId(ultimo) {
  let actual = ultimo;
  return () => {
    actual++;
    return actual;
  };
}

 // Función de orden superior: filtra una lista con la condición que reciba.
 /** @param {Array[]} lista Lista de filas*/
 /** @param {function(Array): boolean} condicion Función que decide si una fila se queda*/
 /** @returns {Array[]} Filas que cumplen la condición (lista nueva)*/
function filtrarPor(lista, condicion) {
  return lista.filter(condicion);
}