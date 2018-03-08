using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;
using MySql.Data;

namespace Schnupperschülerbestätigung
{
    class Factory
    {

        private static String _connectionString = $"Server=localhost; database=schnuppertage; UID=root; password=";

        public static Information GetInformation(int id)
        {
            MySqlConnection connection = new MySqlConnection(Factory._connectionString);
            connection.Open();

            MySqlCommand command = connection.CreateCommand();
            command.CommandText = "" +
                "SET lc_time_names = 'de_DE';";
            command.ExecuteNonQuery();

            command.CommandText = "" +
                "SELECT " +
                "P.FIRSTNAME, " +
                "P.LASTNAME, " +
                "L.NAME AS LOCATION, " +
                "D.NAME AS DEPARTMENT, " +
                "DATE_FORMAT(E.DATE, \"%e. %M %Y\") AS DATE, " +
                "DATE_FORMAT(SYSDATE(), \"%e. %M %Y\") " +
                "FROM PARTICIPANTS P " +
                "JOIN EVENTS E ON P.EVENTS_ID = E.ID " +
                "JOIN DEPARTMENTS D ON E.DEPARTMENTS_ID = D.ID " +
                "JOIN LOCATIONS L ON E.LOCATIONS_ID = L.ID " +
                "WHERE P.ID = @id;";
            command.Parameters.AddWithValue("@id", id);

            MySqlDataReader reader = command.ExecuteReader();
            reader.Read();

            Information information = new Information();
            information.Firstname = reader.GetString(0);
            information.Lastname = reader.GetString(1);
            information.Location = reader.GetString(2);
            information.Department = reader.GetString(3);
            information.Date = reader.GetString(4);
            information.StampDate = reader.GetString(5);

            connection.Close();
            return information;
        }

    }
}
