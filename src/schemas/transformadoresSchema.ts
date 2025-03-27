interface TransformadorTabla {
  'idHistorial': number;
  'TR': string;
  'Número de Subestación': string;
  'Estado': string;
  'Subestacion': string;
  'ID': string;
  'No. De Serie': string;
  'FABRICANTE': string;
  'Año de Fabricacion': string;
  'Edad Trafo': string;
  'Tipo de Aceite': string;
  'ID JDE': string;
  'ID Máximo': string;
  'Potencia MVA': string;
  'Potencia Máxima': string;
  'Potencia (MVA) ONAN': string;
  'Potencia (MVA) ONAF1': string;
  'Potencia (MVA) ONAF2': string;
  'Potencia Terciario (MVA)': string;
  'Nivel de Tension (kV)': string;
  'Grupo de Conexión': string;
  'OLTC': string;
  'Marca': string;
  'No. de Posiciones': string;
  'Posición Nominal': string;
  'No. Serie OLTC': string;
  'Bujes Capacitivos': string;
  'No. serie A': string;
  'No. serie B': string;
  'No. serie C': string;
  'Monitoreo en Línea': string;
  'Tipo': string;
  'Cantidad de Gases': string;
  'Desecador Silica Gel': string;
  'Temperatura ambiente Max. °C': string;	
  'Temperatura ambiente Promedio. °C': string;
  'Temperatura Superior del Aceite °C': string;
  'Temperatura Media de los Devanados °C': string;
  'Temperatura Punto mas Caliente °C': string;
  'OBSERVACIONES': string;
}

interface TransformadorCrude {
  [key: string]: string; // Permite indexar con cualquier string
}

export type { TransformadorTabla, TransformadorCrude }