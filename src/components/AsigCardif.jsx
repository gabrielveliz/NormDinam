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
    const columnIndexA = headers.indexOf('NombreCliente');

    const columnIndexB1 = headers.indexOf('ApellidoPaterno');
    const columnIndexB2 = headers.indexOf('ApellidoMaterno');

    const columnIndexC1 = headers.indexOf('Rut');
    const columnIndexC2 = headers.indexOf('DV');

    const columnIndexE = headers.indexOf('Edad');

    const columnIndexF = headers.indexOf('Genero');

    // COLUMNA G - PAIS SIEMPRE CHILE

    // COLUMNA H - DEPARTAMENTO SIEMPRE VACIO

    const columnIndexI = headers.indexOf('DirPartLocalidad');

    const columnIndexJ = headers.indexOf('DirPartComuna');

    const columnIndexK = headers.indexOf('DirPartFull');

    const columnIndexL = headers.indexOf('PRODUCTO');

    const columnIndexM = headers.indexOf('CAMPANA');

    const columnIndexN = headers.indexOf('NombreEjecuivo');

    const columnIndexO = headers.indexOf('NombreSucursal');

    const columnIndexP = headers.indexOf('FechaNac');

    // Q = XX VACIA

    const columnIndexR = headers.indexOf('Fecha_Apert_Ctacte');

    const columnIndexS = headers.indexOf('fec_aper_tar');

    // T = XX VACIA

    const columnIndexU = headers.indexOf('NroTC');

    const columnIndexV = headers.indexOf('Email');

    const columnIndexW = headers.indexOf('Cta Cte');

    const columnIndexX = headers.indexOf('FonoMovil');

    const columnIndexY1 = headers.indexOf('AreaPart');

    const columnIndexY2 = headers.indexOf('FonoPart');

    const columnIndexZ1 = headers.indexOf('AreaLab');

    const columnIndexZ2 = headers.indexOf('FonoLab');


    // AA = FREE
    

    
    function formateatelefono(fono){
    
      let telefono = fono.toString();
      if(fono.length===8){
        telefono = "919"+ fono.toString();
      }
      if(fono.length===9){
        telefono = "91"+fono.toString();
      }
      if(telefono.length!==11){
        telefono = "";
      }
      return telefono;

    }

    function joinphone(area,telefono){
      let phone ="";
      if(area===-1){
        phone = area +""+ telefono;
      }
      else{
        let largo = area.indexOf(".");
        phone = area.substring(0  ,largo) +""+ telefono;
      }
      

      if(phone.length>9){
        phone = phone.substring(phone.length - 9);
      }
      

      phone= formateatelefono(phone)

      return phone;
    }

    function card(tar){
      let tarjeta = tar.toString()

      if(tarjeta.length===4)
      {
        tarjeta = tar.toString()
      }
      if(tarjeta.length===3)
      {
        tarjeta = "0" + tar.toString()
      }
      if(tarjeta.length===2)
      {
        tarjeta = "00" + tar.toString()
      }
      if(tarjeta.length===1)
      {
        tarjeta = "000" + tar.toString()
      }

      if(tarjeta==="0000")
      {
        tarjeta ="";
      }
      return tarjeta;
    }
    
    function formattdate (date){
      let fecha = "";
      if(date.indexOf("-")===4){
        fecha=date.substring(8  ,10) + "-" + date.substring(5  ,7) + "-" + date.substring(0  ,4)
        return fecha
      }
      if(date.indexOf("-")===2){
        fecha=date.substring(0  ,10)
        return fecha
      }
    }
    const filteredData = parsedData.data.map(row => ({
        
        NOMBRE: row[headers[columnIndexA]] ? row[headers[columnIndexA]].replace(/[^\w\s]/gi, '') : '',
        APELLIDO: row[headers[columnIndexC1]] ? (row[headers[columnIndexB1]] ? row[headers[columnIndexB1]].replace(/[^\w\s]/gi, '') : '')+" "+ (row[headers[columnIndexB2]] ? row[headers[columnIndexB2]].replace(/[^\w\s]/gi, '') : ''):"",
        TIPOID: row[headers[columnIndexC1]] ? row[headers[columnIndexC1]]+"-"+ row[headers[columnIndexC2]]:"",
        ID: row[headers[columnIndexC1]] ? row[headers[columnIndexC1]]+"-"+ row[headers[columnIndexC2]]:"",
        EDAD: row[headers[columnIndexE]],
        SEXO: row[headers[columnIndexF]],
        PAIS: row[headers[columnIndexC1]] ? "CHILE" :"",
        DEPARTAMENTO: "",
        CIUDAD: row[headers[columnIndexI]] ? row[headers[columnIndexI]].replace(/[^\w\s]/gi, '') : '',
        ZONA: row[headers[columnIndexJ]] ? row[headers[columnIndexJ]].replace(/[^\w\s]/gi, '') : '',
        DIRECCION: row[headers[columnIndexK]] ? row[headers[columnIndexK]].replace(/[^\w\s]/gi, '') : '',
        PRODUCTO: row[headers[columnIndexL]],
        SUBPRODUCTO: row[headers[columnIndexM]] ? row[headers[columnIndexM]].substring(row[headers[columnIndexM]].length - 2) : '',
        NOMBREEJECUTIVO: row[headers[columnIndexN]] ? row[headers[columnIndexN]].replace(/[^\w\s]/gi, '') : '',
        NOMBRESUCURSAL: row[headers[columnIndexO]] ? row[headers[columnIndexO]].replace(/[^\w\s]/gi, '') : '',
        FECHANAC:  row[headers[columnIndexP]] ?  formattdate(row[headers[columnIndexP]]) : ''  ,
        XX: "",
        FECHA_APERT_CTACTE: row[headers[columnIndexR]] ?  formattdate(row[headers[columnIndexR]]) : ''  ,
        FEC_APER_TAR: row[headers[columnIndexS]] ?  formattdate(row[headers[columnIndexS]]) : ''  ,
        XX2: "",
        NROTC: row[headers[columnIndexC1]] ? card(row[headers[columnIndexU]]):"",
        CORREO: row[headers[columnIndexV]],
        CtaCte: row[headers[columnIndexC1]] ? card(row[headers[columnIndexW]]):"",
        FONOMOVIL: row[headers[columnIndexX]] ? formateatelefono(row[headers[columnIndexX]]):"",
        FonoPartCompleto: row[headers[columnIndexC1]] ? joinphone(row[headers[columnIndexY1]],row[headers[columnIndexY2]]) :"",
        FonoLabCompleto: row[headers[columnIndexC1]] ? joinphone(row[headers[columnIndexZ1]],row[headers[columnIndexZ2]]):"",
        XX3:"",
        COD:row[headers[columnIndexC1]] ? "FREE" :""

    }));

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');
    XLSX.writeFile(workbook, csvFileName.replace('.csv', '') + ' PROCESADO.xlsx'); 
  };

  return (
    <div className='cont'>
      <div className="file-select" id="src-file1" >
      <Form.Group controlId="formFile" className="mb-3">
      <p>Cargar CSV Asignacion Cardif</p>
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
