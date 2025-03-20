import { create } from 'zustand';
import { TransformadorTabla } from '../schemas/transformadoresSchema';


interface CurrentTableState {
  tableData: TransformadorTabla[] | null;
  setTable: (tableData: TransformadorTabla[] | null) => void;
}

const useTableStore = create<CurrentTableState>((set) => ({
  tableData: null,
  setTable: (tableData) => set({ tableData }),
}));

export default useTableStore;