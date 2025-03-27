import * as XLSX from 'xlsx'
import { useState } from "react"
import { dataFilter } from '../../lib/helpers/transformadoresDatos'
import { TransformadorCrude } from '../../schemas/transformadoresSchema'
import { useNavigate } from 'react-router'
import useTransformadores from '../../lib/store/CurrentTable'
import { dataFilterFisicoQuimico } from '../../lib/helpers/fisicoQuimicoDatos'
import { fisicoQuimicoCrude } from '../../schemas/fisicoQuimicoSchema'

export default function Subir() {
  const navegar = useNavigate()
  const [fileName, setFileName] = useState<string>('')
  const { tableData, setTable, setTime } = useTransformadores()
  const [selected, setSelected] = useState("transformadores");

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setFileName(file?.name || '')
    if (file) {
      const reader = new FileReader();
      // Se lee el archivo
      reader.onload = (event) => {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        
        const workbook = XLSX.read(data, { type: 'array' });
  
        // const sheetName = workbook.SheetNames;

        if (selected === "transformadores") {
  
          const worksheet = workbook.Sheets["CARACTERISTICAS GENERALES"];
          
          if (worksheet['!ref']) {
            const recorted = worksheet['!ref'].split(':')
            worksheet['!ref'] = 'A2:' + recorted[1];     
          }
    
          const json: TransformadorCrude[] = XLSX.utils.sheet_to_json(worksheet);
          setTable(dataFilter(json))
          window.localStorage.setItem('tableData', JSON.stringify(dataFilter(json)));
          const dataTime = new Date().toISOString()
          setTime(dataTime)
          window.localStorage.setItem('dataTime', dataTime)

        } else if (selected === "fisico-quimico") {

          const worksheet = workbook.Sheets["ANALISIS FISICO QUIMICO"];
          if (worksheet['!ref']) {
            const recorted = worksheet['!ref'].split(':')
            worksheet['!ref'] = 'A7:' + recorted[1];     
          }
          console.log("data sin filtrar", XLSX.utils.sheet_to_json(worksheet))

          const json: fisicoQuimicoCrude[] = XLSX.utils.sheet_to_json(worksheet);
          console.log(dataFilterFisicoQuimico(json))

        }
      }
      reader.readAsArrayBuffer(file);
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (tableData) {
      navegar('/dashboard/transformadores')
    } else {
      console.log("no hay datos por subir")
    }
  }
  
  return (
    <>
      <h1 className="font-bold text-3xl">Subir EXCEL</h1>
      <select 
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className=" rounded-md border border-gray-300 shadow-sm m-1 p-2"
      >
        <option value="transformadores">Tabla Transformadores</option>
        <option value="fisico-quimico">Tabla Fisico Quimico</option>
        <option value="gases">Tabla de Gases</option>
        <option value="inhibidor-furanos">Tabla Inhibidor/Furanos</option>
      </select>
      <form className="flex flex-wrap justify-center items-center gap-2" onSubmit={handleSubmit}>
        <div className="relative flex items-center">
          <input
            type="file"
            id="file-upload"
            onChange={handleFile}
            accept=".xlsx, .xls"
            className="w-48 absolute inset-0 h-10 opacity-0 cursor-pointer"
          />
          <label
            htmlFor="file-upload"
            className="w-48 border border-gray-400 rounded-xl p-2 bg-gray-100 hover:bg-gray-200 cursor-pointer text-center"
          >
            Seleccionar archivo
          </label>
        </div>
        <button
          type="submit"
          className="border w-48 bg-green-400 border-gray-400 rounded-xl p-2 text-center hover:bg-green-200 cursor-pointer"
        >
          Subir
        </button>
      </form>
      <p>{fileName || 'No hay archivo cargado'}</p>
    </>
  )
}