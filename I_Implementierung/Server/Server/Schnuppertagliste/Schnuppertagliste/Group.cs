using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Schnuppertagliste
{
    class Group
    {

        public String Number { get; set; }

        public List<Participant> Participants { get; set; }

        public List<Lesson> Lessons { get; set; }

        public Group()
        {
            Participants = new List<Participant>();
            Lessons = new List<Lesson>();
        }

        public override string ToString()
        {
            String participantsString = "";
            foreach (Participant p in Participants)
                participantsString += p.ToString();

            String lessonsString = "";
            foreach (Lesson l in Lessons)
                lessonsString += l.ToString();

            return "<style>" +
                "   .table-spacer {" +
                "       margin-top: 50px;" +
                "       margin-bottom: 50px;" +
                "       width: 100%;" +
                "   }" +
                "</style>" +
                "<table class=\"table-spacer\">" +
                "   <thead>" +
                "       <tr>" +
                "           <th>Zuname</th>" +
                "           <th>Vorname</th>" +
                "           <th>Schultyp</th>" +
                "           <th>Schulort</th>" +
                "       </tr>" +
                "   </thead>" +
                "   <tbody>" +
                "       " + participantsString +
                "   </tbody>" +
                "</table>" +
                " <table class=\"table-spacer\">" +
                "   <thead>" +
                "       <tr>" +
                "           <th>Stunde</th>" +
                "           <th>Zeit</th>" +
                "           <th>Fach</th>" +
                "           <th>LehrerIn</th>" +
                "       </tr>" +
                "   </thead>" +
                "   <tbody>" +
                "       " + lessonsString +
                "   </tbody>" +
                "</table>";
        }

    }
}
