import { create } from 'zustand';
import { TransformadorTabla } from '../../schemas/transformadoresSchema';
import { getDataLocalStorage, getDataTimeLocalStorage } from '../helpers/datos';

interface CurrentTableState {
  dataTime: string;
  tableData: TransformadorTabla[] | [];
  setTable: (tableData: TransformadorTabla[] | []) => void;
}

const useTableStore = create<CurrentTableState>((set) => ({
  dataTime: getDataTimeLocalStorage(),
  tableData: getDataLocalStorage(),
  setTable: (tableData) => set({ tableData }),
}));

export default useTableStore;