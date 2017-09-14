using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace chat.Models
{
    public class UserRoom
    {
        [Key]
        [Column(Order = 0)]
        public int UserId { get; set; }
        [Key]
        [Column(Order = 1)]
        public int RoomId { get; set; }
        [ForeignKey("UserId")]
        public virtual User User { get; set; }
        [ForeignKey("RoomId")]
        public virtual Room Room { get; set; }

    }
}