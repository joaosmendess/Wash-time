import React from 'react';
import { BsSun, BsCloudSun } from 'react-icons/bs';

interface Booking {
  _id: string;
  customerName: string;
  customerPhone: string;
  date: string;
  time: string;
  vehicleModel: string;
  washType: string;
}

interface BookingListProps {
  bookings: Booking[];
}

const BookingList: React.FC<BookingListProps> = ({ bookings }) => {
  const morningBookings = bookings.filter(booking => parseInt(booking.time.split(':')[0]) < 12);
  const afternoonBookings = bookings.filter(booking => parseInt(booking.time.split(':')[0]) >= 12);

  return (
    <div>
      <div className="bg-white p-4 mb-4 rounded shadow-md">
        <h2 className="text-lg font-semibold mb-2 flex items-center"><BsSun className="mr-2" /> Manhã (09h-12h)</h2>
        {morningBookings.length === 0 ? (
          <p className="text-gray-500">Nenhum agendamento</p>
        ) : (
          morningBookings.map(booking => (
            <div key={booking._id} className="bg-gray-100 p-4 mb-2 rounded shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{booking.time}</p>
                  <p>{booking.customerName}</p>
                </div>
                <div>
                  <p>{booking.washType}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-lg font-semibold mb-2 flex items-center"><BsCloudSun className="mr-2" /> Tarde (13h-18h)</h2>
        {afternoonBookings.length === 0 ? (
          <p className="text-gray-500">Nenhum agendamento</p>
        ) : (
          afternoonBookings.map(booking => (
            <div key={booking._id} className="bg-gray-100 p-4 mb-2 rounded shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{booking.time}</p>
                  <p>{booking.customerName}</p>
                </div>
                <div>
                  <p>{booking.washType}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default BookingList;
