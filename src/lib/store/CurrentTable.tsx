import { create } from 'zustand';
import { TransformadorTabla } from '../../schemas/transformadoresSchema';
import { getDataLocalStorage } from '../helpers/datos';

interface CurrentTableState {
  tableData: TransformadorTabla[] | [];
  setTable: (tableData: TransformadorTabla[] | []) => void;
}

const useTableStore = create<CurrentTableState>((set) => ({
  tableData: getDataLocalStorage(),
  setTable: (tableData) => set({ tableData }),
}));

export default useTableStore;