import React, { useState, useEffect } from 'react';
import { Button, Modal, Label, TextInput, Textarea } from 'flowbite-react';
import { WashType } from '../../models/WashType';
import { createWashType, updateWashType } from '../../services/washTypesService';
import { PlusIcon } from '@heroicons/react/16/solid'; 

interface WashTypeFormProps {
  onCreate: (washType: WashType) => void;
  onUpdate: (washType: WashType) => void;
  selectedWashType?: WashType;
  clearSelectedWashType: () => void;
}

const WashTypeForm: React.FC<WashTypeFormProps> = ({ onCreate, onUpdate, selectedWashType, clearSelectedWashType }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priceSmall, setPriceSmall] = useState(0);
  const [priceMedium, setPriceMedium] = useState(0);
  const [priceLarge, setPriceLarge] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (selectedWashType) {
      setName(selectedWashType.name);
      setDescription(selectedWashType.description);
      setPriceSmall(selectedWashType.priceSmall);
      setPriceMedium(selectedWashType.priceMedium);
      setPriceLarge(selectedWashType.priceLarge);
      setIsOpen(true);
    }
  }, [selectedWashType]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const washType: WashType = {
        name, description, priceSmall, priceMedium, priceLarge,
        _id: ''
    };

    if (selectedWashType) {
      await updateWashType(selectedWashType._id, washType);
      onUpdate({ ...washType, _id: selectedWashType._id });
    } else {
      const createdWashType = await createWashType(washType);
      onCreate(createdWashType);
    }

    clearForm();
  };

  const clearForm = () => {
    setName('');
    setDescription('');
    setPriceSmall(0);
    setPriceMedium(0);
    setPriceLarge(0);
    setIsOpen(false);
    clearSelectedWashType();
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)} className="bg-black text-white font-bold py-2 px-0 rounded">
        <PlusIcon className="h-5 w-5 mr-2" />
        {selectedWashType ? 'Editar Tipo de Lavagem' : 'Criar Novo Tipo de Lavagem'}
      </Button>
      <Modal show={isOpen} onClose={clearForm}>
        <Modal.Header>{selectedWashType ? 'Editar Tipo de Lavagem' : 'Criar Novo Tipo de Lavagem'}</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label htmlFor="name" value="Nome" />
              <TextInput id="name" required value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="mb-4">
              <Label htmlFor="description" value="Descrição" />
              <Textarea id="description" required value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="mb-4">
              <Label htmlFor="priceSmall" value="Preço para carro pequeno" />
              <TextInput id="priceSmall" type="number" required value={priceSmall} onChange={(e) => setPriceSmall(Number(e.target.value))} />
            </div>
            <div className="mb-4">
              <Label htmlFor="priceMedium" value="Preço para carro médio" />
              <TextInput id="priceMedium" type="number" required value={priceMedium} onChange={(e) => setPriceMedium(Number(e.target.value))} />
            </div>
            <div className="mb-4">
              <Label htmlFor="priceLarge" value="Preço para carro grande" />
              <TextInput id="priceLarge" type="number" required value={priceLarge} onChange={(e) => setPriceLarge(Number(e.target.value))} />
            </div>
            <Button type="submit" className="bg-black text-white font-bold py-2 px-4 rounded">
              {selectedWashType ? 'Atualizar' : 'Salvar'}
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default WashTypeForm;
