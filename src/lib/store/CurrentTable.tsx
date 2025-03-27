import { create } from 'zustand';
import { TransformadorTabla } from '../../schemas/transformadoresSchema';
import { getDataLocalStorage, getDataTimeLocalStorage } from '../helpers/datos';

interface UseTransformadoresState {
  dataTime: string;
  tableData: TransformadorTabla[] | [];
  setTable: (tableData: TransformadorTabla[] | []) => void;
  setTime: (dataTime: string) => void;
}

const useTransformadores = create<UseTransformadoresState>((set) => ({
  dataTime: getDataTimeLocalStorage(),
  tableData: getDataLocalStorage(),
  setTable: (tableData) => set({ tableData }),
  setTime: (dataTime) => set({ dataTime }),
}));

export default useTransformadores;