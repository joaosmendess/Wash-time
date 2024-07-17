import axios from 'axios';
import { IBooking } from '../models/BookingType';

const API_URL = '/api/bookings';

export const fetchBookingsByDate = async (date: string): Promise<IBooking[]> => {
  const response = await axios.get(`${API_URL}?date=${date}`);
  return response.data;
};

export const fetchBookings = async (): Promise<IBooking[]> => {
    const response = await axios.get(API_URL);
    return response.data;
  };