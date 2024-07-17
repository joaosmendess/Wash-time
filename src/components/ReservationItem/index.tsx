import React from 'react';
import { IBooking } from '../../models/BookingType';

interface ReservationItemProps {
  booking: IBooking;
  onClick: (booking: IBooking) => void;
}

const ReservationItem: React.FC<ReservationItemProps> = ({ booking, onClick }) => {
  return (
    <div 
      className="bg-gray-100 p-4 mb-2 rounded shadow-sm cursor-pointer"
      onClick={() => onClick(booking)}
    >
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
  );
};

export default ReservationItem;
