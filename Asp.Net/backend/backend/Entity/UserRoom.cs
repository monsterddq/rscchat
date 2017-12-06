using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Entity
{
    public class UserRoom
    {
        public UserRoom(string userName, int roomId)
        {
            UserName = userName;
            RoomId = roomId;
        }

        public UserRoom(string userName, int roomId, User user, Room room)
        {
            UserName = userName;
            RoomId = roomId;
            User = user;
            Room = room;
        }

        [Key]
        [Column(Order = 0)]
        public string UserName { get; set; }
        [Key]
        [Column(Order = 1)]
        public int RoomId { get; set; }
        [ForeignKey("UserName")]
        public virtual User User { get; set; }
        [ForeignKey("RoomId")]
        public virtual Room Room { get; set; }
    }
}
