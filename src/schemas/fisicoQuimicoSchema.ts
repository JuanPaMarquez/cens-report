interface FisicoQuimicoTabla {
  'idHistorial': number;
  'AÑO': string; 
  'CONT. HUM': string;
  'DESIDAD RELATIVA': string;
  'FACTOR POT': string;
  'FECHA MUESTRA': string;
  'FRECUENCIA DE LA MUESTRA': string;
  'ID TRAFO': string;
  'IND. COLOR': string;
  'INDICE CALIDAD': string;
  'ITEM': string;
  'MARCA': string;
  'NUM. ÁCIDO': string;
  'NUMERIO DE SERIE': string;
  'POT MVA' : string;
  'REPORTE': string;
  'RIGIDEZ DIELECT': string;
  'SUBESTACIÓN': string;
  'TENSION INTERFACIAL': string;
  'TENSIÓN KV': string;
  'TIPO DE ACEITE': string;
  'OBSERVACIÓN DEL LABORATORIO': string;
  'ASUFRE CORROSIVO': string;
}

type FisicoQuimicoCrude = {
  [key: string]: string; // Permite indexar con cualquier string
};


export type { FisicoQuimicoCrude, FisicoQuimicoTabla }