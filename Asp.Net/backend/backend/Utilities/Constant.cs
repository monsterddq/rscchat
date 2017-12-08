using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Utilities
{
    public static class Constant
    {
        public static string Serect = "pk78syiEByfpCRHp5GdA7K0Z4+4dvc1X73fibeF0yCdh3z4kvCOOobqfF/ewWQIbfQP+0wuBvH4S9sw9FD2OAA==";
        public static int Zero = 0;
        public static string Success = "success";
        public static string HeaderAuthorization = "Authorization";
        public static string HubListRoom = "listroom";
        public static string HubCreateRoom = "createroom";
        public static string HubFetchMessage = "fetchmessage";
        public static string RoomTypeManager = "manager";
        public static string RoomTypeTechnical = "technical";
        public static string RoomTypeAdvisory = "advisory";
        public static string RoomTypeGeneral = "advisory";
        public static int RoleAdministrator = 0;
        public static int RoleManager = 1;
        public static int RoleTechnical = 2;
        public static int RoleAdvisory = 3;
        public static int RoleUser = 4;
        public static int PageStart = 0;
    }
}