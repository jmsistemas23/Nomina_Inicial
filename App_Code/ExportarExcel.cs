using System;
using System.Collections.Generic;
using System.Text;

using Microsoft.Office.Interop.Excel;
using System.Reflection;
using System.Data;
using config = System.Configuration;
using ficheros = System.IO;


    public class ExportToExcel
    {

        public ExportToExcel() { }


        public static void Export(string ExcelName, string[] sheets, DataSet DS)
        {

            // Prevenir conflicto de idiomas. Si no se pone genera este error
            //              Old format or invalid type library. (Exception from HRESULT: 0x80028018 (TYPE_E_INVDATAREAD))
            System.Threading.Thread.CurrentThread.CurrentCulture =
                            System.Globalization.CultureInfo.CreateSpecificCulture("en-US");

            //try {
            Application _excel = new Application();
            Workbook _wBook = _excel.Workbooks.Add(Missing.Value);

            for (int idx = 0; idx < DS.Tables.Count; idx++)
            {

                Worksheet _sheet = (Worksheet)_wBook.Worksheets.Add(Missing.Value, Missing.Value, Missing.Value, Missing.Value);
                _sheet.Name = sheets[idx];

                for (int i = 0; i < DS.Tables[idx].Columns.Count; i++)
                {
                    _sheet.Cells[1, i + 1] = DS.Tables[idx].Columns[i].ColumnName.ToString();
                }
                Range rng = (Range)_sheet.Cells[1, DS.Tables[idx].Columns.Count];
                rng.EntireRow.Font.Bold = true;
                rng.EntireRow.Interior.ColorIndex = 3;


                //for (int i = 0; i < DS.Tables[idx].Rows.Count; i++)
                //{
                //    for (int k = 0; k < DS.Tables[idx].Columns.Count; k++)
                //    {
                //        _sheet.Cells[i + 2, k + 1] = DS.Tables[idx].Rows[i].ItemArray[k];
                //    }
                //}

            }

            string path = config.ConfigurationSettings.AppSettings["pathExcel"];
            ExcelName = path + ExcelName + ".xls";

            if (ficheros.File.Exists(ExcelName))
            {
                ficheros.File.Delete(ExcelName);
            }
            _excel.ActiveCell.Worksheet.SaveAs(ExcelName, XlFileFormat.xlExcel8, Missing.Value,
                        Missing.Value, Missing.Value, Missing.Value, Missing.Value, Missing.Value, Missing.Value, Missing.Value);

            // Muestra el excel
            _excel.Visible = false;

            deleteProcess();
            //}
            //catch (Exception EX) {
            //    string ss = EX.Message;
            //}

        }

        private static void deleteProcess()
        {

            System.Diagnostics.Process[] miproceso = System.Diagnostics.Process.GetProcessesByName("EXCEL");

            foreach (System.Diagnostics.Process pc in miproceso)
            {
                pc.Kill();
            }

        }
    }


