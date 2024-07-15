import React, { useState } from 'react';
import { Datepicker } from 'flowbite-react';

interface DatePickerProps {
  selected: Date;
  onChange: (date: Date) => void;
}

const CustomDatePicker: React.FC<DatePickerProps> = ({ selected, onChange }) => {
  return (
    <Datepicker 
      value={selected.toISOString().split('T')[0]} 
      onChange={(e) => onChange(new Date(e.target.value))}
      className="rounded-md border-gray-300 shadow-sm"
    />
  );
}

export default CustomDatePicker;
