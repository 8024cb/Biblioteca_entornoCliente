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