// mini-pruebas.js — lo da el profesor. No hace falta modificarlo.
const resultados = [];

function prueba(nombre, fn) {
  try {
    fn();
    resultados.push({ nombre, ok: true, error: "" });
  } catch (e) {
    resultados.push({ nombre, ok: false, error: e.message });
  }
}

function normalizar(v) {
  if (v instanceof Map) return ["Map", [...v].map(([k, x]) => [k, normalizar(x)])];
  if (v instanceof Set) return ["Set", [...v].map(normalizar)];
  if (Array.isArray(v)) return v.map(normalizar);
  if (v && typeof v === "object") return Object.keys(v).sort().map((k) => [k, normalizar(v[k])]);
  return v;
}

function igual(obtenido, esperado) {
  const a = JSON.stringify(normalizar(obtenido));
  const b = JSON.stringify(normalizar(esperado));
  if (a !== b) throw new Error(`se esperaba ${b} y se obtuvo ${a}`);
}

function casiIgual(obtenido, esperado, decimales = 2) {
  if (!(Math.abs(obtenido - esperado) < 10 ** -decimales / 2)) {
    throw new Error(`se esperaba unos ${esperado} y se obtuvo ${obtenido}`);
  }
}

function lanzaError(fn, mensaje = "") {
  try {
    fn();
  } catch (e) {
    if (e instanceof ReferenceError) throw new Error(`no existe: ${e.message}`);
    if (!e.message.includes(mensaje)) {
      throw new Error(`se esperaba el error «${mensaje}» y llegó «${e.message}»`);
    }
    return;
  }
  throw new Error("se esperaba un error y no se lanzó");
}

function mostrarResultados() {
  const grupos = new Map();
  for (const r of resultados) {
    const clave = r.nombre.split(" ")[0];
    if (!/^[A-Z][0-9]*$/.test(clave)) continue; // solo códigos como B o C1 (prueba práctica)
    const g = grupos.get(clave) ?? { ok: 0, total: 0 };
    g.total++;
    if (r.ok) g.ok++;
    grupos.set(clave, g);
  }
  const ok = resultados.filter((r) => r.ok).length;
  const escribir = (etiqueta, texto) => {
    const el = document.createElement(etiqueta);
    el.textContent = texto;
    document.body.append(el);
  };
  escribir("h2", `${ok} de ${resultados.length} pruebas superadas`);
  for (const [clave, g] of grupos) escribir("p", `${clave}: ${g.ok}/${g.total}`);
  for (const r of resultados) escribir("p", `${r.ok ? "✔" : "✘"} ${r.nombre}${r.ok ? "" : " — " + r.error}`);
  console.table(resultados);
}
