import { useState } from "react"

export default function Subir() {
  const [file, setFile] = useState({ name: '', data: {} })

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setFile({ name: file?.name || '', data: file || {} })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFile({ name: '', data: {} })
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
      <p>{file.name}</p>
    </>
  )
}