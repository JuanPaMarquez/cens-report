interface GasesTabla {
  "idHistorial": number;
  "(O2/N2)": string;
  "Acetileno (C2H2)": string;
  "AÑO": string;
  "Dioxido de Carbono (CO2)": string;
  "Etano (C2H6)": string;
  "Etileno (C2H4)": string;
  "FECHA MUEST": string;
  "FRECUENCIA DE LA MUESTRA": string;
  "Hidrogeno (H2)": string;
  "ID TR": string;
  "ITEM": string;
  "MARCA": string;
  "Metano (CH4)": string;
  "Monoxido de Carbono (CO)": string;
  "NITROGENO": string;
  "NUMERIO DE SERIE": string;
  "OBSERVACIÓN DEL LABORATORIO": string;
  "OXIGENO": string;
  "POT MVA": string;
  "REPORTE": string;
  "SUBESTACIÓN": string;
  "TENSIÓN KV": string;
  "TIPO DE ACEITE": string;
  "TOTAL (TDCG)": string;
  "VELOCIDAD DE GENERACIÓN": string;
}

type GasesCrude = {
  [key: string]: string; // Permite indexar con cualquier string
};

export type { GasesTabla, GasesCrude };