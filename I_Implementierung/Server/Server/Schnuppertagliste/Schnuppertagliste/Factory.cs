using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;

namespace Schnuppertagliste
{
    class Factory
    {

        private static String _connectionString = $"Server=localhost; database=schnuppertage; UID=root; password=";

        public static Event GetEvent(int id)
        {
            MySqlConnection connection = new MySqlConnection(Factory._connectionString);
            connection.Open();

            MySqlCommand command = connection.CreateCommand();
            command.CommandText = "" +
                "SET lc_time_names = 'de_DE';";
            command.ExecuteNonQuery();

            command.CommandText = "" +
                "SELECT " +
                "D.CONTRACTION, " +
                "DATE_FORMAT(E.DATE, \"%W\"), " +
                "DATE_FORMAT(E.DATE, \"%e. %M %Y\"), " +
                "G.ID " +
                "FROM EVENTS E " +
                "JOIN DEPARTMENTS D ON E.DEPARTMENTS_ID = D.ID " +
                "JOIN GROUPS G ON E.DEPARTMENTS_ID = G.DEPARTMENT_ID " +
                "AND E.LOCATIONS_ID = G.LOCATION_ID " +
                "WHERE E.ID = @eventID;";
            command.Parameters.AddWithValue("@eventID", id);

            MySqlDataReader reader = command.ExecuteReader();
            reader.Read();

            Event e = new Event();
            e.Department = reader.GetString(0);
            e.Day = reader.GetString(1);
            e.Date = reader.GetString(2);

            List<String> groupNumbers = new List<string>();
            groupNumbers.Add(reader.GetString(3));
            while (reader.Read())
                groupNumbers.Add(reader.GetString(3));

            List<Participant> participants = new List<Participant>();
            command.CommandText = "" +
                "SELECT " +
                "P.FIRSTNAME, " +
                "P.LASTNAME, " +
                "P.SCHOOL_TYP, " +
                "P.SCHOOL_LOCATION " +
                "FROM PARTICIPANTS P " +
                "WHERE P.EVENTS_ID = @eventID " +
                "ORDER BY P.LASTNAME ASC, " +
                "P.FIRSTNAME ASC";

            reader.Close();
            reader = command.ExecuteReader();

            while (reader.Read())
            {
                Participant p = new Participant();
                p.Firstname = reader.GetString(0);
                p.Lastname = reader.GetString(1);
                p.SchoolType = reader.GetString(2);
                p.SchoolLocation = reader.GetString(3);
                participants.Add(p);
            }

            Group g;
            int num = 0;
            int lessonsNum = 0;
            command.Parameters.AddWithValue("@number", "");
            command.Parameters.AddWithValue("@dayname", e.Day);
            foreach (String number in groupNumbers)
            {
                command.Parameters["@number"].Value = number;
                command.CommandText = "" +
                    "SELECT " +
                    "L.START, " +
                    "S.NAME, " +
                    "CONCAT(T.NAME, ' ', T.SURNAME) " +
                    "FROM GROUPS G " +
                    "JOIN DAYTABLES D ON G.ID = D.GROUPS_ID " +
                    "JOIN LESSONS L ON D.ID = L.DAYTABLES_ID " +
                    "JOIN TEACHERS T ON L.TEACHERS_ID = T.ID " +
                    "JOIN SUBJECTS S ON L.SUBJECTS_ID = S.ID " +
                    "WHERE G.ID = @number " +
                    "AND D.DAY_NAME = @dayname " +
                    "ORDER BY L.START";

                reader.Close();
                reader = command.ExecuteReader();
                g = new Group();
                num++;
                g.Number = num.ToString();

                lessonsNum = 0;
                while (reader.Read())
                {
                    Lesson l = new Lesson();
                    lessonsNum++;
                    l.Number = lessonsNum.ToString();
                    l.StartTime = reader.GetString(0);
                    l.Subject = reader.GetString(1);
                    l.Teacher = reader.GetString(2);
                    g.Lessons.Add(l);
                }

                if (participants.Count == 0)
                    break;
                for (int i = 0;  i < 3; i++)
                {
                    if (participants.Count == 0)
                        break;
                    g.Participants.Add(participants[0]);
                    participants.RemoveAt(0);
                }

                e.Groups.Add(g);
            }

            connection.Close();
            return e;
        }

    }
}
