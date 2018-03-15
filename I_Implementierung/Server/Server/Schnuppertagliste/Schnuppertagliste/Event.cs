using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Schnuppertagliste
{
    class Event
    {

        public String Department { get; set; }

        public String Day { get; set; }

        public String Date { get; set; }

        public List<Group> Groups { get; set; }

        public Event()
        {
            Groups = new List<Group>();
        }

        public List<String> GetPDFStrings()
        {
            List<String> pdfStrings = new List<string>();
            String headerString = "<style>" +
                "p, h1, h2 { font-family: Arial, Helvetica, sans-serif; }" +
                "p { font-size: 18px; }" +
                "h1, h2 { margin: 0; padding: 0; }" +
                "h2 { margin-bottom: 100px; }" +
                ".text-center { text-align:  center; }" +
                ".text-spacer { padding-left: 50px; }" +
                "th { text-align: left; font-size: 18px; }" +
                "td { text-align: left; font-size: 18px; }" +
                ".sign-department { border-top: 1px solid #000; padding-top: 15px; width: 250px; margin: auto; margin-top: 100px; }" +
                ".sign-secretary { border-top: 1px solid #000; padding-top: 15px; width: 200px; margin-top: 80px; }" +
                "</style>" +
                "<h1 class=\"text-center\">SCHNUPPERSCHÜLER</h1>" +
                "<h2 class=\"text-center\">für " + Department + "</h2>";
            String middleString = "<p class=\"info-text\">Die Direktion ersucht den Lehrer der ersten" +
                "Stunde die/den Schüler/in <b>vor der ersten Stunde</b> in der" +
                "Direktion bei Frau Stummer abzuholen, eine Kopie des Stundenzettels" +
                "zu übergeben und zu betreuen.</p><br><br><br>" +
                "<p>Mit freundlichen Grüßen</p>" +
                "<p class=\"sign-department text-center\">Dipl.-Ing. Anton Hauleitner<br>Abteilungsvorstand</p>";
            String footerString = "<p class=\"sign-secretary text-center\">Stummer</p>";
            String teachersString;

            foreach (Group g in Groups)
            {
                teachersString = "<div class=\"teachers\">" +
                    "<p class=\"teachers-text\"><b>Verteiler:</b>";
                foreach (Lesson l in g.Lessons)
                {
                    if (!teachersString.Contains(l.Teacher))
                        teachersString += "<br>" + l.Teacher;
                }
                teachersString += "</p></div>";

                pdfStrings.Add(
                    headerString +
                    "<p><b>Tag:</b> " + Day + "<span class=\"text-spacer\">" + Date + "</span><span class=\"text-spacer\">Gruppe " + g.Number + "</span><p>" +
                    g.ToString() +
                    middleString + 
                    teachersString +
                    footerString
                );
            }

            return pdfStrings;
        }

    }
}
