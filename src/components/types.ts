export type TEntry = {
  id: string,
  date: string,
  distance: string,
}

export interface IFormProps {
  addEntry: (date: string, distance: string) => void,
  updateEntry: (id: string, date: string, distance: string) => void,
  editingEntry: TEntry | undefined,
}

export interface ITableProps {
  entries: TEntry[],
  deleteEntry: (id: string) => void,
  editEntry: (id: string) => void,
}
