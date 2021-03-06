﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using IronPdf;
using System.IO.Compression;
using System.IO;

namespace Schnuppertagliste
{
    class PDFCreator
    {

        public static void CreateEventPDF(Event e)
        {
            HtmlToPdf renderer = new HtmlToPdf();
            renderer.PrintOptions.DPI = 300;

            List<String> strings = e.GetPDFStrings();
            PdfDocument document;
            int num = 0;

            if (!Directory.Exists(@"./" + e.Date.Replace("ä", "ae") + " - " + e.Department))
                Directory.CreateDirectory(@"./" + e.Date.Replace("ä", "ae") + " - " + e.Department);

            if (File.Exists(@"./" + e.Date.Replace("ä", "ae") + " - " + e.Department + ".zip"))
                File.Delete(@e.Date.Replace("ä", "ae") + " - " + e.Department + ".zip");

            foreach (String s in strings)
            {
                num++;
                document = renderer.RenderHtmlAsPdf(s);
                document.SaveAs("./" + e.Date.Replace("ä", "ae") + " - " + e.Department + "/Gruppe " + num + ".pdf");
            }

<<<<<<< HEAD
            ZipFile.CreateFromDirectory(e.Date.Replace("ä", "ae") + " - " + e.Department, e.Date.Replace("ä", "ae") + " - " + e.Department + ".zip");
            Console.Write(e.Date.Replace("ä", "ae") + " - " + e.Department + ".zip");
=======
            string source = e.Date + " - " + e.Department;
            string filename = e.Date + " - " + e.Department + ".zip";

            ZipFile.CreateFromDirectory(source, filename);

            Console.Write(filename);
>>>>>>> cd7c91e397287adfa56b7be8917b8606e66ceacf
        }

    }
}
