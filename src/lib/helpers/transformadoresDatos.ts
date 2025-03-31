import { TransformadorCrude, TransformadorTabla } from "../../schemas/transformadoresSchema"
import { contarElementos, estadosTipos, sumaColumnaPorTipo } from "./datos"


function potenciaMaxima (
  tableData: TransformadorTabla[],
  campoTipos: keyof TransformadorTabla,
  campoEstados: keyof TransformadorTabla,
  campoSuma: keyof TransformadorTabla,
) {

  const { tipos, estados } = estadosTipos(tableData, campoTipos, campoEstados) 

  const potenciaEstadosTipo = estados.map((estado) => {
    const potencia = tipos.map((tipo) => {
      const suma = sumaColumnaPorTipo(tableData, campoEstados, campoSuma, estado.label, campoTipos, tipo.label)
      return { label: tipo.label, value: suma }
    })
    return { label: estado.label, value1: potencia[0].value, value2: potencia[1].value }
  })

  return potenciaEstadosTipo
}

function tableDataEstadosTipos (
  tableData: TransformadorTabla[],
  campoTipos: keyof TransformadorTabla,
  campoEstados: keyof TransformadorTabla,
) {
  const { tipos, estados } = estadosTipos(tableData, campoTipos, campoEstados) 

  estados.push({ label: "Total tipos", value: 0 })

  const arrayEstadosTipos = tipos.map((tipo) => {
    return { tipo: tipo.label, estados: estados.map((estado) => {
      return { 
        estado: estado.label, 
        suma: sumaColumnaPorTipo(tableData, "Estado", "Potencia Máxima", estado.label, "Tipo de Aceite", tipo.label) 
      }
    })}
  })

  arrayEstadosTipos.forEach((tipo) => {
    tipo.estados[tipo.estados.length - 1].suma = tipo.estados.reduce((acc, estado) => acc + estado.suma, 0)
  })
  
  arrayEstadosTipos.push({ tipo: "Total estados", estados: estados.map((estado) => {
    return { 
      estado: estado.label, 
      suma: arrayEstadosTipos.reduce((acc, tipo) => {
        const estadoObj = tipo.estados.find(e => e.estado === estado.label);
        return acc + (estadoObj ? estadoObj.suma : 0);
      }, 0)
    }
  })})

  return arrayEstadosTipos
}

function transformadoresSubestacion (data: TransformadorTabla[]) {
  const estados = contarElementos(data, "Estado")
  const subestaciones = contarElementos(data, "Subestacion")

  const subestacionesEstados = subestaciones.map((subestacion) => {
    const estadosSubestacion = estados.map((estado) => {
      return {
        label: estado.label,
        value: data.filter((transformador) => transformador.Estado === estado.label && transformador.Subestacion === subestacion.label).length
      }
    })
    return { category: subestacion.label, values: estadosSubestacion }
  })

  return subestacionesEstados.sort((a, b) => b.values.reduce((acc, val) => acc + val.value, 0) - a.values.reduce((acc, val) => acc + val.value, 0))

}

function transformadoresMonitoreo (data: TransformadorTabla[]) {
  const dataCleaned = data.filter((transformador) => transformador["Monitoreo en Línea"] === "SI")

  const tipoMonitoreo = contarElementos(dataCleaned, "Tipo")
  const subestaciones = contarElementos(dataCleaned, "Subestacion")

  const subestacionesTipo = subestaciones.map((subestacion) => {
    const tipoSubestacion = tipoMonitoreo.map((tipo) => {
      return {
        label: tipo.label,
        value: dataCleaned.filter((transformador) => transformador.Tipo === tipo.label && transformador.Subestacion === subestacion.label).length
      }
    })
    return { category: subestacion.label, values: tipoSubestacion }
  })

  return subestacionesTipo.sort((a, b) => b.values.reduce((acc, val) => acc + val.value, 0) - a.values.reduce((acc, val) => acc + val.value, 0))
}

function transformadoresEstado (data: TransformadorTabla[]){
  const estados = contarElementos(data, "Estado")

  const estadosTipos = estados.map((estado) => {
      return {
        label: estado.label,
        value1: data.filter((transformador) => transformador.Estado === estado.label && transformador["Tipo de Aceite"] === "MINERAL").length,
        value2: data.filter((transformador) => transformador.Estado === estado.label && transformador["Tipo de Aceite"] === "VEGETAL").length
      }
    })

  return estadosTipos
}

function edadesTransformadores (data: TransformadorTabla[]) {
  const data10 = data.filter(e => parseInt(e["Edad Trafo"]) <= 10)
  const data20 = data.filter(e => parseInt(e["Edad Trafo"]) > 10 && parseInt(e["Edad Trafo"]) <= 20)
  const data30 = data.filter(e => parseInt(e["Edad Trafo"]) > 20 && parseInt(e["Edad Trafo"]) <= 30)
  const data40 = data.filter(e => parseInt(e["Edad Trafo"]) > 30)

  return [
    { label: "De 0 a 10 años", value: data10.length },
    { label: "De 10 a 20 años", value: data20.length },
    { label: "De 20 a 30 años", value: data30.length },
    { label: "Mayores de 30", value: data40.length }
  ].sort((a, b) => b.value - a.value)
}

function tranformadoresMayores (
  data: TransformadorTabla[], 
  campoX: keyof TransformadorTabla, 
  campoLeyend: keyof TransformadorTabla
) {
  const data40 = data.filter(e => parseInt(e["Edad Trafo"]) >= 30)
  return data40.map(e => {
    return {
      label: e[campoX],
      value: parseInt(e["Edad Trafo"]),
      category: e[campoLeyend]
    }
  }).sort((a, b) => b.value - a.value)
}

