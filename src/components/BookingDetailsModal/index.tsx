import React from 'react';
import { Modal, Button } from 'flowbite-react';
import { IBooking } from '../../models/BookingType'

interface BookingDetailsModalProps {
  booking: IBooking | null;
  isOpen: boolean;
  onClose: () => void;
  onCancel: (id: string) => void;
}

const BookingDetailsModal: React.FC<BookingDetailsModalProps> = ({ booking, isOpen, onClose, onCancel }) => {
  if (!isOpen || !booking) return null;

  return (
    <Modal show={isOpen} size="md" popup={true} onClose={onClose}>
      <Modal.Header>
        Detalhes da Reserva
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <p><strong>Nome do Cliente:</strong> {booking.customerName}</p>
          <p><strong>Telefone do Cliente:</strong> {booking.customerPhone}</p>
          <p><strong>Data:</strong> {new Date(booking.date).toLocaleDateString()}</p>
          <p><strong>Hora:</strong> {booking.time}</p>
          <p><strong>Modelo do Veículo:</strong> {booking.vehicleModel}</p>
          <p><strong>Tipo de Lavagem:</strong> {booking.washType}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button color="failure" onClick={() => onCancel(booking._id)}>
          Cancelar Agendamento
        </Button>
        <Button color="gray" onClick={onClose}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BookingDetailsModal;
