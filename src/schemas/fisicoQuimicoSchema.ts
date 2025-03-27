interface fisicoQuimicoTabla {
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

type fisicoQuimicoCrude = {
  [key: string]: string; // Permite indexar con cualquier string
};

// interface fisicoQuimicoCrude {
//   'idHistorial': number;
//   'AÑO': string; 
//   'CONT. HUM.': string;
//   'DESIDAD RELATIVA': string;
//   'FACTOR POT.': string;
//   'FECHA \nMUESTRA': string;
//   'FRECUENCIA DE LA MUESTRA': string;
//   'ID TRAFO': string;
//   'IND. \nCOLOR.': string;
//   'INDICE \nCALIDAD': string;
//   'ITEM': string;
//   'MARCA': string;
//   'NUM. \nÁCIDO': string;
//   'NUMERIO DE SERIE': string;
//   'POT \nMVA' : string;
//   'REPORTE': string;
//   'RIGIDEZ DIELECT': string;
//   'SUBESTACIÓN': string;
//   'TENSION INTERFACIAL': string;
//   'TENSIÓN \nKV': string;
//   'TIPO DE ACEITE': string;
//   'OBSERVACIÓN DEL LABORATORIO': string;
//   'ASUFRE CORROSIVO': string;
// }

export type { fisicoQuimicoCrude, fisicoQuimicoTabla }