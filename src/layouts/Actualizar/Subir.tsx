import * as XLSX from 'xlsx'
import { useState } from "react"
import { dataFilter } from '../../lib/helpers/transformadoresDatos'
import { TransformadorCrude } from '../../schemas/transformadoresSchema'
import { useNavigate } from 'react-router'
import { useTransformadores, useFisicoQuimico } from '../../lib/store/CurrentTable'
import { dataFilterFisicoQuimico } from '../../lib/helpers/fisicoQuimicoDatos'
import { FisicoQuimicoCrude } from '../../schemas/fisicoQuimicoSchema'

export default function Subir() {
  const navegar = useNavigate()
  const [fileName, setFileName] = useState<string>('')
  const { tableTransformadores, setTableTransformadores, setTransformadoresTime } = useTransformadores()
  const { tableFisicoQuimico, setTableFisicoQuimico, setFisicoQuimicoTime } = useFisicoQuimico()
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
          const dataFiltered = dataFilter(json)
          setTableTransformadores(dataFiltered)
          window.localStorage.setItem('tableTransformadores', JSON.stringify(dataFiltered));
          const dataTime = new Date().toISOString()
          setTransformadoresTime(dataTime)
          window.localStorage.setItem('transformadoresTime', dataTime)

        } else if (selected === "fisico-quimico") {

          const worksheet = workbook.Sheets["ANALISIS FISICO QUIMICO"];
          if (worksheet['!ref']) {
            const recorted = worksheet['!ref'].split(':')
            worksheet['!ref'] = 'A7:' + recorted[1];     
          }

          const json: FisicoQuimicoCrude[] = XLSX.utils.sheet_to_json(worksheet);
          const dataFiltered = dataFilterFisicoQuimico(json)
          setTableFisicoQuimico(dataFiltered)
          window.localStorage.setItem('tableFisicoQuimico', JSON.stringify(dataFiltered));
          const dataTime = new Date().toISOString()
          setFisicoQuimicoTime(dataTime)
          window.localStorage.setItem('fisicoQuimicoTime', dataTime)

        }
      }
      reader.readAsArrayBuffer(file);
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("select: ", selected)
    if (selected === "transformadores" && tableTransformadores.length > 0) {
      navegar('/dashboard/transformadores');
    } else if (selected === "fisico-quimico" && tableFisicoQuimico.length > 0) {
      navegar('/dashboard/fisico-quimico');
    } else {
      console.log("No hay datos por subir");
    }
  }
  
  return (
    <>
      <h1 className="font-bold text-3xl">Subir EXCEL</h1>
      <select 
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="max-w-100 text-center rounded-md border border-gray-300 shadow-sm m-1 p-2"
      >
        <option value="transformadores">Tabla Transformadores</option>
        <option value="fisico-quimico">Tabla Fisico Quimico (ADFQ)</option>
        <option value="gases">Tabla de Gases (DGA)</option>
        <option value="inhibidor-furanos">Tabla Inhibidor(INH) / Furanos(FUR) </option>
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