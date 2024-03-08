import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';


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

        const headers = jsonData[0]; // Encabezados de las columnas
        const columnIndexMap = createColumnIndexMap(headers);

        
        const rutIndex = columnIndexMap['Rut Deudor'];
        const dvIndex = columnIndexMap['DV Deudor'];
        const nameIndex=columnIndexMap['Nombre'];
        const ddasIdNumeroOperacIndex = columnIndexMap['Número Operación de crédito'];
        const deudaIndex = columnIndexMap['Deuda'];
        const ofertaIndex = columnIndexMap['Monto Oferta'];
        const emailIndex = columnIndexMap['MAIL'];
        const pagoIndex = columnIndexMap['TIPO DE PAGO'];
        const negraIndex = columnIndexMap['MOTIVO'];
        

        
        const nonEmptyRows = jsonData.filter(row => row.some(cell => cell !== undefined && cell !== ""));

        const extractedData = nonEmptyRows.map((row, index) => {
          if (index === 0) {
            return row;
          }

          const formattedRow = row.map((cell) =>
          typeof cell === 'number' ? cell.toLocaleString('fullwide', { useGrouping: false }) : cell
        );
        const email=nameIndex !== undefined ? formattedRow[emailIndex] : '';
        if (email === '') {
            return null; // No agregar esta fila al archivo Excel
          }
        const rut = rutIndex !== undefined ? formattedRow[rutIndex] : '';
        const dv = dvIndex !== undefined ? formattedRow[dvIndex] : '';
        const ddasIdNumeroOperac = ddasIdNumeroOperacIndex !== undefined ? formattedRow[ddasIdNumeroOperacIndex] : '';
        const name=nameIndex !== undefined ? formattedRow[nameIndex] : '';
        const deuda=nameIndex !== undefined ? formattedRow[deudaIndex] : '';
        const oferta=nameIndex !== undefined ? formattedRow[ofertaIndex] : '';

        const pago=nameIndex !== undefined ? formattedRow[pagoIndex] : '';
        const negra=nameIndex !== undefined ? formattedRow[negraIndex] : '';
        
        if (pago !== '') {
            return null; // No agregar esta fila al archivo Excel
          }
        if (negra !== '') {
            return null; // No agregar esta fila al archivo Excel
          }
      
        // ************************** Fin seccion para validar numeros de telefonos *****************


            const transformedRow = [
                "CAJA 18",
                "CAJA 18",
                72840,
                rut,
                dv,
                name,
                ddasIdNumeroOperac,
                deuda,
                oferta,
                "",
                email,
                "Miglen Tovar",
                "mtovar@estandar.phoenixserviceinfo.cl",
                "mtovar@cob.phoenixservice.cl",
                "Katherine Caneiro",
                "kcaneiro@phoenixservice.cl",
                "MARZO",
                2024,
                15,
                "MARZO",
                2024,
                "",
                "Ejecutiva de Normalización",
                "PRC"
              ];
    
    
              return transformedRow;
        
          
        
        }).filter(row => row !== null); // Filtrar las filas que no son nulas

        setExcelData(extractedData);
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const createColumnIndexMap = (headers) => {
    const columnIndexMap = {};
    headers.forEach((header, index) => {
      columnIndexMap[header] = index;
    });
    return columnIndexMap;
  };

  const handleDownload = () => {
    const newWorkbook = XLSX.utils.book_new();

    // Crear una nueva hoja
    const newSheet = XLSX.utils.aoa_to_sheet([["INSTITUCIÓN", "SEGMENTOINSTITUCIÓN", "message_id","RUT","DV","RAZON_SOCIAL",
    "OPERACION","DEUDA","OFERTA","TOTAL","dest_email","name_from","mail_from","CORREO","NOMBRE_SUPERVISOR","CORREO_SUPERVISOR",
    "MES_CURSO","ANO_CURSO","DIA_OFERTA","MES_OFERTA","ANO_OFERTA","FONO EJECUTIVO","CARGO EJECUTIVO","FOCO"

], ...excelData.slice(1)]);

    // Agregar la hoja al nuevo libro
    XLSX.utils.book_append_sheet(newWorkbook, newSheet, 'ARCHIVO DE CARGA ASIGNACION SC ');

    const excelBuffer = XLSX.write(newWorkbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    saveAs(blob, 'Masividad PRC ' + formattedDateTime + '.xlsx');
  };

  return (
    <div className='cont'>
      <div className="file-select" id="src-file1" >

        <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Cargar Seguimiento"</Form.Label>
        <Form.Control type="file" accept=".xlsx" onChange={handleFileUpload}/>
      </Form.Group>
      </div>
      {excelData && (
        <div>
        <p>Nuevo Archivo: {'Masividad ' + formattedDateTime + '.xlsx'}</p>
        <Button onClick={handleDownload}>Descargar masividad</Button>
        </div>
      )}
    </div>
  );
};

export default ExcelHandler;
