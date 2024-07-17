import React from 'react';
import { BsSun, BsCloudSun } from 'react-icons/bs';
import { IBooking } from '../../models/BookingType';
import ReservationItem from '../ReservationItem';

interface BookingListProps {
  bookings: IBooking[];
  onBookingClick: (booking: IBooking) => void;
}

const BookingList: React.FC<BookingListProps> = ({ bookings, onBookingClick }) => {
  const morningBookings = bookings.filter(booking => parseInt(booking.time.split(':')[0]) < 12);
  const afternoonBookings = bookings.filter(booking => parseInt(booking.time.split(':')[0]) >= 12);

  return (
    <div>
      <div className="bg-white p-4 mb-4 rounded shadow-md">
        <h2 className="text-lg font-semibold mb-2 flex items-center"><BsSun className="mr-2" /> Manhã (09h-12h)</h2>
        {morningBookings.length === 0 ? (
          <p className="text-gray-500">Nenhum agendamento marcado pela manhã</p>
        ) : (
          morningBookings.map(booking => (
            <ReservationItem key={booking._id} booking={booking} onClick={onBookingClick} />
          ))
        )}
      </div>
      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-lg font-semibold mb-2 flex items-center"><BsCloudSun className="mr-2" /> Tarde (13h-18h)</h2>
        {afternoonBookings.length === 0 ? (
          <p className="text-gray-500">Nenhum agendamento pela tarde</p>
        ) : (
          afternoonBookings.map(booking => (
            <ReservationItem key={booking._id} booking={booking} onClick={onBookingClick} />
          ))
        )}
      </div>
    </div>
  );
}

export default BookingList;
