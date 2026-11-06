// Pruebas de tu proyecto · Hito 2

prueba("aNumero convierte una coma decimal", () => igual(aNumero("2,50"), 2.5));
prueba("aNumero acepta un entero con espacios", () => igual(aNumero(" 3 "), 3));
prueba("aNumero falla con texto vacío", () => lanzaError(() => aNumero(""), "Importe no válido"));
prueba("aNumero falla con letras", () => lanzaError(() => aNumero("abc"), "Importe no válido"));

prueba("buscarPorId devuelve el libro 3", () => igual(buscarPorId(3)[L_TITULO], "Niebla"));
prueba("buscarPorId devuelve undefined si no existe", () => igual(buscarPorId(99), undefined));

prueba("librosDeGenero devuelve los 5 libros de teatro", () => {
  const teatro = librosDeGenero("teatro");
  igual(teatro.length, 5);
  for (const libro of teatro) {
    igual(libro[L_GENERO], "teatro");
  }
});
prueba("librosDeGenero devuelve vacío si el género no existe", () => igual(librosDeGenero("cómic"), []));

prueba("librosOrdenados ordena por año y desempata por título", () => {
  const orden = librosOrdenados();
  igual(orden[0][L_TITULO], "Lazarillo de Tormes");
  igual(orden[7][L_TITULO], "Niebla");
  igual(orden[8][L_TITULO], "Platero y yo");
});
prueba("librosOrdenados no modifica la lista original", () => {
  librosOrdenados();
  igual(libros[0][L_ID], 1);
  igual(libros[3][L_ID], 4);
});

prueba("hayLibroAnteriorA 1600 es true (Lazarillo, 1554)", () => igual(hayLibroAnteriorA(1600), true));
prueba("hayLibroAnteriorA 1500 es false", () => igual(hayLibroAnteriorA(1500), false));

prueba("totalFianzasPrestados suma las fianzas de los no devueltos", () => casiIgual(totalFianzasPrestados(), 14.5));

prueba("autoresSinRepetir quita vacíos y repetidos", () => {
  const autores = autoresSinRepetir();
  igual(autores.length, 12);
  igual(autores.includes(""), false);
  igual(autores.filter((a) => a === "Federico García Lorca").length, 1);
});
prueba("autoresSinRepetir sale ordenado", () => igual(autoresSinRepetir()[0], "Antonio Machado"));

// Lista pequeña para comprobar
const pocosLibros = [
  [1, "B", "Autor B", "novela", 2000, "2,50"],
  [2, "A", "Autor A", "teatro", 1900, "1"],
  [3, "C", "Autor B", "novela", 1900, "3"],
];

prueba("crearIndice guarda cada fila bajo su id", () => {
  const indice = crearIndice(pocosLibros, L_ID);
  igual(indice.size, 3);
  igual(indice.get(2)[L_TITULO], "A");
});
prueba("buscarLibro devuelve el libro 3", () => igual(buscarLibro(3)[L_TITULO], "Niebla"));
prueba("buscarLibro devuelve undefined si no existe", () => igual(buscarLibro(99), undefined));
prueba("buscarSocio devuelve el socio 2 y undefined si no existe", () => {
  igual(buscarSocio(2)[S_NOMBRE], "Íñigo López");
  igual(buscarSocio(99), undefined);
});

prueba("generos devuelve un Set sin repetir", () => {
  igual(generos(), new Set(["poesía", "novela", "teatro"]));
});
prueba("generos usa la lista que recibe", () => {
  igual(generos(pocosLibros), new Set(["novela", "teatro"]));
});

prueba("librosPorGenero agrupa los títulos en un Map", () => {
  const grupos = librosPorGenero();
  igual(grupos.size, 3);
  igual(grupos.get("teatro").length, 5);
  igual(grupos.get("teatro")[0], "Bodas de sangre");
});
prueba("librosPorGenero usa la lista que recibe", () => {
  igual(librosPorGenero(pocosLibros).get("novela"), ["B", "C"]);
});

