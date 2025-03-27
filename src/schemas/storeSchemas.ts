import { TransformadorTabla } from '../schemas/transformadoresSchema';
import { FisicoQuimicoTabla } from './fisicoQuimicoSchema';

interface UseTransformadoresState {
  transformadoresTime: string;
  setTransformadoresTime: (transformadoresTime: string) => void;
  tableTransformadores: TransformadorTabla[] | [];
  setTableTransformadores: (tableTransformadores: TransformadorTabla[] | []) => void;
}

interface UseFisicoQuimicoState {
  fisicoQuimicoTime: string;
  setFisicoQuimicoTime: (fisicoQuimicoTime: string) => void;
  tableFisicoQuimico: FisicoQuimicoTabla[] | [];
  setTableFisicoQuimico: (tableFisicoQuimico: FisicoQuimicoTabla[] | []) => void;
}

export type { 
  UseTransformadoresState,
  UseFisicoQuimicoState
};