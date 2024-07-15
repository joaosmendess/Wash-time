import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookingList from '../../components/BookingList';


const Bookings: React.FC = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    axios.get('/api/bookings')
      .then(response => {
        setBookings(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the bookings!', error);
      });
  }, []);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = event.target.value;
    setSelectedDate(date);
    // Filtrar agendamentos pela data selecionada
    axios.get(`/api/bookings?date=${date}`)
      .then(response => {
        setBookings(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the bookings!', error);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Sua agenda</h1>
        <input 
          type="date" 
          value={selectedDate} 
          onChange={handleDateChange} 
          className="rounded-md border-gray-300 shadow-sm"
        />
      </div>
      <BookingList bookings={bookings} />
    </div>
  );
}

export default Bookings;
