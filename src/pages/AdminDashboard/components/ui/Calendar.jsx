/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { format } from 'date-fns';

export function Calendar({ selected, onSelect }) {
  const [value, setValue] = useState(selected || '');

  const handleChange = e => {
    const val = e.target.value;
    setValue(val);
    if (onSelect) onSelect(val);
  };

  return (
    <input
      type="date"
      value={value}
      onChange={handleChange}
      className="border px-2 py-1 rounded"
    />
  );
}