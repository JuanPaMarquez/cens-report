import * as XLSX from 'xlsx'
import { TransformadorTabla } from "../../schemas/transformadoresSchema"


function excelDateToJSDate (serial: number): string {
  const excelStartDate = new Date(1900, 0, 1); // 1 de enero de 1900
  const date = new Date(excelStartDate.getTime() + (serial - 1) * 24 * 60 * 60 * 1000);

  // Formatear la fecha como DD/MM/YYYY
  return date.toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

function getDataLocalStorage(table: string) {
  if (window.localStorage.getItem(table)) {
    return JSON.parse(window.localStorage.getItem(table) || '[]');
  }
  return [];
}

function getDataTimeLocalStorage(table: string) {
  if (window.localStorage.getItem(table)) {
    return window.localStorage.getItem(table) || '';
  }
  return '';
}

function filterYear<T>(data: T[], campoFecha: keyof T, year: string) {
  const datafilter = data.filter((item) => {
    const itemYear = typeof item[campoFecha] === 'string' ? item[campoFecha].split("/")[2] : ''; // Extraer el año del campo "FECHA MUESTRA"
    return itemYear === year; // Comparar con el año proporcionado
  });
  return datafilter;
}

function getYear<T>(data: T[], campoFecha: keyof T) {
  const years = data.map((item) => {
    const dateValue = item[campoFecha];
    return typeof dateValue === 'string' ? dateValue.split("/")[2] : '';
  });
  const uniqueYears = Array.from(new Set(years));
  return uniqueYears;
}

function maxContData<T, K extends keyof T>(
  data: T[], 
  idTransformador: string, 
  campoId: K, 
  campoFecha: K, 
  columna: K
) {
  if (idTransformador !== "") {
    data = data.filter((item) => item[campoId] === idTransformador);
  }
  const years = getYear<T>(data, campoFecha);
  const maxValues = years.map((year) => {
    const filteredData = filterYear<T>(data, campoFecha, year);
    const maxValue = Math.max(
      ...filteredData.map((item) => {
        let value = item[columna]?.toString() || "0";
        value = value.replace(",", "."); // Reemplazar comas por puntos
        return parseFloat(value) || 0; // Asegurar que se retorne 0 si el valor no es válido
      })
    );
    return maxValue > 0 ? { label: year, value: maxValue } : null;
  }).filter((item) => item !== null); // Filtrar los valores nulos;
  return maxValues.sort((a, b) => Number(a.label) - Number(b.label));
}

function listarTransformadoresID<T>(data: T[], campoId: keyof T) {
  const transformadoresID = data
    .filter(item => typeof item[campoId] === 'string' && item[campoId].trim() !== "")
    .map((item) => item[campoId]);
  const uniqueTransformadoresID = Array.from(new Set(transformadoresID));
  const ordenadoTransformadoresID = uniqueTransformadoresID.sort((a, b) => {
    return Number((a as string).split("-")[1]) - Number((b as string).split("-")[1]);
  })
  return ordenadoTransformadoresID;
}

function listarTransformadoresIDNumber<T>(data: T[], campoId: keyof T) {
  const transformadoresID = data
    .filter(item => typeof item[campoId] === 'string' && item[campoId].trim() !== "")
    .map((item) => item[campoId]);
  const uniqueTransformadoresID = Array.from(new Set(transformadoresID));
  const ordenadoTransformadoresID = uniqueTransformadoresID.sort((a, b) => {
    return Number((a as string)) - Number((b as string));
  })
  return ordenadoTransformadoresID;
}

function contarTipos<K extends keyof TransformadorTabla>(data: TransformadorTabla[], campo: K) {
  const elementos: TransformadorTabla[K][] = []

  for (const item in data) {
    const element = data[item];
    if (!elementos.includes(element[campo])) {
      elementos.push(element[campo])
    }
  }
  return elementos
}

function contarElementos<K extends keyof TransformadorTabla>(data: TransformadorTabla[], campo: K) {
  const tipos = contarTipos(data, campo)
  const totalElementos: { label: string , value: number }[] = []

  for (const key in tipos) {
    const element = tipos[key];
    const cantidad = data.filter((item) => item[campo] === element).length
    totalElementos.push({ label: element.toString(), value: cantidad })
  }
  return totalElementos.sort((a, b) => b.value - a.value)
}

function estadosTipos (
  tableData: TransformadorTabla[], 
  campoTipos: keyof TransformadorTabla,
  campoEstados: keyof TransformadorTabla
) {
  const tipos = contarElementos(tableData, campoTipos)
  const estados = contarElementos(tableData, campoEstados)
  return { tipos, estados }
}

// sumaColumnaPorTipo(tableData, "Estado", "Potencia Máxima", "OPERACIÓN", "Tipo de Aceite", "MINERAL"))
function sumaColumnaPorTipo<K extends keyof TransformadorTabla>(
  data: TransformadorTabla[], // Datos a filtrar
  campo: K, // Campo especifico a filtrar
  columna: keyof TransformadorTabla, // Columna de datos a sumar
  tipo: string, // Indicador de filtro del campo
  // estos campos es para agregar un filtro adicional
  campo2?: keyof TransformadorTabla, // Campo especifico a filtrar 2
  tipo2?: string, // Indicador de filtro del campo 2
) {

  let dataFiltrada = data.filter((item) => item[campo] === tipo)

  if (tipo2 && campo2) {
    dataFiltrada = dataFiltrada.filter((item) => item[campo2] === tipo2)
  }

  const suma = dataFiltrada.reduce((acc, item) => {
    return acc + parseFloat(item[columna].toString())
  }, 0)

  return suma
}

function tomaDatos<C, T> (
  workbook: XLSX.WorkBook, 
  hoja: string, 
  celdaInicio: string,
  table: string,
  time: string,
  dataFilter: (data: C[]) => T[],
  setTable: (data: T[]) => void,
  setTime: (dataTime: string) => void,
) {
  const worksheet = workbook.Sheets[hoja];
  
  if (worksheet['!ref']) {
    const recorted = worksheet['!ref'].split(':')
    worksheet['!ref'] = `${celdaInicio}:` + recorted[1];     
  }

  const json: C[] = XLSX.utils.sheet_to_json(worksheet);
  const dataFiltered = dataFilter(json)
  setTable(dataFiltered)
  window.localStorage.setItem(table, JSON.stringify(dataFiltered));
  const dataTime = new Date().toISOString()
  setTime(dataTime)
  window.localStorage.setItem(time, dataTime)
}

export { 
  contarElementos, 
  sumaColumnaPorTipo, 
  estadosTipos, 
  getDataLocalStorage, 
  getDataTimeLocalStorage, 
  excelDateToJSDate,
  tomaDatos,
  filterYear,
  maxContData,
  getYear,
  listarTransformadoresID,
  listarTransformadoresIDNumber
}