using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
namespace chat.Models
{
    public class User
    {
        [Key]
        [Required]
        public int UserId { get; set; }
        [EmailAddress]
        public string UserName { get; set; }
        [MinLength(6)]
        public string Password { get; set; }
        public string Avatar { get; set; }
        public string FullName { get; set; }
        public bool VerifyEmail { get; set; }
        [Required]
        public int Role { get; set; }

        public virtual ICollection<UserRoom> UserRoom { get; set; }

        public User()
        {
            this.UserRoom = new List<UserRoom>();
        }
    }
}