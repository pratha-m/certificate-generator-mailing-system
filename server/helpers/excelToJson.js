import {XLSX} from "../packages/packages.js";

export const excelToJson=(excelFileBuffer)=>{
    const workbook=XLSX.read(excelFileBuffer,{type:"buffer"});

    const sheetName="Sheet1"

    const jsonData=XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    return jsonData;
}