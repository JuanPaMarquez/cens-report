import { TransformadorTabla, TransformadorCrude } from "../../schemas/transformadoresSchema"

function getDataLocalStorage() {
  if (window.localStorage.getItem('tableData')) {
    return JSON.parse(window.localStorage.getItem('tableData') || '[]');
  }
  return [];
}

function dataFilter (data: Array<TransformadorCrude>) {
  const transformadores: TransformadorTabla[] = []
  for (const key in data) {
    const element = data[key];
    // console.log("Claves del elemento:", Object.keys(element)); // Ver todas las claves del objeto
    const transformador: TransformadorTabla = {
      "idHistorial": 0,
      "TR": element["TR"]?.toString() || "",
      "Número de Subestación": element["Número de Subestación"]?.toString() || "",
      "Estado": element["Estado"]?.toString() || "",
      "Subestacion": element["Subestación"]?.toString() || "",
      "ID": element["ID"]?.toString() || "",
      "No. De Serie": element["No.  De Serie"]?.toString() || "",
      "FABRICANTE": element["FABRICANTE"]?.toString() || "",
      "Año de Fabricacion": element["Año de Fabricacion"]?.toString() || "",
      "Edad Trafo": element["Edad Trafo"]?.toString() || "",
      "Tipo de Aceite": element["Tipo de Aceite"]?.toString() || "",
      "ID JDE": element["ID JDE"]?.toString() || "",
      "ID Máximo": element["ID Máximo"]?.toString() || "",
      "Potencia MVA": element["Potencia MVA"]?.toString() || "",
      "Potencia Máxima": element["Potencia Máxima"]?.toString() || "",
      "Potencia (MVA) ONAN": element["Potencia (MVA) ONAN "]?.toString() || "",
      "Potencia (MVA) ONAF1": element["Potencia (MVA) ONAF1"]?.toString() || "",
      "Potencia (MVA) ONAF2": element["Potencia (MVA) ONAF2"]?.toString() || "",
      "Potencia Terciario (MVA)": element["Potencia Terciario (MVA)"]?.toString() || "",
      "Nivel de Tension (kV)": element["Nivel de Tension (kV)"]?.toString() || "",
      "Grupo de Conexión": element["Grupo de Conexión"]?.toString() || "",
      "OLTC": element["OLTC"]?.toString() || "",
      "Marca": element["Marca"]?.toString() || "",
      "No. de Posiciones": element["No. de Posiciones"]?.toString() || "",
      "Posición Nominal": element["Posición Nominal"]?.toString() || "",
      "No. Serie OLTC": element["No. Serie OLTC"]?.toString() || "",
      "Bujes Capacitivos": element["Bujes Capacitivos"]?.toString() || "",
      "No. serie A": element["No. serie A"]?.toString() || "",
      "No. serie B": element["No. serie B"]?.toString() || "",
      "No. serie C": element["No. serie C"]?.toString() || "",
      "Monitoreo en Línea": element["Monitoreo en Línea"]?.toString() || "",
      "Tipo": element["Tipo"]?.toString() || "",
      "Cantidad de Gases": element["Cantidad de Gases"]?.toString() || "",
      "Desecador Silica Gel": element["Desecador  Silica Gel"]?.toString() || "",
      "Temperatura ambiente Max. °C": element["Temperatura ambiente \r\nMax. °C"]?.toString() || "",
      "Temperatura ambiente Promedio. °C": element["Temperatura ambiente \r\nPromedio. °C"]?.toString() || "",
      "Temperatura Superior del Aceite °C": element["Temperatura Superior del Aceite °C"]?.toString() || "",
      "Temperatura Media de los Devanados °C": element["Temperatura Media de los Devanados °C"]?.toString() || "",
      "Temperatura Punto mas Caliente °C": element["Temperatura Punto mas Caliente °C"]?.toString() || "",
      "OBSERVACIONES": element["OBSERVACIONES "]?.toString() || "",
    };
    transformadores.push(transformador)
  }
  
  return transformadores
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

export { dataFilter, contarElementos, sumaColumnaPorTipo, estadosTipos, getDataLocalStorage }