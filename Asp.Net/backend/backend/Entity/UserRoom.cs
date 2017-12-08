using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Entity
{
    public sealed class UserRoom
    {
        public UserRoom()
        {
            this.Status = 1;
        }

        public UserRoom(string userName, int roomId, int status)
        {
            UserName = userName;
            RoomId = roomId;
            this.Status = 1;
        }

        public UserRoom(string userName, int roomId, int status, User user, Room room)
        {
            UserName = userName;
            RoomId = roomId;
            User = user;
            Room = room;
            Status = 1;
        }

        [Key]
        [Column(Order = 0)]
        public string UserName { get; set; }

        [Key]
        [Column(Order = 1)]
        public int RoomId { get; set; }

        [ForeignKey("UserName")]
        public User User { get; private set; }

        [ForeignKey("RoomId")]
        public Room Room { get; private set; }

        public string Background { get; set; } = "#fff";
        public int Status { get; set; }
    }
}