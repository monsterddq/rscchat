using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTO
{
    public class RequestHistoryMessage
    {
        public int RoomId { get; set; } = 0;
        public string UserName { get; set; } = "";
        public int Limit { get; set; } = 20;
    }
}
