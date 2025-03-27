import { TransformadorTabla } from "../../schemas/transformadoresSchema"

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
  return totalElementos
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

export { contarElementos, sumaColumnaPorTipo, estadosTipos, getDataLocalStorage, getDataTimeLocalStorage }