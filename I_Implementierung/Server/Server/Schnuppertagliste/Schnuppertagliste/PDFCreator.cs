using System;
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

            if (!Directory.Exists(e.Date + " - " + e.Department))
                Directory.CreateDirectory(e.Date + " - " + e.Department);

            foreach (String s in strings)
            {
                num++;
                document = renderer.RenderHtmlAsPdf(s);
                document.SaveAs("./" + e.Date + " - " + e.Department + "/Gruppe " + num + ".pdf");
            }

            string source = e.Date + " - " + e.Department;
            string filename = e.Date + " - " + e.Department + ".zip";

            ZipFile.CreateFromDirectory(source, filename);

            Console.Write(filename);
        }

    }
}
