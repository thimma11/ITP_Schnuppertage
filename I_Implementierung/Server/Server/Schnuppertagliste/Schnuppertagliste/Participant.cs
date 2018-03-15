using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Schnuppertagliste
{
    class Participant
    {

        public String Firstname { get; set; }

        public String Lastname { get; set; }

        public String SchoolType { get; set; }

        public String SchoolLocation { get; set; }

        public override string ToString()
        {
            return "<tr>" +
                "   <td>" + Lastname + "</td>" +
                "   <td>" + Firstname + "</td>" +
                "   <td>" + SchoolType + "</td>" +
                "   <td>" + SchoolLocation + "</td>" +
                "</tr>";
        }

    }
}
