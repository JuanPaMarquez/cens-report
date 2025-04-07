import { TransformadorTabla } from '../schemas/transformadoresSchema';
import { FisicoQuimicoTabla } from './fisicoQuimicoSchema';
import { GasesTabla } from './gasesSchema';

interface UseTransformadoresState {
  // variable que guarda el tiempo de la tabla transformadores
  transformadoresTime: string;
  setTransformadoresTime: (transformadoresTime: string) => void;
  // variable que guarda la tabla transformadores
  tableTransformadores: TransformadorTabla[] | [];
  setTableTransformadores: (tableTransformadores: TransformadorTabla[] | []) => void;
  idTransformador: string;
  setIdTransformador: (idTransformador: string) => void;
}

interface UseFisicoQuimicoState {
  // variable que guarda el tiempo de la tabla fisicoquimico
  fisicoQuimicoTime: string;
  setFisicoQuimicoTime: (fisicoQuimicoTime: string) => void;
  // variable que guarda la tabla fisicoquimico
  tableFisicoQuimico: FisicoQuimicoTabla[] | [];
  setTableFisicoQuimico: (tableFisicoQuimico: FisicoQuimicoTabla[] | []) => void;
  // variable que guarda el id del transformador
  idTransformador: string;
  setIdTransformador: (idTransformador: string) => void;
}

interface UseGasesState {
  // variable que guarda el tiempo de la tabla fisicoquimico
  gasesTime: string;
  setGasesTime: (gasesTime: string) => void;
  // variable que guarda la tabla fisicoquimico
  tableGases: GasesTabla[] | [];
  setTableGases: (tableGases: GasesTabla[] | []) => void;
  // variable que guarda el id del transformador
  idTransformadorGases: string;
  setIdTransformadorGases: (idTransformadorGases: string) => void;
}

export type { 
  UseTransformadoresState,
  UseFisicoQuimicoState,
  UseGasesState
};