import { create } from 'zustand';
import { TransformadorTabla } from '../../schemas/transformadoresSchema';


interface CurrentTableState {
  tableData: TransformadorTabla[] | [];
  setTable: (tableData: TransformadorTabla[] | []) => void;
}

const useTableStore = create<CurrentTableState>((set) => ({
  tableData: [],
  setTable: (tableData) => set({ tableData }),
}));

export default useTableStore;