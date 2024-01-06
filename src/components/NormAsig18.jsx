import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

const NormAsig18 = () => {
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
        
        //reconocimiento del index de las columnas que necesitamos
        const ddasIdNumeroOperacIndex = columnIndexMap['Número Operación de crédito'];
        const rutIndex = columnIndexMap['Rut Deudor'];
        const dvIndex = columnIndexMap['DV Deudor'];
        const nameIndex=columnIndexMap['Nombre deudor'];

        const cuotasmorodasindex=parseInt(columnIndexMap['Num de cuotas morosas'], 10);
        const valorcuotaIndex=parseInt(columnIndexMap['Valor Cuota'], 10);
        const fechavencIndex=columnIndexMap['Fecha vencimiento cuota (AAAAMMDD)'];




        
        const nonEmptyRows = jsonData.filter(row => row.some(cell => cell !== undefined && cell !== ""));

        const extractedData = nonEmptyRows.map((row, index) => {
          if (index === 0) {
            return row;
          }

          const formattedRow = row.map((cell) =>
          typeof cell === 'number' ? cell.toLocaleString('fullwide', { useGrouping: false }) : cell
        );
        const ddasIdNumeroOperac = ddasIdNumeroOperacIndex !== undefined ? formattedRow[ddasIdNumeroOperacIndex] : '';
        const rut = rutIndex !== undefined ? formattedRow[rutIndex] : '';
        const dv = dvIndex !== undefined ? formattedRow[dvIndex] : '';
        const name=nameIndex !== undefined ? formattedRow[nameIndex] : '';

        const cuotasmorosas=cuotasmorodasindex !== undefined ? formattedRow[cuotasmorodasindex] : '';
        const valorcuota=valorcuotaIndex !== undefined ? formattedRow[valorcuotaIndex] : '';
        const fechavenc=fechavencIndex !== undefined ? formattedRow[fechavencIndex] : '';

        


        


    // ++++++  Seccion para formatear Fecha +++++++++++++++++
          const originalDate = fechavenc;
          // Verificar si la fecha es "00000000"
          const isInvalidDate = originalDate === "00000000";
          const isInvalid = originalDate === undefined;


          let formattedDateString = "";

          if (!isInvalidDate && !isInvalid) {
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
      // ************************** Fin seccion formetear fecha *****************

      // ++++++  Seccion validar numeros de telefono +++++++++++++++++
      //const fono1 = (area1data !== undefined) ? `${area1data}${fono1data}` : (fono1data !== undefined) ? `${fono1data}` : "";

      // Función para verificar y formatear números de teléfono
      function formatPhoneNumber(phone) {
        // Eliminar cualquier carácter que no sea un dígito
        let cleanPhone = phone;
      
        const sonTodosIguales = (numero) => {
          const numeroComoCadena = numero.toString();
          const primerDigito = numeroComoCadena.charAt(0);
      
          for (let i = 1; i < numeroComoCadena.length; i++) {
            if (numeroComoCadena.charAt(i) !== primerDigito) {
              return false;
            }
          }
      
          return true;
        };
        //verificar si son numeros repetidos
        if(sonTodosIguales(cleanPhone)){
          cleanPhone="";
        }
      
        // Verificar si el número tiene 11 dígitos y comienza con "56"
        if (cleanPhone.length === 11 && cleanPhone.startsWith('56')) {
          cleanPhone= `9${cleanPhone.slice(2)}`;
        }
      
        // Verificar si el número tiene exactamente 8 dígitos
        if (cleanPhone.length === 8) {
          cleanPhone= `9${cleanPhone}`;
        }
        
        //despues de formatear los numeros, verifica si aun tienen mas o menos de 9 y los elimina si se cumple la condicion
        if(cleanPhone.length<9){
          cleanPhone="";
        }
        if(cleanPhone.length>9){
          cleanPhone="";
        }

        //retornar numero despues de verificar las condiciones
        return cleanPhone;
      }
      
      // Aplicar la función de verificación a los números de teléfono
      //const formattedFono1 = formatPhoneNumber(fono1);

        // ************************** Fin seccion para validar numeros de telefonos *****************

        const transformedRow = [
            ddasIdNumeroOperac, // Columna C - Nro_Documento - autodetectado por nombre de columna
            (rut !== undefined && dv !== undefined) ? `${rut}-${dv}`:"", // Concatenar A y B - RUT - DV
            name, // NOMBRE
            cuotasmorosas * 1, // AD1
            "Credito", // NombreProducto
            valorcuota * 1, // AD2 
            'Monto Moroso "Nuevo"', // AD3 
            " ", // AD4
            " ", // AD5 
            " ", // AD6
            cuotasmorosas*valorcuota, // AD7
            " ", // DEUDA TOTAL
            (formattedDateString === "")? "00-00-0000" : formattedDateString, // AD11 - fecha
            " ", // AD8
            "PHOENIX (TELEFONIA)", // AD9
            " ", // AD10
            " ",  //formattedRow[16], DIRECCION
            " ",//formattedRow[19], COMUNA
            " ", //CIUDAD
            " ", //formattedRow[20], REGION
            " ", //DIRECCION_COMERCIAL
            " ", //COMUNA_COMERCIAL
            " ", //CIUDAD_COMERCIAL
            " ", //REGION_COMERCIAL
            "", //EMAIL1
            " ",// correo - AD13
            "",//(formattedRow[24] !== undefined) ? `${formattedRow[24]}${formattedRow[25]}` : (formattedRow[25] !== undefined) ? `${formattedRow[25]}`:"", // Concatenar A y B si ambos no son undefined - FONO1
            "",//(formattedRow[26] !== undefined) ? `${formattedRow[26]}${formattedRow[27]}` : (formattedRow[27] !== undefined) ? `${formattedRow[27]}`:"", // Concatenar A y B si ambos no son undefined - FONO2
            "", // Concatenar A y B si ambos no son undefined - FONO3
            "", // Concatenar A y B si ambos no son undefined - FONO4
            "", // Concatenar A y B si ambos no son undefined - FONO5
            " ", // Concatenar A y B si ambos no son undefined - FONO6
            
          ];


          return transformedRow;
        });

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
    const newSheet = XLSX.utils.aoa_to_sheet([["Nro_Documento", "RUT - DV", "NOMBRE","AD1","NombreProducto", "AD2", "AD3", "AD4", "AD5", "AD6","AD7","DEUDA TOTAL","AD11","AD8","AD9","AD10","DIRECCION","COMUNA","CIUDAD","REGION","DIRECCION_COMERCIAL","COMUNA_COMERCIAL","CIUDAD_COMERCIAL","REGION_COMERCIAL","EMAIL1","AD13","FONO1","FONO2"
  ,"FONO3", "FONO4"	,"FONO5"	,"FONO6"	,"AD14"	,"AD15"	,"TIPO_DEUDOR"	,
  "TIPO_PRODUCTO 1",	"AFINIDAD_1",	"NRO_PRODUCTO 1",	"FECHA_VEN_1","COD_SEG_1",	"ID_BANCO_1",	
  "TIPO_PRODUCTO_2",	"AFINIDAD_2",	"NRO_PRODUCTO_2",	"FECHA_VEN_2",	"COD_SEG_2",	"ID_BANCO_2"	,
  "TIPO_PRODUCTO_3",	"AFINIDAD_3",	"NRO_PRODUCTO_3",	"FECHA_VEN_3",	"COD_SEG_3",	"ID_BANCO_3"	,
  "TIPO_PRODUCTO_4",	"AFINIDAD_4",	"NRO_PRODUCTO_4",	"FECHA_VEN_4",	"COD_SEG_4",	"ID_BANCO_4"	,
  "TIPO_PRODUCTO_5",	"AFINIDAD_5",	"NRO_PRODUCTO_5",	"FECHA_VEN_5",	"COD_SEG_5",	"ID_BANCO_5"	,
  "PRIMER_NOMBRE"	,"SEGUNDO_NOMBRE",	"APE_PATERNO",	"APE_MATERNO",	"EDAD",	"SEXO",	"FECHA_NAC"	,
  "NUMERO",	"DEPARTAMENTO"	,"POBLACION"

], ...excelData.slice(1)]);

    // Agregar la hoja al nuevo libro
    XLSX.utils.book_append_sheet(newWorkbook, newSheet, 'ARCHIVO DE CARGA C18');

    const excelBuffer = XLSX.write(newWorkbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    saveAs(blob, 'C18 NORMALIZADA SIN POBLAR ' + formattedDateTime + '.xlsx');
  };

  return (
    <div className='cont'>
        <div className="file-select" id="src-file1" >
        
        <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Cargar Archivo "RPT_"</Form.Label>
        
        <Form.Control type="file" accept=".xlsx" onChange={handleFileUpload}/>
        </Form.Group>
        </div>
        {excelData && (
        <div>
        <p>Nuevo Archivo: {'C18 NORMALIZADA SIN POBLAR ' + formattedDateTime + '.xlsx'}</p>
        <Button onClick={handleDownload}>Descargar C18 Normalizado</Button>
        </div>
        )}
        <span className='note'>Advertencia: archivos con mas de 50.000 filas, tienen un alto consumo de memoria y demora considerable.</span>
    </div>
    );
};

export default NormAsig18;