prueba("crearGeneradorId da el siguiente id cada vez", () => {
  const siguiente = crearGeneradorId(14);
  igual(siguiente(), 15);
  igual(siguiente(), 16);
});
prueba("dos generadores de id llevan su cuenta por separado", () => {
  const uno = crearGeneradorId(prestamos.length);
  const otro = crearGeneradorId(0);
  igual(uno(), 13);
  igual(uno(), 14);
  igual(otro(), 1);
});

prueba("filtrarPor aplica la función que recibe", () => {
  igual(filtrarPor(libros, (l) => l[L_ANIO] < 1700).length, 2);
});
prueba("las consultas no modifican las listas de datos.js", () => {
  librosOrdenados();
  librosDeGenero("teatro");
  autoresSinRepetir();
  librosPorGenero();
  igual(libros.length, 16);
  igual(libros[0][L_ID], 1);
  igual(prestamos.length, 12);
});

prueba("Regla: un socio con 2 sin devolver puede llevarse el tercero", () => {
  igual(prestamosSinDevolver(prestamos, 1), 2);
  const nueva = prestar(prestamos, 1, 4, 30, () => 13);
  igual(nueva.length, prestamos.length + 1);
  igual(nueva[nueva.length - 1], [13, 1, 4, 30, false]);
});
prueba("Regla: un socio con 3 sin devolver no puede llevarse el cuarto", () => {
  const con3 = prestar(prestamos, 1, 4, 30, () => 13);
  lanzaError(() => prestar(con3, 1, 9, 31, () => 14), "Límite de préstamos alcanzado");
});
prueba("Regla: devolver un libro libera un hueco", () => {
  const con3 = prestar(prestamos, 1, 4, 30, () => 13);
  const devuelto = con3.map((p) => {
    let fila = p;
    if (p[P_ID] === 2) {
      fila = [p[P_ID], p[P_SOCIO], p[P_LIBRO], p[P_DIA], true];
    }
    return fila;
  });
  igual(prestar(devuelto, 1, 9, 31, () => 14).length, con3.length + 1);
});

// ---------- Altas y bajas ----------
prueba("prestar falla si el socio no existe", () => {
  lanzaError(() => prestar(prestamos, 99, 4, 30, () => 13), "Socio no encontrado");
});
prueba("prestar falla si el libro no existe", () => {
  lanzaError(() => prestar(prestamos, 1, 99, 30, () => 13), "Libro no encontrado");
});
prueba("prestar falla con un día no válido", () => {
  lanzaError(() => prestar(prestamos, 1, 4, 61, () => 13), "Día no válido");
  lanzaError(() => prestar(prestamos, 1, 4, 2.5, () => 13), "Día no válido");
});
prueba("prestar falla si el libro ya está prestado", () => {
  lanzaError(() => prestar(prestamos, 6, 5, 30, () => 13), "Libro no disponible");
});
prueba("un intento fallido de prestar no gasta ningún id", () => {
  const siguiente = crearGeneradorId(12);
  lanzaError(() => prestar(prestamos, 99, 4, 30, siguiente), "Socio no encontrado");
  igual(siguiente(), 13);
});
prueba("prestar no modifica la lista que recibe", () => {
  prestar(prestamos, 1, 4, 30, () => 13);
  igual(prestamos.length, 12);
});
prueba("borrarPrestamo devuelve una lista nueva sin esa fila", () => {
  const sin = borrarPrestamo(prestamos, 3);
  igual(sin.length, 11);
  igual(sin.map((p) => p[P_ID]).includes(3), false);
  igual(prestamos.length, 12);
});
prueba("borrarPrestamo falla si el id no existe", () => {
  lanzaError(() => borrarPrestamo(prestamos, 99), "Préstamo no encontrado");
});

prueba("totalFianzasPrestados usa la lista que recibe", () => {
  const unPrestamo = [[1, 1, 1, 5, false], [2, 1, 2, 6, true]];
  casiIgual(totalFianzasPrestados(unPrestamo), 2.5);
});