import { ITableProps } from '../types';
import './Table.css';

const Table: React.FC<ITableProps> = ({ entries, deleteEntry, editEntry }) => {
  // форматируем дату в нужный вид (ДД.ММ.ГГГГ)
  const dateFormat = (date: string) => date.split('-').reverse().join('.');

  // возвращаем null, если записей нет
  if (entries.length === 0) return null;

  return (
    <div className='table'>
      <div className='table-title'>
        <span>Дата (ДД.ММ.ГГ)</span>
        <span>Пройдено км</span>
        <span>Действия</span>
      </div>
      <div className='table-body'>
        {entries.map(entry => (
          <div className='table-entry' key={entry.id}>
            <div className='entry-date'>{dateFormat(entry.date)}</div>
            <div className='entry-distance'>{entry.distance}</div>
            <div className='entry-buttons'>
              <button className='entry-button edit' onClick={() => editEntry(entry.id)}>✎</button>
              <button className='entry-button delete' onClick={() => deleteEntry(entry.id)}>✘</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Table;
