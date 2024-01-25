import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

const ResultanteSC = () => {
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
        const workbook = XLSX.read(data, { 
          type: 'array',
          cellDates: true
         });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, {  header: 1, raw: false });

        const nonEmptyRows = jsonData.filter(row => row.some(cell => cell !== undefined && cell !== ""));

        const extractedData = nonEmptyRows.map((row, index) => {
          if (index === 0) {
            return row;
          }
          const formattedRow = row.map((cell, colIndex) => {
            if (sheet['!cols'] && sheet['!cols'][colIndex] && sheet['!cols'][colIndex].z) {
              // Usa el formato de la columna si está definido
              return XLSX.utils.format_cell(cell, true, sheet['!cols'][colIndex].z);
            } else {
              return cell;
            }
          });

          const transformedRow = [
            "", //A
            formattedRow[0], //B
            formattedRow[1], //C
            formattedRow[2], //D
            (formattedRow[7]==="Llamada por Discador") ? "IDONOSO":formattedRow[3],
            (formattedRow[7]==="Llamada por Discador") ? "TELEFONIA":formattedRow[4],
            (formattedRow[7]==="Llamada por Discador") ? "SIN CONTACTO TITULAR":formattedRow[5],
            (formattedRow[7]==="Llamada por Discador") ? "NO CONTESTA/BUZON DE VOZ":formattedRow[6],
            formattedRow[7],
            formattedRow[8],
            formattedRow[9],
            formattedRow[10],
            formattedRow[11],
            "",
            "PHOENIX ",
            
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
    const newSheet = XLSX.utils.aoa_to_sheet([[
        "CLAVE", "RUT","DV","NOMBRES","USUARIO_GESTION","ACCION_GESTION","CONTACTO_GESTION","RESPUESTA_GESTION","OBSERVACIONES","GESTION_FECHA",
        "GESTION_HORA","NRO_DOCUMENTO","TELEFONO","VALIDAR TLF","NOMBRE EMPRESA","RUT CLIENTE","FECHA HORA GESTION","ID_GESTION","COMENTARIO",
        "MIDE NUMERO TELEFONO","AREA","TELEFONO USADO","DIRECCION USADA","CORREO USADO","MIIDE FECHA COMPROMISO","FECHA COMPROMISO","RUT USUARIO","CONTACTO",
        "MIDE ID","NOMBRE USUARIO","NUMERO DE OPERACIÓN ",""

], ...excelData.slice(1)
]);

    // Agregar la hoja al nuevo libro
    XLSX.utils.book_append_sheet(newWorkbook, newSheet, 'Resultante SC');

    const excelBuffer = XLSX.write(newWorkbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    saveAs(blob, 'Resultante SC normalizada ' + formattedDateTime + '.xlsx');
  };

  return (
    <div className='cont'>
      <div className="file-select" id="src-file1" >

        <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Cargar "Reporte Gestion"</Form.Label>
        <Form.Control type="file" accept=".xlsx" onChange={handleFileUpload}/>
      </Form.Group>
      </div>
      {excelData && (
        <div>
        <p>Nuevo Archivo: {'Resultante SC normalizada ' + formattedDateTime + '.xlsx'}</p>
        <Button onClick={handleDownload}>Descargar Resulante</Button>
        </div>
      )}
    </div>
  );
};

export default ResultanteSC;
