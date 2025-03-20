import * as XLSX from 'xlsx'
import { useState } from "react"
import { dataFilter } from '../../lib/datos'
import { TransformadorCrude } from '../../schemas/transformadoresSchema'
import useTableStore from '../../service/CurrentTable'
import { useNavigate } from 'react-router'

export default function Subir() {
  const navegar = useNavigate()
  const [fileName, setFileName] = useState<string>('')
  const { tableData, setTable } = useTableStore()

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setFileName(file?.name || '')
    if (file) {
      const reader = new FileReader();
      // Se lee el archivo
      reader.onload = (event) => {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        
        const workbook = XLSX.read(data, { type: 'array' });
  
        const sheetName = workbook.SheetNames[0];
  
        const worksheet = workbook.Sheets[sheetName];
        
        if (worksheet['!ref']) {
          const recorted = worksheet['!ref'].split(':')
          worksheet['!ref'] = 'A2:' + recorted[1];     
        }
  
        const json: TransformadorCrude[] = XLSX.utils.sheet_to_json(worksheet);
        setTable(dataFilter(json))
      }
      reader.readAsArrayBuffer(file);
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (tableData) {
      navegar('/dashboard')
    } else {
      console.log("no hay datos por subir")
    }
  }
  
  return (
    <>
      <h1 className="font-bold text-3xl">Subir EXCEL</h1>
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