// Base de la API
const API = "https://www.swapi.tech/api";

/**
 * Helper genérico de fetch → json con manejo de error.
 * Lanza Error si la red o la respuesta no es OK.
 */
async function getJson(url) {
  const res = await fetch(url);
  if (!res.ok) {
    // Puedes loguear el status/res aquí si quieres
    throw new Error(`Network error ${res.status} for ${url}`);
  }
  return res.json();
}

/**
 * Lista genérica por tipo.
 * @param {"people"|"vehicles"|"planets"} type
 * @returns Array<{ uid: string, name: string, type: string }>
 */
export async function fetchList(type) {
  const data = await getJson(`${API}/${type}`);
  // swapi.tech lista: data.results = [{ name, uid, url }]
  return (data?.results ?? []).map((x) => ({
    uid: x.uid,
    name: x.name,
    type,
  }));
}

/**
 * Atajos por tipo (opcional: por comodidad/legibilidad en los componentes)
 */
export async function fetchPeople() {
  return fetchList("people");
}
export async function fetchVehicles() {
  return fetchList("vehicles");
}
export async function fetchPlanets() {
  return fetchList("planets");
}

/**
 * Detalle genérico por tipo + uid.
 * swapi.tech devuelve: { result: { properties, description, uid, ... } }
 */
export async function fetchDetail(type, uid) {
  const data = await getJson(`${API}/${type}/${uid}`);
  return data?.result; // -> { properties, description, uid, ... }
}

/**
 * URL de imagen en starwars-visualguide (no pertenece a SWAPI).
 * people → characters, vehicles → vehicles, planets → planets
 */
export function imageFor(type, uid) {
  const folder = type === "people" ? "characters" : type;
  return `https://starwars-visualguide.com/assets/img/${folder}/${uid}.jpg`;
}

/**
 * (Opcional) Helper para forzar un pequeño delay — útil para ver loaders en demo.
 * await delay(400);
 */
export const delay = (ms) => new Promise((r) => setTimeout(r, ms));