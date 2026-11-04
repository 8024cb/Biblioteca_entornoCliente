// Hito 1 · Datos · Biblioteca de aula

// Libros: id, título, autor, género, año, fianza
const L_ID = 0, L_TITULO = 1, L_AUTOR = 2,
      L_GENERO = 3, L_ANIO = 4, L_FIANZA = 5;
const libros = [
  [1,  "Platero y yo",             "Juan Ramón Jiménez",      "poesía", 1914, "2,50"],
  [2,  "La colmena",               "Camilo José Cela",        "novela", 1951, "3"],
  [3,  "Niebla",                   "Miguel de Unamuno",       "novela", 1914, "2,50"],
  [4,  "Lazarillo de Tormes",      "",                        "novela", 1554, "1,75"],
  [5,  "Romancero gitano",         "Federico García Lorca",   "poesía", 1928, "2"],
  [6,  "Bodas de sangre",          "Federico García Lorca",   "teatro", 1933, "2,50"],
  [7,  "Don Juan Tenorio",         "José Zorrilla",           "teatro", 1844, "2"],
  [8,  "Campos de Castilla",       "Antonio Machado",         "poesía", 1912, "2,50"],
  [9,  "Luces de bohemia",         "Ramón del Valle-Inclán",  "teatro", 1920, "2,50"],
  [10, "La Regenta",               "Leopoldo Alas «Clarín»",  "novela", 1885, "3,50"],
  [11, "El árbol de la ciencia",   "Pío Baroja",              "novela", 1911, "3"],
  [12, "Rimas y leyendas",         "Gustavo Adolfo Bécquer",  "poesía", 1871, "2"],
  [13, "Fuenteovejuna",            "Lope de Vega",            "teatro", 1619, "2"],
  [14, "Tiempo de silencio",       "Luis Martín-Santos",      "novela", 1962, "3"],
  [15, "Poeta en Nueva York",      "Federico García Lorca",   "poesía", 1940, "3"],
  [16, "La casa de Bernarda Alba", "Federico García Lorca",   "teatro", 1945, "2,50"],
];

// Socios: id, nombre, curso
const S_ID = 0, S_NOMBRE = 1, S_CURSO = 2;
const socios = [
  [1, "Ana Martín",   "2.º DAW"],
  [2, "Íñigo López",  "1.º DAW"],
  [3, "Lucía Peña",   ""],
  [4, "Raúl Núñez",   "1.º DAW"],
  [5, "Begoña Ruiz",  "2.º DAW"],
  [6, "Óscar Muñoz",  "1.º DAW"],
];

// Préstamos: id, id del socio, id del libro, día, devuelto
const P_ID = 0, P_SOCIO = 1, P_LIBRO = 2, P_DIA = 3, P_DEVUELTO = 4;
const prestamos = [
  [1,  1, 2,  3,  true],
  [2,  1, 5,  8,  false],
  [3,  2, 1,  9,  false],
  [4,  1, 3,  12, false],
  [5,  3, 11, 14, true],
  [6,  2, 6,  15, true],
  [7,  4, 10, 18, false],
  [8,  5, 8,  20, true],
  [9,  3, 7,  22, false],
  [10, 4, 2,  25, true],
  [11, 5, 13, 30, false],
  [12, 2, 14, 33, true],
];
