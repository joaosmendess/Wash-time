import axios from 'axios';
import { WashType } from '../models/WashType';

const API_URL = '/api/washtypes';

export const fetchWashTypes = async (): Promise<WashType[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createWashType = async (washType: WashType): Promise<WashType> => {
  const response = await axios.post(API_URL, washType);
  return response.data;
};

export const updateWashType = async (id: string, washType: WashType): Promise<WashType> => {
  const response = await axios.put(`${API_URL}/${id}`, washType);
  return response.data;
};

export const deleteWashType = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
