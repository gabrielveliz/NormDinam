import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const ExcelHandler = () => {
  const [excelData, setExcelData] = useState(null);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  };

  const formatter = new Intl.DateTimeFormat('es-CL', options);
  const formattedDateTime = formatter.format(currentDateTime);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        const extractedData = jsonData.map((row, index) => {
          if (index === 0) {
            return row;
          }

          const formattedRow = row.map((cell) =>
            typeof cell === 'number' ? cell.toLocaleString('fullwide', { useGrouping: false }) : cell
          );

          const originalDate = formattedRow[62];

// Verificar si la fecha es "00000000"
const isInvalidDate = originalDate === "00000000";

let formattedDateString = "";

if (!isInvalidDate) {
  // Obtener año, mes y día de la cadena original
  const year = originalDate.slice(0, 4);
  const month = originalDate.slice(4, 6);
  const day = originalDate.slice(6, 8);

  // Crear un objeto Date con los componentes obtenidos
  const formattedDate = new Date(`${year}-${month}-${day}`);

  // Obtener la fecha formateada como "DD-MM-YYYY"
  formattedDateString = formattedDate.toLocaleDateString('es-CL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    // Puedes ajustar el formato según tus preferencias
  });
}

          const transformedRow = [
            formattedRow[2], // Columna C
            `${formattedRow[0]}-${formattedRow[1]}`, // Concatenar A y B
            formattedRow[9], // Columna J
            formattedRow[21], // Columna V
            formattedRow[22], // Columna W
            formattedRow[23], // Columna X
            (formattedDateString === "")? "00-00-0000" : formattedDateString,
            formattedRow[48],// correo
            (formattedRow[24] !== undefined) ? `${formattedRow[24]}${formattedRow[25]}` : (formattedRow[25] !== undefined) ? `${formattedRow[25]}`:"", // Concatenar A y B si ambos no son undefined
            (formattedRow[26] !== undefined) ? `${formattedRow[26]}${formattedRow[27]}` : (formattedRow[27] !== undefined) ? `${formattedRow[27]}`:"", // Concatenar A y B
            
          ];


          return transformedRow;
        });

        setExcelData(extractedData);
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const handleDownload = () => {
    const newWorkbook = XLSX.utils.book_new();

    // Crear una nueva hoja
    const newSheet = XLSX.utils.aoa_to_sheet([["Nro_Documento", "RUT - DV", "NOMBRE", "AD2", "AD3", "AD4","AD11","AD13","FONO1","FONO2"], ...excelData.slice(1)]);

    // Agregar la hoja al nuevo libro
    XLSX.utils.book_append_sheet(newWorkbook, newSheet, 'Sheet1');

    const excelBuffer = XLSX.write(newWorkbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    saveAs(blob, 'normalizada ' + formattedDateTime + '.xlsx');
  };

  return (
    <div className='cont'>
      <input type="file" accept=".xlsx" onChange={handleFileUpload} />
      {excelData && (
        <button onClick={handleDownload}>Descargar Normalizado</button>
      )}
    </div>
  );
};

export default ExcelHandler;
