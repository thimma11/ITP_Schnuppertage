using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Schnupperschülerbestätigung
{
    class Information
    {

        public String Firstname { get; set; }

        public String Lastname { get; set; }

        public String StampDate { get; set; }

        public String Location { get; set; }

        public String Department { get; set; }

        public String Date { get; set; }

        public String GetNameString() => Lastname + " " + Firstname;

        public String GetParticipationString() => Department + " am " + Date;

    }
}
