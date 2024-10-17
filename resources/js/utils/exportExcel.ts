import * as XLSX from "xlsx";

const ExcelExport = (data: Array<object>, name: string) => {
        
    const worksheet = XLSX.utils.json_to_sheet(data);

    
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Dispensasi");    
    
    return     XLSX.writeFile(workbook, `${name}.xlsx`);
};

export default ExcelExport;






