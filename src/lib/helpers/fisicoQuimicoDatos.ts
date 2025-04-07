import { FisicoQuimicoCrude, FisicoQuimicoTabla } from "../../schemas/fisicoQuimicoSchema";
import { excelDateToJSDate, filterYear, getYear } from "./datos";

function contarCorrosivos (data: FisicoQuimicoTabla[], year: string) {
  const dataFilter = filterYear(data, "FECHA MUESTRA", year)
  const corrosivos = dataFilter.filter((item) => item["ASUFRE CORROSIVO"] !== "").length;
  return corrosivos;
}

function generarDatosCorrosivos (data: FisicoQuimicoTabla[], idTransformador: string) {
  if (idTransformador !== "") {
    data = data.filter((item) => item["ID TRAFO"] === idTransformador);
  }
  const years = getYear(data, "FECHA MUESTRA");
  const corrosivos = years.map((year) => {
    const corrosivo = contarCorrosivos(data, year);
    return { label: year, value: corrosivo };
  });
  return corrosivos.sort((a, b) => Number(a.label) - Number(b.label));
}

function muestrasEjecutadas (data: FisicoQuimicoTabla[]) {
  const years = getYear(data, "FECHA MUESTRA").sort((a, b) => Number(a) - Number(b));

  return years.map((year) => {
    const dataFilter = filterYear(data, "FECHA MUESTRA", year)
    const mineral = dataFilter.filter((item) => item["TIPO DE ACEITE"] === "MINERAL").length;
    const vegetal = dataFilter.filter((item) => item["TIPO DE ACEITE"] === "VEGETAL").length;
    const sinEspecificar = dataFilter.filter((item) => item["TIPO DE ACEITE"] !== "MINERAL" && item["TIPO DE ACEITE"] !== "VEGETAL").length;
    return { label: year, value1: mineral, value2: vegetal, value3: sinEspecificar };
  })
}

// data = [
//   { label: "2015", value1: 30, value2: 50, value3: 20 },
//   { label: "2020", value1: 80, value2: 40, value3: 20 },
//   { label: "2022", value1: 45, value2: 60, value3: 20 },
//   { label: "2024", value1: 60, value2: 70, value3: 20 },
//   { label: "2025", value1: 60, value2: 70, value3: 20 },
// ],

/**
 * Convierte un array de objetos FisicoQuimicoCrude a un array de objetos FisicoQuimicoTabla
 * @param {Array<FisicoQuimicoCrude>} data - Array de objetos FisicoQuimicoCrude
 * @returns {Array<FisicoQuimicoTabla>} - Array de objetos FisicoQuimicoTabla
 */


function dataFilterFisicoQuimico (data: Array<FisicoQuimicoCrude>) {
  const dataFilter: FisicoQuimicoTabla[] = []
  for (const key in data) {
    const element = data[key];

    const dataReport = {
      "idHistorial": 0,
      "AÑO": element["AÑO"]?.toString() || "",
      "CONT. HUM": element["CONT. HUM."]?.toString() || "",
      "DESIDAD RELATIVA": element["DESIDAD RELATIVA"]?.toString() || "",
      "FACTOR POT": element["FACTOR POT."]?.toString() || "",
      "FECHA MUESTRA": excelDateToJSDate(Number(element[Object.keys(element).find(k => k.includes('FECHA')) || '']))?.toString() || "",
      "FRECUENCIA DE LA MUESTRA": element["FRECUENCIA DE LA MUESTRA"]?.toString() || "",
      "ID TRAFO": element["ID TRAFO"]?.toString() || "",
      "IND. COLOR": element[Object.keys(element).find(k => k.includes('COLOR')) || '']?.toString() || "",
      "INDICE CALIDAD": element[Object.keys(element).find(k => k.includes('CALIDA')) || '']?.toString() || "",
      "ITEM": element["ITEM"]?.toString() || "",
      "MARCA": element["MARCA"]?.toString() || "",
      "NUM. ÁCIDO": element[Object.keys(element).find(k => k.includes('ÁCIDO')) || '']?.toString() || "",
      "NUMERIO DE SERIE": element["NUMERIO DE SERIE"]?.toString() || "",
      "POT MVA": element[Object.keys(element).find(k => k.includes('POT')) || '']?.toString() || "",
      "REPORTE": element["REPORTE"]?.toString() || "",
      "RIGIDEZ DIELECT": element["RIGIDEZ DIELECT"]?.toString() || "",
      "SUBESTACIÓN": element["SUBESTACIÓN"]?.toString() || "",
      "TENSION INTERFACIAL": element["TENSION INTERFACIAL"]?.toString() || "",
      "TENSIÓN KV": element[Object.keys(element).find(k => k.includes('KV')) || '']?.toString() || "",
      "TIPO DE ACEITE": element["TIPO DE ACEITE"]?.toString() || "",
      "OBSERVACIÓN DEL LABORATORIO": element["OBSERVACIÓN DEL LABORATORIO"]?.toString() || "",
      "ASUFRE CORROSIVO": element["ASUFRE CORROSIVO"]?.toString() || "",
    };
    dataFilter.push(dataReport)
  }
  
  return dataFilter
}

export { 
  dataFilterFisicoQuimico,
  generarDatosCorrosivos,
  muestrasEjecutadas
}