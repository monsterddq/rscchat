using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Entity
{
    public sealed class Room
    {
        [Key]
        [Required]
        public int RoomId { get; set; }

        [MinLength(1)]
        public string Name { get; set; }

        public bool Status { get; set; }

        [Range(0, 3)]
        public int Type { get; set; }

        public DateTime Time { get; set; }

        public ICollection<UserRoom> UserRoom { get; private set; }

        public Room()
        {
            this.UserRoom = new List<UserRoom>();
        }
    }
}