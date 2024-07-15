import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WashTypes: React.FC = () => {
  const [washTypes, setWashTypes] = useState<any[]>([]);

  useEffect(() => {
    axios.get('/api/washtypes')
      .then(response => {
        setWashTypes(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the wash types!', error);
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl">Tipos de Lavagem</h1>
      <ul>
        {washTypes.map(washType => (
          <li key={washType._id} className="mb-4 p-4 border rounded shadow">
            <h2 className="text-xl font-semibold">{washType.name}</h2>
            <p>{washType.description}</p>
            <p>Pequeno: R${washType.priceSmall}</p>
            <p>Médio: R${washType.priceMedium}</p>
            <p>Grande: R${washType.priceLarge}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WashTypes;
