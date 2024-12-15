import { useState, useEffect } from 'react';
import { IFormProps } from '../types';
import './Form.css';

const Form: React.FC<IFormProps> = ({ addEntry, updateEntry, editingEntry }) => {
  const [date, setDate] = useState('');
  const [distance, setDistance] = useState<string>('');

  // обновляем форму при редактировании
  useEffect(() => {
    if (editingEntry) {
      setDate(editingEntry.date);
      setDistance(editingEntry.distance);
    }
  }, [editingEntry]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // если редактируем, вызываем updateEntry, иначе addEntry
    if (editingEntry) {
      updateEntry(editingEntry.id, date, distance);
    } else {
      addEntry(date, distance);
    }
    // очищаем форму
    setDate('');
    setDistance('');
  }

  return (
    <form className='form' onSubmit={handleSubmit}>
      <div className='form-group'>
        <label htmlFor='date'>Дата (ДД.ММ.ГГ)</label>
        <input className='form-input date'
          id='date'
          name='date'
          type='date'
          min='2000-01-01'
          max='2100-12-31'
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div className='form-group'>
        <label htmlFor='distance'>Пройдено км</label>
        <input className='form-input distance'
          id='distance'
          name='distance'
          type='number'
          min={0}
          step='0.01'
          placeholder='Введите дистанцию'
          value={distance}
          onChange={(e) => setDistance(e.target.value.replace(',', '.'))}
          required
        />
      </div>
      <div className='form-group'>
        <button className='form-input submit-button' type='submit'>OK</button>
      </div>
    </form>
  );
}

export default Form;
