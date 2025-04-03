import { create } from 'zustand';
import { getDataLocalStorage, getDataTimeLocalStorage } from '../helpers/datos';
import { UseFisicoQuimicoState, UseGasesState, UseTransformadoresState,  } from '../../schemas/storeSchemas';

const useTransformadores = create<UseTransformadoresState>((set) => ({
  transformadoresTime: getDataTimeLocalStorage("transformadoresTime"),
  setTransformadoresTime: (transformadoresTime) => set({ transformadoresTime }),
  tableTransformadores: getDataLocalStorage("tableTransformadores"),
  setTableTransformadores: (tableTransformadores) => set({ tableTransformadores }),
}));

const useFisicoQuimico = create<UseFisicoQuimicoState>((set) => ({
  fisicoQuimicoTime: getDataTimeLocalStorage("fisicoQuimicoTime"),
  setFisicoQuimicoTime: (fisicoQuimicoTime) => set({ fisicoQuimicoTime }),
  tableFisicoQuimico: getDataLocalStorage("tableFisicoQuimico"),
  setTableFisicoQuimico: (tableFisicoQuimico) => set({ tableFisicoQuimico }),
  idTransformador: "",
  setIdTransformador: (idTransformador) => set({ idTransformador })
}));

const useGases = create<UseGasesState>((set) => ({
  gasesTime: getDataTimeLocalStorage("gasesTime"),
  setGasesTime: (gasesTime) => set({ gasesTime }),
  tableGases: getDataLocalStorage("tableGases"),
  setTableGases: (tableGases) => set({ tableGases }),
  idTransformadorGases: "",
  setIdTransformadorGases: (idTransformadorGases) => set({ idTransformadorGases })
}));


export { useTransformadores, useFisicoQuimico, useGases };