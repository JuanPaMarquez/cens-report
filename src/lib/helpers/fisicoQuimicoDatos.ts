import { fisicoQuimicoCrude, fisicoQuimicoTabla } from "../../schemas/fisicoQuimicoSchema";

function dataFilterFisicoQuimico (data: Array<fisicoQuimicoCrude>) {
  const dataFilter: fisicoQuimicoTabla[] = []
  for (const key in data) {
    const element = data[key];

    const normalizeKey = (key: string) => key.replace(/[\n\r"]/g, '').trim();

    for (const key of Object.keys(element)) {
      console.log(`Clave procesada: "${normalizeKey(key)}"`);
    }

    const dataReport = {
      "idHistorial": 0,
      "AÑO": element["AÑO"]?.toString() || "",
      "CONT. HUM": element["CONT. HUM."]?.toString() || "",
      "DESIDAD RELATIVA": element["DESIDAD RELATIVA"]?.toString() || "",
      "FACTOR POT": element["FACTOR POT."]?.toString() || "",
      "FECHA MUESTRA": element[Object.keys(element).find(k => k.includes('FECHA')) || '']?.toString() || "",
      "FRECUENCIA DE LA MUESTRA": element["FRECUENCIA DE LA MUESTRA"]?.toString() || "",
      "ID TRAFO": element["ID TRAFO"]?.toString() || "",
      "IND. COLOR": element["IND. \nCOLOR."]?.toString() || "",
      "INDICE CALIDAD": element["INDICE \nCALIDAD"]?.toString() || "",
      "ITEM": element["ITEM"]?.toString() || "",
      "MARCA": element["MARCA"]?.toString() || "",
      "NUM. ÁCIDO": element["NUM. \nÁCIDO"]?.toString() || "",
      "NUMERIO DE SERIE": element["NUMERIO DE SERIE"]?.toString() || "",
      "POT MVA": element["POT \nMVA"]?.toString() || "",
      "REPORTE": element["REPORTE"]?.toString() || "",
      "RIGIDEZ DIELECT": element["RIGIDEZ DIELECT"]?.toString() || "",
      "SUBESTACIÓN": element["SUBESTACIÓN"]?.toString() || "",
      "TENSION INTERFACIAL": element["TENSION INTERFACIAL"]?.toString() || "",
      "TENSIÓN KV": element["TENSIÓN \nKV"]?.toString() || "",
      "TIPO DE ACEITE": element["TIPO DE ACEITE"]?.toString() || "",
      "OBSERVACIÓN DEL LABORATORIO": element["OBSERVACIÓN DEL LABORATORIO"]?.toString() || "",
      "ASUFRE CORROSIVO": element["ASUFRE CORROSIVO"]?.toString() || "",
    };
    dataFilter.push(dataReport)
  }
  
  return dataFilter
}

export { dataFilterFisicoQuimico }