import { FisicoQuimicoCrude, FisicoQuimicoTabla } from "../../schemas/fisicoQuimicoSchema";


const excelDateToJSDate = (serial: number): string => {
  const excelStartDate = new Date(1900, 0, 1); // 1 de enero de 1900
  const date = new Date(excelStartDate.getTime() + (serial - 1) * 24 * 60 * 60 * 1000);

  // Formatear la fecha como DD/MM/YYYY
  return date.toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};


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

export { dataFilterFisicoQuimico }