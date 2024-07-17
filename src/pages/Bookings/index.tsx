import React, { useEffect, useState } from 'react';
import BookingList from '../../components/BookingList';
import BookingDetailsModal from '../../components/BookingDetailsModal';
import { IBooking } from '../../models/BookingType';
import { fetchBookingsByDate } from '../../services/bookingService';
import axios from 'axios';

const Bookings: React.FC = () => {
  const getCurrentDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [selectedDate, setSelectedDate] = useState(getCurrentDate());
  const [selectedBooking, setSelectedBooking] = useState<IBooking | null>(null);

  const loadBookings = async (date: string) => {
    try {
      const data = await fetchBookingsByDate(date);
      setBookings(data);
    } catch (error) {
      console.error('There was an error fetching the bookings!', error);
    }
  };

  useEffect(() => {
    loadBookings(selectedDate);
  }, [selectedDate]);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const isToday = (date: string) => {
    const today = new Date();
    const selected = new Date(date);
    return today.toDateString() === selected.toDateString();
  };

  const handleBookingClick = (booking: IBooking) => {
    setSelectedBooking(booking);
  };

  const closeModal = () => {
    setSelectedBooking(null);
  };

  const handleCancelBooking = async (id: string) => {
    try {
      await axios.delete(`/api/bookings/${id}`);
      setBookings(bookings.filter(booking => booking._id !== id));
      closeModal();
    } catch (error) {
      console.error('There was an error canceling the booking!', error);
    }
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
      {bookings.length === 0 ? (
        <p className="text-gray-500 text-center">
          Nenhum agendamento {isToday(selectedDate) ? 'para o dia de hoje' : 'no dia selecionado'}
        </p>
      ) : (
        <BookingList bookings={bookings} onBookingClick={handleBookingClick} />
      )}
      <BookingDetailsModal 
        booking={selectedBooking} 
        isOpen={!!selectedBooking} 
        onClose={closeModal} 
        onCancel={handleCancelBooking} 
      />
    </div>
  );
}

export default Bookings;