function transformadoresFabricante (data: TransformadorTabla[]) {
  const fabricantes = contarElementos(data, "FABRICANTE")

  const fabricantesEstados = fabricantes.map((fabricante) => {
    const dataFiltered = data.filter((transformador) => transformador.FABRICANTE === fabricante.label).length
    return { label: fabricante.label, value: dataFiltered }
  })

  return fabricantesEstados.sort((a, b) => b.value - a.value)
}

function transformadoresFabricanteEstado (data: TransformadorTabla[], estado: string, tipo1: string, tipo2: string) {
  const dataCleaned = data.filter((transformador) => transformador.Estado === estado)
  const fabricantes = contarElementos(dataCleaned, "FABRICANTE")

  const fabricantesEstados = fabricantes.map((fabricante) => {
    const dataFiltered = data.filter((transformador) => transformador.FABRICANTE === fabricante.label && transformador.Estado === estado)
    const dataFilteredEstado1 = dataFiltered.filter((transformador) => transformador["Tipo de Aceite"] === tipo1).length
    const dataFilteredEstado2 = dataFiltered.filter((transformador) => transformador["Tipo de Aceite"] === tipo2).length
    return { label: fabricante.label, value1: dataFilteredEstado1, value2: dataFilteredEstado2 }
  })

  return fabricantesEstados.sort((a,b) => a.label.localeCompare(b.label))
}

function dataFilter (data: Array<TransformadorCrude>) {
  const transformadores: TransformadorTabla[] = []
  for (const key in data) {
    const element = data[key];
    const transformador: TransformadorTabla = {
      "idHistorial": 0,
      "TR": element["TR"]?.toString().trim() || "",
      "Número de Subestación": element["Número de Subestación"]?.toString().trim() || "",
      "Estado": element["Estado"]?.toString().trim() || "",
      "Subestacion": element["Subestación"]?.toString().trim() || "",
      "ID": element["ID"]?.toString().trim() || "",
      "No. De Serie": element["No.  De Serie"]?.toString().trim() || "",
      "FABRICANTE": element["FABRICANTE"]?.toString().trim() || "",
      "Año de Fabricacion": element["Año de Fabricacion"]?.toString().trim() || "",
      "Edad Trafo": element["Edad Trafo"]?.toString().trim() || "",
      "Tipo de Aceite": element["Tipo de Aceite"]?.toString().trim() || "",
      "ID JDE": element["ID JDE"]?.toString().trim() || "",
      "ID Máximo": element["ID Máximo"]?.toString().trim() || "",
      "Potencia MVA": element["Potencia MVA"]?.toString().trim() || "",
      "Potencia Máxima": element["Potencia Máxima"]?.toString().trim() || "",
      "Potencia (MVA) ONAN": element["Potencia (MVA) ONAN "]?.toString().trim() || "",
      "Potencia (MVA) ONAF1": element["Potencia (MVA) ONAF1"]?.toString().trim() || "",
      "Potencia (MVA) ONAF2": element["Potencia (MVA) ONAF2"]?.toString().trim() || "",
      "Potencia Terciario (MVA)": element["Potencia Terciario (MVA)"]?.toString().trim() || "",
      "Nivel de Tension (kV)": element["Nivel de Tension (kV)"]?.toString().trim() || "",
      "Grupo de Conexión": element["Grupo de Conexión"]?.toString().trim() || "",
      "OLTC": element["OLTC"]?.toString().trim() || "",
      "Marca": element["Marca"]?.toString().trim() || "",
      "No. de Posiciones": element["No. de Posiciones"]?.toString().trim() || "",
      "Posición Nominal": element["Posición Nominal"]?.toString().trim() || "",
      "No. Serie OLTC": element["No. Serie OLTC"]?.toString().trim() || "",
      "Bujes Capacitivos": element["Bujes Capacitivos"]?.toString().trim() || "",
      "No. serie A": element["No. serie A"]?.toString().trim() || "",
      "No. serie B": element["No. serie B"]?.toString().trim() || "",
      "No. serie C": element["No. serie C"]?.toString().trim() || "",
      "Monitoreo en Línea": element["Monitoreo en Línea"]?.toString().trim() || "",
      "Tipo": element["Tipo"]?.toString().trim() || "",
      "Cantidad de Gases": element["Cantidad de Gases"]?.toString().trim() || "",
      "Desecador Silica Gel": element["Desecador  Silica Gel"]?.toString().trim() || "",
      "Temperatura ambiente Max. °C": element["Temperatura ambiente \r\nMax. °C"]?.toString().trim() || "",
      "Temperatura ambiente Promedio. °C": element["Temperatura ambiente \r\nPromedio. °C"]?.toString().trim() || "",
      "Temperatura Superior del Aceite °C": element["Temperatura Superior del Aceite °C"]?.toString().trim() || "",
      "Temperatura Media de los Devanados °C": element["Temperatura Media de los Devanados °C"]?.toString().trim() || "",
      "Temperatura Punto mas Caliente °C": element["Temperatura Punto mas Caliente °C"]?.toString().trim() || "",
      "OBSERVACIONES": element["OBSERVACIONES "]?.toString().trim() || "",
    };
    transformadores.push(transformador)
  }
  
  return transformadores
}

export { 
  dataFilter,
  potenciaMaxima, 
  tableDataEstadosTipos, 
  transformadoresSubestacion, 
  transformadoresEstado,
  edadesTransformadores,
  tranformadoresMayores,
  transformadoresFabricante,
  transformadoresFabricanteEstado,
  transformadoresMonitoreo
}