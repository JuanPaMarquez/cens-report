import { GasesCrude, GasesTabla } from "../../schemas/gasesSchema";
import { excelDateToJSDate, maxContData } from "./datos";

function datosFechas (data: GasesTabla[], idTransformadorGases: string, columna: keyof GasesTabla) {
  let dataFilter = data

  if (idTransformadorGases !== "") {
    dataFilter = data.filter(item => item["ID TR"] === idTransformadorGases);
  }

  if (idTransformadorGases === "") {
    return maxContData(data, idTransformadorGases, "ID TR", "FECHA MUEST", columna)
  }
  const result = dataFilter.map((item) => {
    const fecha = item["FECHA MUEST"];
    const hidrogeno = Number(item[columna]);

    return {
      label: fecha,
      value: hidrogeno,
    };
  })

  return result
}

function listarTransformadoresIDGases(data: GasesTabla[]) {
  const transformadoresID = data
    .filter(item => item["ID TR"].trim() !== "")
    .map((item) => item["ID TR"]);
  const uniqueTransformadoresID = Array.from(new Set(transformadoresID));
  const ordenadoTransformadoresID = uniqueTransformadoresID.sort((a, b) => {
    return Number(a.split("-")[1]) - Number(b.split("-")[1]);
  })
  return ordenadoTransformadoresID;
}

function dataFilterGases (data: Array<GasesCrude>) {
  const dataFilter: GasesTabla[] = []
  for (const key in data) {
    const element = data[key];

    const dataReport: GasesTabla = {
      "idHistorial": 0,
      "(O2/N2)": element["(O2/N2)"]?.toString() || "",
      "Acetileno (C2H2)": element[Object.keys(element).find(k => k.includes('Acetileno')) || '']?.toString() || "",
      "AÑO": element["AÑO"]?.toString() || "",
      "Dioxido de Carbono (CO2)": element[Object.keys(element).find(k => k.includes('Dioxido')) || '']?.toString() || "",
      "Etano (C2H6)": element[Object.keys(element).find(k => k.includes('Etano')) || '']?.toString() || "",
      "Etileno (C2H4)": element[Object.keys(element).find(k => k.includes('Etileno')) || '']?.toString() || "",
      "FECHA MUEST": excelDateToJSDate(Number(element[Object.keys(element).find(k => k.includes('FECHA')) || '']))?.toString() || "",
      "FRECUENCIA DE LA MUESTRA": element["FRECUENCIA DE LA MUESTRA"]?.toString() || "",
      "Hidrogeno (H2)": element[Object.keys(element).find(k => k.includes('Hidrogeno')) || '']?.toString() || "",
      "ID TR": element["ID TR"]?.toString() || "",
      "ITEM": element["ITEM"]?.toString() || "",
      "MARCA": element["MARCA"]?.toString() || "",
      "Metano (CH4)": element[Object.keys(element).find(k => k.includes('Metano')) || '']?.toString() || "",
      "Monoxido de Carbono (CO)": element[Object.keys(element).find(k => k.includes('Monoxido')) || '']?.toString() || "",
      "NITROGENO": element["NITROGENO"]?.toString() || "",
      "NUMERIO DE SERIE": element["NUMERIO DE SERIE"]?.toString() || "",
      "OBSERVACIÓN DEL LABORATORIO": element["OBSERVACIÓN DEL LABORATORIO"]?.toString() || "",
      "OXIGENO": element["OXIGENO"]?.toString() || "",
      "POT MVA": element[Object.keys(element).find(k => k.includes('POT')) || '']?.toString() || "",
      "REPORTE": element["REPORTE"]?.toString() || "",
      "SUBESTACIÓN": element["SUBESTACIÓN"]?.toString() || "",
      "TENSIÓN KV": element[Object.keys(element).find(k => k.includes('KV')) || '']?.toString() || "",
      "TIPO DE ACEITE": element["TIPO DE ACEITE"]?.toString() || "",
      "TOTAL (TDCG)": element[Object.keys(element).find(k => k.includes('TOTAL')) || '']?.toString() || "",
      "VELOCIDAD DE GENERACIÓN": element["VELOCIDAD DE GENERACIÓN"]?.toString() || "",
    };
    dataFilter.push(dataReport)
  }
  
  return dataFilter
}

export { dataFilterGases, listarTransformadoresIDGases, datosFechas }
