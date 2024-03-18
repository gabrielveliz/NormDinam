import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { readExcelData, writeExcelData } from './excelUtils'; // Implementa estas funciones según tu lógica de procesamiento

const App = () => {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);

  const onDrop1 = (acceptedFiles) => {
    setFile1(acceptedFiles[0]);
  };

  const onDrop2 = (acceptedFiles) => {
    setFile2(acceptedFiles[0]);
  };
  const processData = (data1, data2) => {
    const newData = [];
  
    // Cruzar los datos basados en el número de documento
    for (const row1 of data1) {
      for (const row2 of data2) {
        if (row1['ID CLIENTE'] === row2['Rut']) {
          // Generar un nuevo objeto con RUT, nombre y nacionalidad
          //row 1 cdr
          //row 2 BBDD
          newData.push({
            'CALL CENTER': 'PHOENIX',
            SOCIO:'ITAU ',
            PRODUCTO:row2['PRODUCTO'],
            CAMPANA:row2['SUBPRODUCTOS'],
            POLIZA:12238593,
            'FRECUENCIA PRIMA':'Mensual ',
            'CODIGO PRODUCTO':8593,
            RUT: row1['ID CLIENTE'],
            'RUT CLIENTE COMPLETO':row2['RUT COMPLETO '],
            FECHA:row1['DATE'],
            FONO:row1['TELEPHONE'],
            'RUT AGENTE':'no encontrado'
          });
          break; // Detener la búsqueda una vez que se encuentra una coincidencia
        }
      }
    }
  
    return newData;
  };
  
  const handleProcess = () => {
    if (file1 && file2) {
      const data1 = readExcelData(file1);
      const data2 = readExcelData(file2);
      // Realiza el procesamiento de datos y genera el nuevo archivo Excel
      const newData = processData(data1, data2);
      writeExcelData(newData);
    }
  };

  const { getRootProps: getRootProps1, getInputProps: getInputProps1 } = useDropzone({ onDrop: onDrop1 });
  const { getRootProps: getRootProps2, getInputProps: getInputProps2 } = useDropzone({ onDrop: onDrop2 });

  return (
    <div>
      <div {...getRootProps1()}>
        <input {...getInputProps1()} />
        <p>Arrastra y suelta el primer archivo Excel aquí</p>
      </div>
      <div {...getRootProps2()}>
        <input {...getInputProps2()} />
        <p>Arrastra y suelta el segundo archivo Excel aquí</p>
      </div>
      <button onClick={handleProcess}>Procesar archivos</button>
    </div>
  );
};

export default App;
