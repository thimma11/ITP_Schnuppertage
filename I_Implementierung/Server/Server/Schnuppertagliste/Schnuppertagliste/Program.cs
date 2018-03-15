using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Schnuppertagliste
{
    class Program
    {
        static void Main(string[] args)
        {
            if (args.Length == 0)
                throw new Exception("Es wurde kein Parameter übergeben!");

            int id;
            Int32.TryParse(args[0], out id);

            if (id == 0)
                throw new Exception("Sie dürfen nur eine Zahl als ersten Paramter eingeben!");

            Event eve = Factory.GetEvent(id);
            PDFCreator.CreateEventPDF(eve);
        }
    }
}
