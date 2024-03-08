import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

function ExcelProcessor() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const processExcel = () => {
    if (!file) {
      alert('Por favor seleccione un archivo Excel.');
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const dates = [];
      let currentDate = new Date();
      const lastDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

      for (let i = 1; i <= lastDate; i++) {
        dates.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
      }

      const newData = [['Fecha', 'Nuevo Número']];

      dates.forEach((date) => {
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        let newDataValue = 0;

        // Aquí puedes realizar cualquier cálculo o búsqueda en el archivo Excel
        // para obtener el "nuevo número" para cada fecha específica

        // Por ahora, simplemente asignamos un valor aleatorio como ejemplo
        newDataValue = Math.floor(Math.random() * 100) + 1;

        newData.push([formattedDate, newDataValue]);
      });

      // Crea un nuevo libro de trabajo con los resultados
      const newWorkbook = XLSX.utils.book_new();
      const newWorksheet = XLSX.utils.aoa_to_sheet(newData);
      XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, 'Resultados');

      // Guarda el nuevo archivo
      const newFile = XLSX.write(newWorkbook, { type: 'blob', bookType: 'xlsx' });
      saveAs(newFile, 'resultados.xlsx');
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={processExcel}>Procesar Excel</button>
    </div>
  );
}

export default ExcelProcessor;
