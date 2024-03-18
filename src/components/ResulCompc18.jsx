import React, { useState } from 'react';
import Papa from 'papaparse';

function CSVProcessor() {
  const [csvData, setCsvData] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          // Asegúrate de manejar el caso en que no haya datos
          if (result.data.length > 1) {
            setCsvData(result.data.slice(1)); // Saltar la primera fila
          } else {
            setCsvData(null);
          }
        },
      });
    };

  function fecha1(fecha){
    if(fecha){
    fecha = fecha.toString();
    let fechaformateada = `LCPP${fecha.substring(8  ,10)}${fecha.substring(5  ,7)}${fecha.substring(0  ,4)}`;
    return fechaformateada
    }
    else{
        return "error"
    }
  }
  function fecha2(fecha,monto){
    if(fecha){
    fecha = fecha.toString();
    let cantidad = 15 - monto.length;
    let ceros = "0";
    let fechaformateada = fecha.substring(8  ,10)+fecha.substring(5  ,7)+fecha.substring(0  ,4)+ceros.repeat(cantidad)+monto;
    return fechaformateada
    }
    else{
        return "error"
    }
  }
 function primercampo(dato) {
    let col1 = "6003"+dato ;
    let espacio = " ";
    let cantidad = 29 - col1.length;
    col1 = col1+espacio.repeat(cantidad)
    return col1;

 }

 function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  }

  const processData = () => {
    if (!csvData) return;

    const processedData = csvData.map((row) => {

      const newColumn1 = primercampo(row.IC);
      const newColumn2 = 'PHOENIX';
      const newColumn3 = fecha1(row.FECHA_GESTION);
      const newColumn4 = `1`;
      const newColumn5 = fecha2(row.FECHA_COMPROMISO,row.MONTO);
      return `${newColumn1}${newColumn2} ${newColumn3}   ${newColumn4}  ${newColumn5}`;

    });

    // Generar archivo de texto
    const textContent = processedData.join('\n');

    // Crear un enlace para descargar el archivo
    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const currentDate = getCurrentDate();
    const a = document.createElement('a');
    a.href = url;
    a.download = `600PHOEN_${currentDate}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
        <p>Ingresar Compromisos en CSV</p>
      <input type="file" onChange={handleFileChange} />
      <button onClick={processData}>Procesar</button>
    </div>
  );
}

export default CSVProcessor;
