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
  'Año de Fabricacion': number;
  'Bujes Capacitivos': string;
  'Cantidad de Gases': string;
  'Desecador  Silica Gel': string;
  'Edad Trafo': number;
  'Estado': string;
  'FABRICANTE': string;
  'Grupo de Conexión': string;
  'ID': string;
  'ID JDE': string;
  'ID Máximo': string;
  'Marca': string;
  'Monitoreo en Línea': string;
  '"N.B.A. BIL Primario ↵(%)': number;
  '"N.B.A. BIL Secundario ↵(%)': number;
  'Nivel de Tension (kV)': string;
  'No.  De Serie': number;
  'No. Serie OLTC': string;
  'No. de Posiciones': number;
  'No. serie A': string;
  'No. serie B': string;
  'No. serie C': string;
  'Número de Subestación': string;
  'OBSERVACIONES ': string;
  'OLTC': string;
  'Peso Aceite (Kg)': number;
  'Peso Activa (Kg)': number;
  'Peso Total (Kg)': number;
  'Peso Trans (Kg)': number;
  'Posición Nominal': number;
  'Potencia (MVA) ONAF1': number;
  'Potencia (MVA) ONAF2': string;
  'Potencia (MVA) ONAN ': number;
  'Potencia MVA': string;
  'Potencia Máxima': number;
  'Potencia Terciario (MVA)': string;
  'Subestación': string;
  'TR': number;
  'Temperatura Media de los Devanados °C': number;
  'Temperatura Punto mas Caliente °C': string;
  'Temperatura Superior del Aceite °C': number;
  'Temperatura ambiente \r\nMax. °C': number;
  'Temperatura ambiente \r\nPromedio. °C': string;
  'Tension Primario (kV)': number;
  'Tension Secundario (kV)': number;
  'Tension Terciario (kV)': string;
  'Tipo': string;
  'Tipo de Aceite': string;
}

export type { TransformadorTabla, TransformadorCrude }