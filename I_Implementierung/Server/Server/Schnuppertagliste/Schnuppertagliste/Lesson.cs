using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Schnuppertagliste
{
    class Lesson
    {

        public String Number { get; set; }

        public String StartTime { get; set; }

        public String Subject { get; set; }

        public String Teacher { get; set; }

        public override string ToString()
        {
            return "<tr>" +
                "   <td>" + Number + "</td>" +
                "   <td>" + StartTime + "</td>" +
                "   <td>" + Subject + "</td>" +
                "   <td>" + Teacher + "</td>" +
                "</tr>";
        }

    }
}
