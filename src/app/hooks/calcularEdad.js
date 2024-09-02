import { differenceInYears, parseISO } from "date-fns";

/**
 * Calcula la edad a partir de una fecha en formato ISO.
 * @param {string} isoDate - La fecha en formato ISO 8601.
 * @returns {number} - La edad calculada.
 * @throws {Error} - Si la fecha proporcionada no es válida.
 */
function calcularEdad(isoDate) {
  // Validar que el parámetro sea una cadena
  if (typeof isoDate !== "string") {
    throw new Error("El parámetro debe ser una cadena en formato ISO.");
  }

  // Parsear la fecha
  const fechaNacimiento = parseISO(isoDate);

  // Verificar que la fecha sea válida
  if (isNaN(fechaNacimiento.getTime())) {
    throw new Error("Fecha proporcionada no es válida.");
  }

  // Obtener la fecha actual
  const ahora = new Date();

  // Calcular la diferencia en años
  return differenceInYears(ahora, fechaNacimiento);
}

export default calcularEdad;
