using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Threading;
using IronPdf;
using System.IO;

namespace Schnupperschülerbestätigung
{
    class PDFCreator
    {

        public static void CreateInformationPDF(Information information)
        {
            HtmlToPdf renderer = new HtmlToPdf();
            renderer.PrintOptions.DPI = 300;

            String pdfString = "" +
                "<body>" +
                "   <style>" +
                "       body {" +
                "           font-family: Arial, Helvetica, sans-serif;" +
                "       }" +
                "       p {" +
                "           font-size: 18px;" +
                "       }" +
                "       #top {" +
                "           margin-bottom: 150px;" +
                "           overflow: hidden;" +
                "       }" +
                "       header {" +
                "           color: #AAAAAA;" +
                "           float: left;" +
                "       }" +
                "       header p {" +
                "           margin: 0;" +
                "           padding: 0;" +
                "           line-height: 25px;" +
                "           font-size: 16px;" +
                "       }" +
                "       img {" +
                "           height: 75px;" +
                "           float: right;" +
                "       }" +
                "       .stamp-container {" +
                "           overflow: hidden;" +
                "       }" +
                "       .stamp {" +
                "           float: right;" +
                "       }" +
                "       .text {" +
                "           padding-left: 50px;" +
                "       }" +
                "   </style>" +
                "   <div id=\"top\">" +
                "       <header>" +
                "           <p><b>Höhere Technische Bundeslehranstalt Krems</b></p>" +
                "           <p>3500 Krems, Alauntalstr. 29 | Tel 02732 - 83190, Fax: DW 2111</p>" +
                "           <p>Mail: <u>direktion@htlkrems.ac.at</u> | Web: <u>www.htlkrems.ac.at</u></p>" +
                "       </header>" +
                "       <img src=\"http://www.videokaufmann.at/wp-content/uploads/2016/12/htlkrems-300x120-1.png\"/>" +
                "   </div>" +
                "   <p><b>" + information.GetNameString() + "</b></p><br><br>" +
                "   <div class=\"stamp-container\">" +
                "       <p class=\"stamp\">" + information.Location + ", " + information.StampDate + "</p>" +
                "   </div>" +
                "   <p>Sehr geehrte Damen und Herren.</p>" +
                "   <p class=\"text\">Die Direktion der HTL Krems bestätigt, dass " + information.GetNameString() + "" +
                "   für einen Schnuppertag an der HTL Krems Höhere Abteilung " + information.GetParticipationString() + "" +
                "   angemeldet ist.</p><br><br><br><br><br>" +
                "   <p>Mit freundlichen Grüßen</p><br>" +
                "   <p>Direktion HTL Krems</p>" +
                "</body>";

            PdfDocument document = renderer.RenderHtmlAsPdf(pdfString);
            string filename = information.GetNameString() + " - " + information.Date.Replace("ä", "ae") + ".pdf";
            document.SaveAs(filename);
            document.Stream.Close();
            Console.Write(filename);
        }

    }
}
