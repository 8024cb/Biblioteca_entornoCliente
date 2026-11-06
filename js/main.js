// Menú del programa. Se ejecuta al abrir index.html.
// Hito 1: muestra aquí tus tres listas con console.table.
// Hito 4: aquí irá el menú (todavía no).

const TEXTO_MENU =
  "1. Ver libros\n2. Ver socios\n3. Ver préstamos\n4. Libros de un género\n5. Libros ordenados por año\n6. Total de fianzas pendientes\n7. Autores\n8. Prestar un libro\n9. Borrar un préstamo\n0. Salir";

/**
 * Pide un número entero con prompt.
 * @param {string} mensaje Texto que se muestra
 * @returns {number|null} El número o null si se cancela
 * @throws {Error} Si lo escrito está vacío o no es un número entero
 */
function pedirEntero(mensaje) {
  const respuesta = prompt(mensaje);
  let resultado = null;
  if (respuesta !== null) {
    const texto = respuesta.trim();
    const numero = Number(texto);
    if (texto === "" || !Number.isInteger(numero)) {
      throw new Error("Debes escribir un número entero");
    }
    resultado = numero;
  }
  return resultado;
}

/**
 * Pide un texto con prompt.
 * @param {string} mensaje Texto que se enseña
 * @returns {string|null} El texto sin espacios sobrantes o null si se cancela
 * @throws {Error} Si lo escrito está vacío
 */
function pedirTexto(mensaje) {
  const respuesta = prompt(mensaje);
  let resultado = null;
  if (respuesta !== null) {
    resultado = respuesta.trim();
    if (resultado === "") {
      throw new Error("No puedes dejarlo vacío");
    }
  }
  return resultado;
}

/**
 * Pregunta un género y muestra sus libros en una tabla.
 */
function verGenero() {
  const genero = pedirTexto("Género (poesía, novela o teatro):");
  if (genero !== null) {
    const encontrados = librosDeGenero(genero.toLowerCase());
    if (encontrados.length === 0) {
      alert(`No hay libros del género «${genero}»`);
    } else {
      console.table(encontrados);
    }
  }
}

/**
 * Pide los datos de un préstamo: socio, libro y día.
 * @returns {number[]|null} [idSocio, idLibro, dia] o null si se cancela
 */
function pedirDatosPrestamo() {
  let datos = null;
  const idSocio = pedirEntero("Id del socio:");
  if (idSocio !== null) {
    const idLibro = pedirEntero("Id del libro:");
    if (idLibro !== null) {
      const dia = pedirEntero("Día del préstamo (1 a 60):");
      if (dia !== null) {
        datos = [idSocio, idLibro, dia];
      }
    }
  }
  return datos;
}

/**
 * Opción de prestar un libro.
 * @param {Array[]} lista Lista actual de préstamos
 * @param {function(): number} generarId Generador de ids
 * @returns {Array[]} Lista nueva si se presta y la misma si se cancela
 */
function altaPrestamo(lista, generarId) {
  let resultado = lista;
  const datos = pedirDatosPrestamo();
  if (datos !== null) {
    resultado = prestar(lista, datos[0], datos[1], datos[2], generarId);
    alert(`Préstamo ${resultado[resultado.length - 1][P_ID]} creado`);
  }
  return resultado;
}

/**
 * Opción de borrar un préstamo. Pide confirmar antes de borrarlo.
 * @param {Array[]} lista Lista actual de préstamos
 * @returns {Array[]} Lista nueva si se borra y la misma si no se confirma o se cancela
 */
function bajaPrestamo(lista) {
  let resultado = lista;
  const id = pedirEntero("Id del préstamo a borrar:");
  if (id !== null) {
    const sinPrestamo = borrarPrestamo(lista, id);
    if (confirm(`¿Seguro que quieres borrar el préstamo ${id}?`)) {
      resultado = sinPrestamo;
      alert(`Préstamo ${id} borrado`);
    } else {
      alert("No se ha borrado nada");
    }
  }
  return resultado;
}

/**
 * Realiza  la opción elegida en el menú.
 * @param {string} opcion Opción escrita sin espacios
 * @param {Array[]} lista Lista actual de préstamos
 * @param {function(): number} generarId Generador de ids
 * @returns {Array[]} Lista de préstamos después de la opción
 */
function ejecutarOpcion(opcion, lista, generarId) {
  let resultado = lista;
  switch (opcion) {
    case "1":
      console.table(libros);
      break;
    case "2":
      console.table(socios);
      break;
    case "3":
      console.table(lista);
      break;
    case "4":
      verGenero();
      break;
    case "5":
      console.table(librosOrdenados());
      break;
    case "6":
      alert(`Fianzas pendientes: ${totalFianzasPrestados(lista)} €`);
      break;
    case "7":
      console.table(autoresSinRepetir());
      break;
    case "8":
      resultado = altaPrestamo(lista, generarId);
      break;
    case "9":
      resultado = bajaPrestamo(lista);
      break;
    default:
      alert("Opción no válida");
  }
  return resultado;
}

/**
 * Menú principal. La lista de préstamos actual es una variable de la función,
 * los datos de datos.js no cambian nunca.
 */
function menu() {
  let prestamosActuales = [...prestamos];
  const siguienteId = crearGeneradorId(prestamos.length);
  let seguir = true;
  while (seguir) {
    const opcion = prompt(TEXTO_MENU);
    if (opcion === null || opcion.trim() === "0") {
      seguir = false;
    } else {
      try {
        prestamosActuales = ejecutarOpcion(opcion.trim(), prestamosActuales, siguienteId);
      } catch (error) {
        alert(`Error: ${error.message}`);
      }
    }
  }
  alert("Hasta pronto");
}

menu();