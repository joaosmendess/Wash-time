import React, { useState, useEffect } from 'react';
import { fetchBookings } from '../../services/bookingService';
import { IBooking } from '../../models/BookingType';
import ReservationItem from '../ReservationItem';

const ReservationList: React.FC = () => {
  const [reservations, setReservations] = useState<IBooking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const data = await fetchBookings();
        setReservations(data);
      } catch (error) {
        setError('Erro ao carregar as reservas.');
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold">Reservas</h1>
      {reservations.length === 0 ? (
        <p className="text-gray-500">Nenhuma reserva encontrada.</p>
      ) : (
        <ul>
          {reservations.map((booking) => (
            <ReservationItem key={booking._id} booking={booking} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReservationList;
