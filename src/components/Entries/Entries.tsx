import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Form from '../Form/Form';
import Table from '../Table/Table';
import { TEntry } from '../types';
import './Entries.css';

const Entries: React.FC = () => {
  const [entries, setEntries] = useState<TEntry[]>([]);
  const [editingEntry, setEditingEntry] = useState<TEntry | undefined>(undefined);
  
  // функция для сортировки записей по дате
  const sortEntriesByDate = (entries: TEntry[]) => {
    return [...entries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  // функция для добавления новой записи
  const addEntry = (date: string, distance: string) => {
    setEntries(prevEntries => {
      const copiedEntries = [...prevEntries];
      const existingEntry = copiedEntries.find(entry => entry.date === date);

      if (existingEntry) {
        existingEntry.distance = String(Number(existingEntry.distance) + Number(distance));
      } else {
        copiedEntries.push({ id: uuidv4(), date, distance });
      }

      return sortEntriesByDate(copiedEntries);
    });
  };

  // функция для редактирования записи
  const updateEntry = (id: string, date: string, distance: string) => {
    setEntries(prevEntries => {
      const existingEntry = prevEntries.find(entry => entry.id === id);
      const existingEntryWithSameDate = prevEntries.find(entry => entry.date === date);
      
      if (existingEntry) {
        existingEntry.date = date;
        existingEntry.distance = distance;
      
        if (existingEntryWithSameDate && existingEntryWithSameDate.id !== id) {
          existingEntryWithSameDate.distance = String(Number(existingEntryWithSameDate.distance) + Number(distance));
          prevEntries = prevEntries.filter(entry => entry.id !== existingEntry.id);
        }
      }
      return sortEntriesByDate(prevEntries);
    });
    setEditingEntry(undefined);
  };
  
  // Функция удаления записи
  const deleteEntry = (id: string) => {
    setEntries(prevEntries => prevEntries.filter(entry => entry.id !== id));
  };

  // Функция редактирования записи
  const editEntry = (id: string) => {
    const entryToEdit = entries.find(entry => entry.id === id);
    setEditingEntry(entryToEdit);
  };

  return (
    <div className='container'>
      <Form addEntry={addEntry} updateEntry={updateEntry} editingEntry={editingEntry} />
      <Table entries={entries} deleteEntry={deleteEntry} editEntry={editEntry} />
    </div>
  );
};

export default Entries;
