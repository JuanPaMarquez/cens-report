export interface GraficasInterface {
  id: string // Identificador de la grafica
  title: string // Título de la gráfica
  Component: React.ElementType // Componente de la gráfica a renderizar
  data?:
      Array<{ label: string, value: number }> // Datos de la gráfica
    | Array<{ label: string, value1: number, value2: number }>  // Datos de la gráfica para doble barra
    | Array<{ tipo: string; estados: { estado: string; suma: number; }[]; }> // Datos para generar la tabla
    | Array<{ category: string; values: { label: string; value: number; }[]; }>
    | Array<{ label: string | number; value: number; category: string | number; }>
    | null
  styles?: string // Estilos adicionales
}