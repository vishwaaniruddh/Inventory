import React from 'react';
import Barcode from 'react-barcode';

const BarcodeComponent = ({ serialNumbers }) => {
  const serialArray = Array.isArray(serialNumbers) ? serialNumbers : [serialNumbers];

  return (
    <div>
      {serialArray.map((serialNumber, index) => (
        <div key={index}>
          <Barcode value={serialNumber} height={30} width={2} />
        </div>
      ))}
    </div>
  );
};

export default BarcodeComponent;
