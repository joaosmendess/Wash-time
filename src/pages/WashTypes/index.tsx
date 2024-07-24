import React, { useEffect, useState } from 'react';
import { fetchWashTypes, deleteWashType } from '../../services/washTypesService';
import { WashType } from '../../models/WashType';
import WashTypeForm from '../../components/WashTypeForm';
import { Button } from 'flowbite-react';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline';

const WashTypes: React.FC = () => {
  const [washTypes, setWashTypes] = useState<WashType[]>([]);
  const [selectedWashType, setSelectedWashType] = useState<WashType | undefined>(undefined);

  useEffect(() => {
    const loadWashTypes = async () => {
      const data = await fetchWashTypes();
      setWashTypes(data);
    };
    loadWashTypes();
  }, []);

  const handleCreate = (newWashType: WashType) => {
    setWashTypes((prevWashTypes) => [...prevWashTypes, newWashType]);
  };

  const handleUpdate = (updatedWashType: WashType) => {
    setWashTypes((prevWashTypes) => prevWashTypes.map(washType => washType._id === updatedWashType._id ? updatedWashType : washType));
  };

  const handleDelete = async (id: string) => {
    await deleteWashType(id);
    setWashTypes((prevWashTypes) => prevWashTypes.filter(washType => washType._id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold mb-4 md:mb-0">Tipos de Lavagem</h1>
        <WashTypeForm onCreate={handleCreate} onUpdate={handleUpdate} selectedWashType={selectedWashType} clearSelectedWashType={() => setSelectedWashType(undefined)} />
      </div>
      <ul className="space-y-4">
        {washTypes.map((washType) => (
          <li key={washType._id} className="p-4 border rounded shadow">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
              <h2 className="text-xl font-semibold">{washType.name}</h2>
              <div className="flex space-x-2 mt-2 md:mt-0">
                <Button 
                  color="info" 
                  onClick={() => setSelectedWashType(washType)}
                  className="flex items-center justify-center p-1"
                >
                  <PencilIcon className="h-5 w-5" />
                </Button>
                <Button 
                  color="failure" 
                  onClick={() => handleDelete(washType._id)}
                  className="flex items-center justify-center p-1"
                >
                  <TrashIcon className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <p className="mb-2">{washType.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <p>Pequeno: R${washType.priceSmall}</p>
              <p>Médio: R${washType.priceMedium}</p>
              <p>Grande: R${washType.priceLarge}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WashTypes;
