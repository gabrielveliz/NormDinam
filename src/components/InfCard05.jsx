import React, { useState } from 'react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

function AsigCardif() {
  const [csvData, setCsvData] = useState(null);
  const [csvFileName, setCsvFileName] = useState('');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setCsvFileName(file.name); // Guardar el nombre del archivo CSV
    const reader = new FileReader();

    reader.onload = (e) => {
      const csv = e.target.result;
      setCsvData(csv);
    };

    reader.readAsText(file);
  };

  const convertToExcel = () => {
    const parsedData = Papa.parse(csvData, { header: true });

    // Buscar índices de las columnas por encabezado
    const headers = parsedData.meta.fields;

    const rut = headers.indexOf('RUT CLIENTE COMPLETO');
    const fecha = headers.indexOf('FECHA');
    const prima = headers.indexOf('PRIMA TIT UF');
    const ventas = headers.indexOf('CANTIDAD VENTAS NETAS');
    


    
    function formattdate (date){
      let fecha = toString(date);

      if(date!=="" && date!==undefined){
        if(date.indexOf("-")===4){
            fecha=date.substring(8  ,10) + "-" + date.substring(5  ,7) + "-" + date.substring(0  ,4)
            return fecha
        }
        if(date.indexOf("-")===2){
            fecha=date.substring(0  ,2) + "-" + date.substring(3  ,5) + "-" + date.substring(6  ,10)
            return fecha
        }

        fecha=date.substring(0  ,2) + "-" + date.substring(3 ,5) + "-" + date.substring(6  ,10)
        }
      return fecha;
    }

    function Camp(prima){
        
        switch (prima) {
            case '0,5':
                return "RENTA PLAN 2"
            case '0,42':
                return "RENTA PLAN 1"
            default:
              return "OTRO"
          }
    }
    function extraerDigitoyNumeros(rut) {
        // Usamos una expresión regular para separar el rut en los números y el dígito verificador
        const match = rut.match(/^(\d+)-(\d|k|K)$/i);
    
        if (match) {
            const numeros = match[1]; // Extraemos los números
            const digitoVerificador = match[2]; // Extraemos el dígito verificador
            return {
                numeros: numeros,
                digitoVerificador: digitoVerificador
            };
        } else {
            // Si el formato del rut no es válido, retornamos null o lanzamos un error según sea necesario
            return null;
        }
    }
    const filteredData = parsedData.data.filter(row => row[headers[ventas]] !== "")
    .map(row => ({
        
        RUT:row[headers[rut]]!== undefined? extraerDigitoyNumeros(row[headers[rut]]).numeros:"",
        DV:row[headers[rut]]!== undefined? extraerDigitoyNumeros(row[headers[rut]]).digitoVerificador:"",
        "NOMBRE CAMPAÑA":row[headers[rut]]!== undefined? Camp(row[headers[prima]]):"",
        FECHA : row[headers[rut]]!== undefined? formattdate(row[headers[fecha]]):"",
        POLIZA:row[headers[rut]]!== undefined?1:"",
        PRIMA:row[headers[prima]]!== undefined? row[headers[prima]].replace(",", '.'):"",
        "CALL CENTER": row[headers[rut]]!== undefined?"PHOENIX":"",
        COMPAÑÍA:row[headers[rut]]!== undefined?"CARDIF":""
    }));

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');
    XLSX.writeFile(workbook, csvFileName.replace('.csv', '') + ' Informe Ventas.xlsx'); 
  };

  return (
    <div className='cont'>
      <div className="file-select" id="src-file1" >
      <Form.Group controlId="formFile" className="mb-3">
      <p>Cargar CSV TOT Final Mes</p>
      <Form.Control type="file" accept=".csv" onChange={handleFileUpload}/>

      </Form.Group>
      </div>
      <div className='botoncardif'>
        <Button onClick={convertToExcel}>PROCESAR</Button>
      </div>
    </div>
    
  );
}

export default AsigCardif;
