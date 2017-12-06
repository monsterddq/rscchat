using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTO
{
    public class RoomDTO
    {
        public int RoomId { get; set; }
        public string Name { get; set; }
        public string NewMessage { get; set; }
        public string TimeMessage { get; set; }
    }
}
