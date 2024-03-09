import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { CSVLink } from 'react-csv';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

function BajaRec() {
    const [excelData, setExcelData] = useState([]);
    const [csvData, setCSVData] = useState([]);
    const [fileName, setFileName] = useState([]);
    

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const workbook = XLSX.read(bstr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      setExcelData(data);
    };
    reader.readAsBinaryString(file);
  };

  const extractData = () => {
    if (!excelData || excelData.length === 0) {
      console.log('No se ha cargado ningún archivo Excel.');
      return;
    }
    const headers = excelData[0];
    const numeroIndex = headers.indexOf('OP');
    const tipoIndex = headers.indexOf('TIPO PAGO');

    if (numeroIndex === -1 || tipoIndex === -1) {
      console.log('No se encontraron las columnas "numero" o "tipo" en el archivo Excel.');
      return;
    }

    const uniqueDocuments = new Set();

    const extractedData = excelData.slice(1).reduce((acc, row) => {
      if (row[tipoIndex] !== "CREDITO SOCIAL") {
        const documento = row[numeroIndex];
        if (!uniqueDocuments.has(documento)) {
          uniqueDocuments.add(documento);
          acc.push({
            "N° documento": documento
          });
        }
      }
      return acc;
    }, []);

    const currentDate = new Date();
    const formattedDate = `${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
    setCSVData(extractedData);

    setFileName(`Bloqueo Recupero ${formattedDate}.csv`);
  
  };

  return (
    <div>

    <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Seleccionar recupero del dia en formato excel</Form.Label>
        <Form.Control type="file" accept=".xlsx" onChange={handleFileUpload}/>
      </Form.Group>
      <Button className='bottondes' onClick={extractData}>Procesar</Button>
      {csvData.length > 0 && (
        <CSVLink data={csvData} filename={fileName}>
          <Button className='bottondes'>Descargar CSV</Button>
        </CSVLink>
      )}
    </div>
  );
}

export default BajaRec;
