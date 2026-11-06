// Hito 4 · Regla personal y altas/bajas
//
// Mi regla personal (cópiala de tu ficha):
//   Límite por usuario. Un socio no puede tener más de 3 préstamos sin devolver.
//   Al intentar el cuarto, prestar(idSocio, idLibro) lanza el error
//   «Límite de préstamos alcanzado».
//
// (Se programa en el Hito 4.)

const MAX_PRESTAMOS = 3;

/**
 * Cuenta los préstamos que un socio todavía no ha devuelto.
 * @param {Array[]} listaPrestamos Lista de préstamos
 * @param {number} idSocio Id del socio
 * @returns {number} Préstamos sin devolver de ese socio
 */
function prestamosSinDevolver(listaPrestamos, idSocio) {
  return listaPrestamos.filter((p) => p[P_SOCIO] === idSocio && !p[P_DEVUELTO]).length;
}

/**
 * Alta de un préstamo. Comprueba todo antes de crear la fila, así un intento
 * fallido no gasta un id. No modifica la lista que recibe.
 * @param {Array[]} listaPrestamos Lista actual de préstamos
 * @param {number} idSocio Id del socio
 * @param {number} idLibro Id del libro
 * @param {number} dia Día del préstamo (entero de 1 a 60)
 * @param {function(): number} generarId Generador de ids
 * @returns {Array[]} Lista nueva con el préstamo añadido
 */
function prestar(listaPrestamos, idSocio, idLibro, dia, generarId) {
  if (buscarSocio(idSocio) === undefined) throw new Error("Socio no encontrado");
  if (buscarLibro(idLibro) === undefined) throw new Error("Libro no encontrado");
  if (!Number.isInteger(dia) || dia < 1 || dia > 60) throw new Error("Día no válido");
  if (listaPrestamos.some((p) => p[P_LIBRO] === idLibro && !p[P_DEVUELTO])) {
    throw new Error("Libro no disponible");
  }
  if (prestamosSinDevolver(listaPrestamos, idSocio) >= MAX_PRESTAMOS) {
    throw new Error("Límite de préstamos alcanzado");
  }
  return [...listaPrestamos, [generarId(), idSocio, idLibro, dia, false]];
}

/**
 * Baja de un préstamo. No modifica la lista que recibe.
 * @param {Array[]} listaPrestamos Lista actual de préstamos
 * @param {number} idPrestamo Id del préstamo a borrar
 * @returns {Array[]} Lista nueva sin ese préstamo
 */
function borrarPrestamo(listaPrestamos, idPrestamo) {
  if (!listaPrestamos.some((p) => p[P_ID] === idPrestamo)) {
    throw new Error("Préstamo no encontrado");
  }
  return listaPrestamos.filter((p) => p[P_ID] !== idPrestamo);
}