import { TransformadorTabla } from "../../schemas/transformadoresSchema"
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


export { potenciaMaxima, tableDataEstadosTipos, transformadoresSubestacion, transformadoresEstado }