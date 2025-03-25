import { TransformadorTabla } from "../../schemas/transformadoresSchema"
import { estadosTipos, sumaColumnaPorTipo } from "./datos"


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

  console.log(tipos)

  const arrayEstadosTipos = tipos.map((tipo) => {
    return { tipo: tipo.label, estados: estados.map((estado) => {
      return { estado: estado.label, suma: sumaColumnaPorTipo(tableData, "Estado", "Potencia Máxima", estado.label, "Tipo de Aceite", tipo.label) }

    }) }
  })

  // todo: arreglar 
  arrayEstadosTipos.push({ tipo: "TotalEstados", estados: estados.map((estado) => {
    return { estado: estado.label, suma: sumaColumnaPorTipo(tableData, "Estado", "Potencia Máxima", estado.label) }
  }
  ) })

  console.log(arrayEstadosTipos)

  return arrayEstadosTipos
}



export { potenciaMaxima, tableDataEstadosTipos }