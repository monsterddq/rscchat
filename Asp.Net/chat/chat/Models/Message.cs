using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace chat.Models
{
    public class Message
    {
        [Key]
        [Required]
        public int MessageId { get; set; } 
        public DateTime Time { get; set; }
        public string Content { get; set; }
        public int UserId { get; set; }
        public int RoomId { get; set; }
        [ForeignKey("UserId")]
        public virtual User User { get; set; }
        [ForeignKey("RoomId")]
        public virtual Room Room { get; set; }
    }
}